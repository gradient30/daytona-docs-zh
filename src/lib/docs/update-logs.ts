export type ChangeKind = "added" | "updated" | "removed" | "site";

export type UpdateChange = {
  kind: ChangeKind;
  slug: string;
  title: string;
  webPath: string;
  officialUrl?: string;
  detail: string;
};

export type UpdateLog = {
  id: string;
  date: string;
  title: string;
  summary: string;
  sourceHint: string;
  changes: UpdateChange[];
};

export const UPDATE_LOGS: UpdateLog[] = [
  {
    id: "2026-09-22-initial",
    date: "2026-09-22",
    title: "首版全站汉化上线",
    summary:
      "对照 www.daytona.io/docs 与 sitemap-0.xml，完成 Daytona 官方文档中文手册：平台概念、运行时、SDK / CLI / API、集成指南，并建立同步日志与对照表。",
    sourceHint: "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    changes: [
      {
        kind: "site",
        slug: "index",
        title: "统一阅读器",
        webPath: "/",
        officialUrl: "https://www.daytona.io/docs/",
        detail: "明 / 暗 / 彩三套风格、目录搜索、页内大纲、上一篇 / 下一篇。顶栏「同步」进入本次对照日志。",
      },
      {
        kind: "added",
        slug: "sandboxes",
        title: "沙箱等官网正文",
        webPath: "/docs/sandboxes",
        officialUrl: "https://www.daytona.io/docs/en/sandboxes",
        detail: "从沙箱、快照、卷、区域、隔离、持久化、运行时操作到 SDK / CLI / API 与集成指南，路径与官网对齐。",
      },
      {
        kind: "added",
        slug: "updates",
        title: "同步日志模块",
        webPath: "/docs/updates",
        detail: "以后官网每有变动，这里单独记一笔：改了什么、中文站在哪一页。",
      },
      {
        kind: "added",
        slug: "sitemap",
        title: "对照表",
        webPath: "/docs/sitemap",
        detail: "每页内容指纹。官网哈希一变，对应中文路径会标成待更新。",
      },
      {
        kind: "added",
        slug: "architecture-site",
        title: "本站架构",
        webPath: "/docs/architecture-site",
        detail: "阅读器如何拼起来，以及每日同步如何驱动永久汉化。",
      },
    ],
  },
];

export const LATEST_UPDATE = UPDATE_LOGS[0]!;

export function logById(id: string): UpdateLog | undefined {
  return UPDATE_LOGS.find((l) => l.id === id);
}

export function kindLabel(kind: ChangeKind): string {
  if (kind === "added") return "新增";
  if (kind === "updated") return "更新";
  if (kind === "removed") return "移除";
  return "本站";
}
