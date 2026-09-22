#!/usr/bin/env node
/**
 * Compare Daytona official docs (sitemap-0.xml + per-page .md hashes)
 * against official-map.json. On drift:
 *   - update lastSeenSha / size
 *   - prepend an entry to update-logs.ts (what changed + Chinese webPath)
 *   - append a sync-logs.json record
 *   - write a zh stub for newly added pages
 *
 * Does not rewrite translations. Stale rows stay stale until
 * `--mark-translated <slug,slug>`.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAP_PATH = join(ROOT, "src/lib/docs/official-map.json");
const LOG_PATH = join(ROOT, "src/lib/docs/update-logs.ts");
const SYNC_PATH = join(ROOT, "src/lib/docs/sync-logs.json");
const CADENCE_PATH = join(ROOT, "src/lib/docs/cadence.json");
const ZH_ROOT = join(ROOT, "src/content/zh");
const SITEMAP = "https://www.daytona.io/docs/sitemap-0.xml";
const LLMS = "https://www.daytona.io/docs/llms.txt";
const ORIGIN = "https://www.daytona.io/docs";
const ADDITIVE = new Set(["quick-guide", "updates", "architecture-site", "sitemap"]);

type Doc = {
  slug: string;
  section: string;
  kind: "official" | "additive";
  officialPath: string | null;
  size: number | null;
  lastSeenSha: string | null;
  translatedAtSha: string | null;
  contentSha?: string | null;
  webPath?: string;
  officialUrl?: string;
};

type Snapshot = {
  capturedAt: string;
  officialRef: string;
  docsTreeSha: string;
  source: string;
  docs: Doc[];
  releases: unknown[];
};

type Blob = { path: string; sha: string; size: number };

function sha12(buf: Buffer | string): string {
  return createHash("sha256").update(buf).digest("hex").slice(0, 12);
}

function webPath(slug: string): string {
  return slug === "index" ? "/" : `/docs/${slug}`;
}

function officialUrl(slug: string): string {
  return slug === "index" ? `${ORIGIN}/` : `${ORIGIN}/en/${slug}`;
}

function mdUrl(slug: string): string {
  return slug === "index" ? `${ORIGIN}/en.md` : `${ORIGIN}/en/${slug}.md`;
}

function officialPath(slug: string): string {
  return slug === "index" ? "en.md" : `en/${slug}.md`;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function todayIso(): string {
  return new Date().toISOString();
}

function sectionOf(slug: string): string {
  if (ADDITIVE.has(slug)) return "additive";
  if (slug === "index" || ["sandboxes", "snapshots", "volumes", "regions"].includes(slug)) return "start";
  if (
    [
      "architecture",
      "isolation",
      "persistence",
      "scale",
      "api-keys",
      "organizations",
      "billing",
      "limits",
      "troubleshooting",
      "playground",
    ].includes(slug)
  )
    return "platform";
  if (slug.startsWith("guides")) return "guides";
  if (slug.startsWith("tools/") || slug.includes("-sdk")) return "tools";
  if (
    [
      "secrets",
      "sso",
      "linked-accounts",
      "audit-logs",
      "webhooks",
      "network-limits",
      "vpn-connections",
      "bring-your-own-compute",
    ].includes(slug) ||
    slug.startsWith("observability/")
  )
    return "ops";
  return "runtime";
}

function locationOf(slug: string, title: string): string {
  const href = webPath(slug);
  if (ADDITIVE.has(slug)) return `侧栏「本站」→「${title}」· 本站 ${href}`;
  if (slug.startsWith("guides")) return `侧栏「指南」→「${title}」· 本站 ${href}`;
  if (slug.includes("-sdk") || slug.startsWith("tools/")) return `侧栏「工具」→「${title}」· 本站 ${href}`;
  return `侧栏 →「${title}」· 本站 ${href}`;
}

function markTranslated(snap: Snapshot, slugs: string[]) {
  const set = new Set(slugs);
  for (const doc of snap.docs) {
    if (!set.has(doc.slug)) continue;
    if (doc.lastSeenSha) doc.translatedAtSha = doc.lastSeenSha;
  }
}

function prependLog(entry: {
  id: string;
  date: string;
  title: string;
  summary: string;
  sourceHint: string;
  changes: Array<{
    kind: "added" | "updated" | "removed" | "site";
    slug: string;
    title: string;
    webPath: string;
    officialUrl?: string;
    detail: string;
  }>;
}) {
  const src = readFileSync(LOG_PATH, "utf8");
  const marker = "export const UPDATE_LOGS: UpdateLog[] = [";
  const i = src.indexOf(marker);
  if (i < 0) throw new Error("cannot find UPDATE_LOGS array");
  const insertAt = i + marker.length;
  const block =
    "\n  " +
    JSON.stringify(entry, null, 2)
      .split("\n")
      .map((l, n) => (n === 0 ? l : "  " + l))
      .join("\n") +
    ",";
  writeFileSync(LOG_PATH, src.slice(0, insertAt) + block + src.slice(insertAt));
}

function writeZhStub(slug: string, title: string) {
  const file = join(ZH_ROOT, slug === "index" ? "index.md" : `${slug}.md`);
  if (existsSync(file)) return false;
  mkdirSync(dirname(file), { recursive: true });
  const id = slug.split("/").pop() ?? slug;
  const body = `# ${title} {#${id}}

> 官网新增页面，中文正文待补。

> 本页由每日同步自动建档。中文站位置：${webPath(slug)}。对照表见 [/docs/sitemap](/docs/sitemap)，完成后用 \`npm run sync:docs -- --mark-translated ${slug}\` 对齐指纹。
`;
  writeFileSync(file, body);
  return true;
}

function writeCadence(patch: Record<string, unknown>) {
  const cadence = JSON.parse(readFileSync(CADENCE_PATH, "utf8")) as Record<string, unknown>;
  writeFileSync(CADENCE_PATH, `${JSON.stringify({ ...cadence, ...patch }, null, 2)}\n`);
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "DaytonaZhDocs/1.0" } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return await res.text();
}

function slugsFromSitemap(xml: string): string[] {
  const out: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    const loc = (m[1] ?? "").trim();
    if (!loc.includes("/docs")) continue;
    if (loc.endsWith("/docs") || loc.endsWith("/docs/") || loc.endsWith("/docs/en") || loc.endsWith("/docs/en/")) {
      out.push("index");
      continue;
    }
    const marker = "/docs/en/";
    const i = loc.indexOf(marker);
    if (i < 0) continue;
    const slug = loc.slice(i + marker.length).replace(/\/$/, "");
    if (slug) out.push(slug);
  }
  return [...new Set(out)];
}

const args = process.argv.slice(2);
const markIdx = args.indexOf("--mark-translated");
const markSlugs = markIdx >= 0 ? (args[markIdx + 1] ?? "").split(",").filter(Boolean) : [];

const snap = JSON.parse(readFileSync(MAP_PATH, "utf8")) as Snapshot;

if (markSlugs.length) {
  markTranslated(snap, markSlugs);
  snap.capturedAt = today();
  writeFileSync(MAP_PATH, JSON.stringify(snap, null, 2) + "\n");
  console.log("marked translated:", markSlugs.join(", "));
  process.exit(0);
}

const xml = await fetchText(SITEMAP);
let llmsHash = "sitemap";
try {
  llmsHash = sha12(await fetchText(LLMS));
} catch {
  llmsHash = sha12(xml);
}

const listed = slugsFromSitemap(xml);
const live = new Map<string, Blob>();

for (const slug of listed) {
  try {
    const body = await fetchText(mdUrl(slug));
    live.set(slug, {
      path: officialPath(slug),
      sha: sha12(body),
      size: Buffer.byteLength(body),
    });
  } catch (err) {
    console.warn("skip", slug, err);
  }
}

const changes: Array<{
  kind: "added" | "updated" | "removed";
  slug: string;
  title: string;
  webPath: string;
  officialUrl: string;
  detail: string;
  prevHash: string | null;
  nextHash: string | null;
}> = [];

const bySlug = new Map(snap.docs.map((d) => [d.slug, d]));

for (const [slug, info] of live) {
  const existing = bySlug.get(slug);
  if (!existing) {
    const title = slug.split("/").pop() ?? slug;
    snap.docs.push({
      slug,
      section: sectionOf(slug),
      kind: "official",
      officialPath: info.path,
      size: info.size,
      lastSeenSha: info.sha,
      translatedAtSha: null,
      contentSha: info.sha,
      webPath: webPath(slug),
      officialUrl: officialUrl(slug),
    });
    const stub = writeZhStub(slug, title);
    changes.push({
      kind: "added",
      slug,
      title,
      webPath: webPath(slug),
      officialUrl: officialUrl(slug),
      detail: `官网新增页面（哈希 ${info.sha}）。中文站位置：${webPath(slug)}${stub ? "，已自动建档待补译" : ""}。`,
      prevHash: null,
      nextHash: info.sha,
    });
    continue;
  }
  if (existing.kind !== "official") continue;
  if (existing.lastSeenSha !== info.sha) {
    const was = existing.lastSeenSha;
    const translated = existing.translatedAtSha;
    existing.lastSeenSha = info.sha;
    existing.size = info.size;
    existing.officialPath = info.path;
    existing.contentSha = info.sha;
    if (translated && translated !== info.sha) {
      changes.push({
        kind: "updated",
        slug,
        title: slug,
        webPath: existing.webPath ?? webPath(slug),
        officialUrl: existing.officialUrl ?? officialUrl(slug),
        detail: `官网正文 ${was?.slice(0, 7) ?? "—"} → ${info.sha.slice(0, 7)}。中文站：${existing.webPath ?? webPath(slug)}。`,
        prevHash: was,
        nextHash: info.sha,
      });
    }
  }
}

for (const doc of snap.docs) {
  if (doc.kind !== "official") continue;
  if (!live.has(doc.slug)) {
    changes.push({
      kind: "removed",
      slug: doc.slug,
      title: doc.slug,
      webPath: doc.webPath ?? webPath(doc.slug),
      officialUrl: doc.officialUrl ?? officialUrl(doc.slug),
      detail: `sitemap 已不再包含该页。中文站仍保留在 ${doc.webPath ?? webPath(doc.slug)}，请确认是否下线。`,
      prevHash: doc.lastSeenSha,
      nextHash: null,
    });
  }
}

const nextTree = sha12([...live.values()].map((v) => v.sha).sort().join("|"));
const capturedAt = todayIso();
snap.capturedAt = today();
snap.officialRef = "docs-site";
snap.docsTreeSha = nextTree;
snap.source = SITEMAP;
writeFileSync(MAP_PATH, JSON.stringify(snap, null, 2) + "\n");

writeCadence({
  lastCheckAt: capturedAt,
  llmsHash,
  status: changes.length ? "stale" : "current",
  ...(changes.length ? { lastChangeAt: capturedAt } : {}),
});

if (changes.length === 0) {
  console.log("no official drift", live.size, "pages", nextTree);
  process.exit(0);
}

const date = today();
const id = `${date}-${sha12(changes.map((c) => c.slug).join(",")).slice(0, 6)}`;
prependLog({
  id,
  date,
  title: `官网对照：${changes.length} 处变动`,
  summary: changes
    .slice(0, 8)
    .map((c) => `${c.kind === "added" ? "新增" : c.kind === "removed" ? "移除" : "更新"} ${c.webPath}`)
    .join("；"),
  sourceHint: `${LLMS} · ${SITEMAP}`,
  changes: changes.map((c) => ({
    kind: c.kind,
    slug: c.slug,
    title: c.title,
    webPath: c.webPath,
    officialUrl: c.officialUrl,
    detail: c.detail,
  })),
});

const logs = JSON.parse(readFileSync(SYNC_PATH, "utf8")) as Array<Record<string, unknown>>;
logs.unshift({
  id: capturedAt.slice(0, 16).replace(/[-:T]/g, ""),
  capturedAt,
  summary: `${changes.length} 处官网变动（新增 ${changes.filter((c) => c.kind === "added").length} / 改动 ${changes.filter((c) => c.kind === "updated").length} / 删除 ${changes.filter((c) => c.kind === "removed").length}）`,
  llmsHash,
  changes: changes.map((c) => ({
    kind: c.kind === "updated" ? "modified" : c.kind,
    slug: c.slug,
    title: c.title,
    officialUrl: c.officialUrl,
    handbookHref: c.webPath,
    location: locationOf(c.slug, c.title),
    prevHash: c.prevHash,
    nextHash: c.nextHash,
    note: c.detail,
  })),
});
writeFileSync(SYNC_PATH, `${JSON.stringify(logs, null, 2)}\n`);

console.log("wrote update log", id, "changes", changes.length);
for (const c of changes) console.log(`  ${c.kind} ${c.webPath}`);
