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
    "id": "2026-09-25-c44c93",
    "date": "2026-09-25",
    "title": "官网对照：1 处变动",
    "summary": "更新 /docs/sandboxes",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "sandboxes",
        "title": "sandboxes",
        "webPath": "/docs/sandboxes",
        "officialUrl": "https://www.daytona.io/docs/en/sandboxes",
        "detail": "官网正文 3605baa → 91f9ea2。中文站：/docs/sandboxes。"
      }
    ]
  },
  {
    "id": "2026-09-24-ea3d29",
    "date": "2026-09-24",
    "title": "官网对照：4 处变动",
    "summary": "更新 /docs/api-keys；更新 /docs/organizations；更新 /docs/secrets；更新 /docs/troubleshooting",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "api-keys",
        "title": "api-keys",
        "webPath": "/docs/api-keys",
        "officialUrl": "https://www.daytona.io/docs/en/api-keys",
        "detail": "官网正文 1e27421 → 1390fe9。中文站：/docs/api-keys。"
      },
      {
        "kind": "updated",
        "slug": "organizations",
        "title": "organizations",
        "webPath": "/docs/organizations",
        "officialUrl": "https://www.daytona.io/docs/en/organizations",
        "detail": "官网正文 eaaf557 → 8c44676。中文站：/docs/organizations。"
      },
      {
        "kind": "updated",
        "slug": "secrets",
        "title": "secrets",
        "webPath": "/docs/secrets",
        "officialUrl": "https://www.daytona.io/docs/en/secrets",
        "detail": "官网正文 a0cfd1d → f7e051f。中文站：/docs/secrets。"
      },
      {
        "kind": "updated",
        "slug": "troubleshooting",
        "title": "troubleshooting",
        "webPath": "/docs/troubleshooting",
        "officialUrl": "https://www.daytona.io/docs/en/troubleshooting",
        "detail": "官网正文 c3d2e87 → b93ee4e。中文站：/docs/troubleshooting。"
      }
    ]
  },
  {
    "id": "2026-09-23-a1cae1",
    "date": "2026-09-23",
    "title": "官网对照：4 处变动",
    "summary": "更新 /docs/python-sdk/common/image；更新 /docs/ruby-sdk/image；更新 /docs/tools/api；更新 /docs/typescript-sdk/image",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "python-sdk/common/image",
        "title": "python-sdk/common/image",
        "webPath": "/docs/python-sdk/common/image",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/common/image",
        "detail": "官网正文 077c3e9 → 46254eb。中文站：/docs/python-sdk/common/image。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/image",
        "title": "ruby-sdk/image",
        "webPath": "/docs/ruby-sdk/image",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/image",
        "detail": "官网正文 904718b → d197c59。中文站：/docs/ruby-sdk/image。"
      },
      {
        "kind": "updated",
        "slug": "tools/api",
        "title": "tools/api",
        "webPath": "/docs/tools/api",
        "officialUrl": "https://www.daytona.io/docs/en/tools/api",
        "detail": "官网正文 07c2e61 → 943cb21。中文站：/docs/tools/api。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/image",
        "title": "typescript-sdk/image",
        "webPath": "/docs/typescript-sdk/image",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/image",
        "detail": "官网正文 8f53aff → 212825a。中文站：/docs/typescript-sdk/image。"
      }
    ]
  },
  {
    "id": "2026-09-22-cd8b33",
    "date": "2026-09-22",
    "title": "官网对照：84 处变动",
    "summary": "新增 /docs/404；更新 /docs/go-sdk/daytona；更新 /docs/go-sdk/errors；更新 /docs/go-sdk/options；更新 /docs/go-sdk/types；更新 /docs/guides/vercel-ai-sdk/vercel-ai-sdk-multi-language-benchmark-agent-sandbox；更新 /docs/java-sdk/code-interpreter；更新 /docs/java-sdk/computer-use",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "added",
        "slug": "404",
        "title": "404",
        "webPath": "/docs/404",
        "officialUrl": "https://www.daytona.io/docs/en/404",
        "detail": "官网新增页面（哈希 8e83ecb9f715）。中文站位置：/docs/404，已自动建档待补译。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/daytona",
        "title": "go-sdk/daytona",
        "webPath": "/docs/go-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/daytona",
        "detail": "官网正文 stub000 → d0fd864。中文站：/docs/go-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/errors",
        "title": "go-sdk/errors",
        "webPath": "/docs/go-sdk/errors",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/errors",
        "detail": "官网正文 stub000 → e94764e。中文站：/docs/go-sdk/errors。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/options",
        "title": "go-sdk/options",
        "webPath": "/docs/go-sdk/options",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/options",
        "detail": "官网正文 stub000 → 17b156a。中文站：/docs/go-sdk/options。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/types",
        "title": "go-sdk/types",
        "webPath": "/docs/go-sdk/types",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/types",
        "detail": "官网正文 stub000 → 22f7345。中文站：/docs/go-sdk/types。"
      },
      {
        "kind": "updated",
        "slug": "guides/vercel-ai-sdk/vercel-ai-sdk-multi-language-benchmark-agent-sandbox",
        "title": "guides/vercel-ai-sdk/vercel-ai-sdk-multi-language-benchmark-agent-sandbox",
        "webPath": "/docs/guides/vercel-ai-sdk/vercel-ai-sdk-multi-language-benchmark-agent-sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/guides/vercel-ai-sdk/vercel-ai-sdk-multi-language-benchmark-agent-sandbox",
        "detail": "官网正文 stub000 → 47fe967。中文站：/docs/guides/vercel-ai-sdk/vercel-ai-sdk-multi-language-benchmark-agent-sandbox。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/code-interpreter",
        "title": "java-sdk/code-interpreter",
        "webPath": "/docs/java-sdk/code-interpreter",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/code-interpreter",
        "detail": "官网正文 stub000 → efea293。中文站：/docs/java-sdk/code-interpreter。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/computer-use",
        "title": "java-sdk/computer-use",
        "webPath": "/docs/java-sdk/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/computer-use",
        "detail": "官网正文 stub000 → e096be5。中文站：/docs/java-sdk/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/config",
        "title": "java-sdk/config",
        "webPath": "/docs/java-sdk/config",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/config",
        "detail": "官网正文 stub000 → 5943d5b。中文站：/docs/java-sdk/config。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/daytona",
        "title": "java-sdk/daytona",
        "webPath": "/docs/java-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/daytona",
        "detail": "官网正文 stub000 → ec8d0b8。中文站：/docs/java-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/errors",
        "title": "java-sdk/errors",
        "webPath": "/docs/java-sdk/errors",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/errors",
        "detail": "官网正文 stub000 → 98c29a3。中文站：/docs/java-sdk/errors。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/file-system",
        "title": "java-sdk/file-system",
        "webPath": "/docs/java-sdk/file-system",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/file-system",
        "detail": "官网正文 stub000 → 7541569。中文站：/docs/java-sdk/file-system。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/git",
        "title": "java-sdk/git",
        "webPath": "/docs/java-sdk/git",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/git",
        "detail": "官网正文 stub000 → 1f81142。中文站：/docs/java-sdk/git。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/image",
        "title": "java-sdk/image",
        "webPath": "/docs/java-sdk/image",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/image",
        "detail": "官网正文 stub000 → fd2748a。中文站：/docs/java-sdk/image。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/lsp-server",
        "title": "java-sdk/lsp-server",
        "webPath": "/docs/java-sdk/lsp-server",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/lsp-server",
        "detail": "官网正文 stub000 → 29433d5。中文站：/docs/java-sdk/lsp-server。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/process",
        "title": "java-sdk/process",
        "webPath": "/docs/java-sdk/process",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/process",
        "detail": "官网正文 stub000 → 07c1416。中文站：/docs/java-sdk/process。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/pty-handle",
        "title": "java-sdk/pty-handle",
        "webPath": "/docs/java-sdk/pty-handle",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/pty-handle",
        "detail": "官网正文 stub000 → d590f14。中文站：/docs/java-sdk/pty-handle。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/pty",
        "title": "java-sdk/pty",
        "webPath": "/docs/java-sdk/pty",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/pty",
        "detail": "官网正文 stub000 → 36311a8。中文站：/docs/java-sdk/pty。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/sandbox",
        "title": "java-sdk/sandbox",
        "webPath": "/docs/java-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/sandbox",
        "detail": "官网正文 stub000 → 29aca72。中文站：/docs/java-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/secret-service",
        "title": "java-sdk/secret-service",
        "webPath": "/docs/java-sdk/secret-service",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/secret-service",
        "detail": "官网正文 stub000 → 7e99f4c。中文站：/docs/java-sdk/secret-service。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/snapshot",
        "title": "java-sdk/snapshot",
        "webPath": "/docs/java-sdk/snapshot",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/snapshot",
        "detail": "官网正文 stub000 → 523b6cf。中文站：/docs/java-sdk/snapshot。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/volume-service",
        "title": "java-sdk/volume-service",
        "webPath": "/docs/java-sdk/volume-service",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/volume-service",
        "detail": "官网正文 stub000 → 9c15ff5。中文站：/docs/java-sdk/volume-service。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-code-interpreter",
        "title": "python-sdk/async/async-code-interpreter",
        "webPath": "/docs/python-sdk/async/async-code-interpreter",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-code-interpreter",
        "detail": "官网正文 stub000 → 5d862df。中文站：/docs/python-sdk/async/async-code-interpreter。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-computer-use",
        "title": "python-sdk/async/async-computer-use",
        "webPath": "/docs/python-sdk/async/async-computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-computer-use",
        "detail": "官网正文 stub000 → 1676810。中文站：/docs/python-sdk/async/async-computer-use。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-daytona",
        "title": "python-sdk/async/async-daytona",
        "webPath": "/docs/python-sdk/async/async-daytona",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-daytona",
        "detail": "官网正文 stub000 → 3bab91e。中文站：/docs/python-sdk/async/async-daytona。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-file-system",
        "title": "python-sdk/async/async-file-system",
        "webPath": "/docs/python-sdk/async/async-file-system",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-file-system",
        "detail": "官网正文 stub000 → 48f8e90。中文站：/docs/python-sdk/async/async-file-system。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-git",
        "title": "python-sdk/async/async-git",
        "webPath": "/docs/python-sdk/async/async-git",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-git",
        "detail": "官网正文 stub000 → df6177c。中文站：/docs/python-sdk/async/async-git。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-lsp-server",
        "title": "python-sdk/async/async-lsp-server",
        "webPath": "/docs/python-sdk/async/async-lsp-server",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-lsp-server",
        "detail": "官网正文 stub000 → c2623e2。中文站：/docs/python-sdk/async/async-lsp-server。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-object-storage",
        "title": "python-sdk/async/async-object-storage",
        "webPath": "/docs/python-sdk/async/async-object-storage",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-object-storage",
        "detail": "官网正文 stub000 → 5f127d1。中文站：/docs/python-sdk/async/async-object-storage。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-process",
        "title": "python-sdk/async/async-process",
        "webPath": "/docs/python-sdk/async/async-process",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-process",
        "detail": "官网正文 stub000 → cd16123。中文站：/docs/python-sdk/async/async-process。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-sandbox",
        "title": "python-sdk/async/async-sandbox",
        "webPath": "/docs/python-sdk/async/async-sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-sandbox",
        "detail": "官网正文 stub000 → 6af9b9d。中文站：/docs/python-sdk/async/async-sandbox。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-secret",
        "title": "python-sdk/async/async-secret",
        "webPath": "/docs/python-sdk/async/async-secret",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-secret",
        "detail": "官网正文 stub000 → e51b442。中文站：/docs/python-sdk/async/async-secret。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-snapshot",
        "title": "python-sdk/async/async-snapshot",
        "webPath": "/docs/python-sdk/async/async-snapshot",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-snapshot",
        "detail": "官网正文 stub000 → 380c306。中文站：/docs/python-sdk/async/async-snapshot。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-volume",
        "title": "python-sdk/async/async-volume",
        "webPath": "/docs/python-sdk/async/async-volume",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-volume",
        "detail": "官网正文 stub000 → 57e8cff。中文站：/docs/python-sdk/async/async-volume。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/common/charts",
        "title": "python-sdk/common/charts",
        "webPath": "/docs/python-sdk/common/charts",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/common/charts",
        "detail": "官网正文 stub000 → 1cfb0fc。中文站：/docs/python-sdk/common/charts。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/common/errors",
        "title": "python-sdk/common/errors",
        "webPath": "/docs/python-sdk/common/errors",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/common/errors",
        "detail": "官网正文 stub000 → 7581917。中文站：/docs/python-sdk/common/errors。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/common/image",
        "title": "python-sdk/common/image",
        "webPath": "/docs/python-sdk/common/image",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/common/image",
        "detail": "官网正文 stub000 → 077c3e9。中文站：/docs/python-sdk/common/image。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/code-interpreter",
        "title": "python-sdk/sync/code-interpreter",
        "webPath": "/docs/python-sdk/sync/code-interpreter",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/code-interpreter",
        "detail": "官网正文 stub000 → 4cc7730。中文站：/docs/python-sdk/sync/code-interpreter。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/computer-use",
        "title": "python-sdk/sync/computer-use",
        "webPath": "/docs/python-sdk/sync/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/computer-use",
        "detail": "官网正文 stub000 → 36c3e76。中文站：/docs/python-sdk/sync/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/daytona",
        "title": "python-sdk/sync/daytona",
        "webPath": "/docs/python-sdk/sync/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/daytona",
        "detail": "官网正文 stub000 → 3f1f6fc。中文站：/docs/python-sdk/sync/daytona。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/file-system",
        "title": "python-sdk/sync/file-system",
        "webPath": "/docs/python-sdk/sync/file-system",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/file-system",
        "detail": "官网正文 stub000 → 5b365ad。中文站：/docs/python-sdk/sync/file-system。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/git",
        "title": "python-sdk/sync/git",
        "webPath": "/docs/python-sdk/sync/git",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/git",
        "detail": "官网正文 stub000 → a003f97。中文站：/docs/python-sdk/sync/git。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/lsp-server",
        "title": "python-sdk/sync/lsp-server",
        "webPath": "/docs/python-sdk/sync/lsp-server",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/lsp-server",
        "detail": "官网正文 stub000 → fee61da。中文站：/docs/python-sdk/sync/lsp-server。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/object-storage",
        "title": "python-sdk/sync/object-storage",
        "webPath": "/docs/python-sdk/sync/object-storage",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/object-storage",
        "detail": "官网正文 stub000 → 03448b8。中文站：/docs/python-sdk/sync/object-storage。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/process",
        "title": "python-sdk/sync/process",
        "webPath": "/docs/python-sdk/sync/process",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/process",
        "detail": "官网正文 stub000 → aeef8c3。中文站：/docs/python-sdk/sync/process。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/sandbox",
        "title": "python-sdk/sync/sandbox",
        "webPath": "/docs/python-sdk/sync/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/sandbox",
        "detail": "官网正文 stub000 → 2c36774。中文站：/docs/python-sdk/sync/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/secret",
        "title": "python-sdk/sync/secret",
        "webPath": "/docs/python-sdk/sync/secret",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/secret",
        "detail": "官网正文 stub000 → 5dca146。中文站：/docs/python-sdk/sync/secret。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/snapshot",
        "title": "python-sdk/sync/snapshot",
        "webPath": "/docs/python-sdk/sync/snapshot",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/snapshot",
        "detail": "官网正文 stub000 → 2cb0d1a。中文站：/docs/python-sdk/sync/snapshot。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/volume",
        "title": "python-sdk/sync/volume",
        "webPath": "/docs/python-sdk/sync/volume",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/volume",
        "detail": "官网正文 stub000 → bbc3044。中文站：/docs/python-sdk/sync/volume。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/charts",
        "title": "ruby-sdk/charts",
        "webPath": "/docs/ruby-sdk/charts",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/charts",
        "detail": "官网正文 stub000 → 4018b9c。中文站：/docs/ruby-sdk/charts。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/computer-use",
        "title": "ruby-sdk/computer-use",
        "webPath": "/docs/ruby-sdk/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/computer-use",
        "detail": "官网正文 stub000 → c71eea7。中文站：/docs/ruby-sdk/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/config",
        "title": "ruby-sdk/config",
        "webPath": "/docs/ruby-sdk/config",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/config",
        "detail": "官网正文 stub000 → 7d55ea9。中文站：/docs/ruby-sdk/config。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/daytona",
        "title": "ruby-sdk/daytona",
        "webPath": "/docs/ruby-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/daytona",
        "detail": "官网正文 stub000 → 2bd87e0。中文站：/docs/ruby-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/file-system",
        "title": "ruby-sdk/file-system",
        "webPath": "/docs/ruby-sdk/file-system",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/file-system",
        "detail": "官网正文 stub000 → 44a52ad。中文站：/docs/ruby-sdk/file-system。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/git",
        "title": "ruby-sdk/git",
        "webPath": "/docs/ruby-sdk/git",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/git",
        "detail": "官网正文 stub000 → 5db7a98。中文站：/docs/ruby-sdk/git。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/image",
        "title": "ruby-sdk/image",
        "webPath": "/docs/ruby-sdk/image",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/image",
        "detail": "官网正文 stub000 → 904718b。中文站：/docs/ruby-sdk/image。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/lsp-server",
        "title": "ruby-sdk/lsp-server",
        "webPath": "/docs/ruby-sdk/lsp-server",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/lsp-server",
        "detail": "官网正文 stub000 → 83f0908。中文站：/docs/ruby-sdk/lsp-server。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/object-storage",
        "title": "ruby-sdk/object-storage",
        "webPath": "/docs/ruby-sdk/object-storage",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/object-storage",
        "detail": "官网正文 stub000 → 17c1482。中文站：/docs/ruby-sdk/object-storage。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/process",
        "title": "ruby-sdk/process",
        "webPath": "/docs/ruby-sdk/process",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/process",
        "detail": "官网正文 stub000 → 8929f7e。中文站：/docs/ruby-sdk/process。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/sandbox",
        "title": "ruby-sdk/sandbox",
        "webPath": "/docs/ruby-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/sandbox",
        "detail": "官网正文 stub000 → 4d831bd。中文站：/docs/ruby-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/secret-service",
        "title": "ruby-sdk/secret-service",
        "webPath": "/docs/ruby-sdk/secret-service",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/secret-service",
        "detail": "官网正文 stub000 → d756945。中文站：/docs/ruby-sdk/secret-service。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/secret",
        "title": "ruby-sdk/secret",
        "webPath": "/docs/ruby-sdk/secret",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/secret",
        "detail": "官网正文 stub000 → 317b3ca。中文站：/docs/ruby-sdk/secret。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/snapshot",
        "title": "ruby-sdk/snapshot",
        "webPath": "/docs/ruby-sdk/snapshot",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/snapshot",
        "detail": "官网正文 stub000 → 3dad850。中文站：/docs/ruby-sdk/snapshot。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/volume-service",
        "title": "ruby-sdk/volume-service",
        "webPath": "/docs/ruby-sdk/volume-service",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/volume-service",
        "detail": "官网正文 stub000 → 83e6dad。中文站：/docs/ruby-sdk/volume-service。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/volume",
        "title": "ruby-sdk/volume",
        "webPath": "/docs/ruby-sdk/volume",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/volume",
        "detail": "官网正文 stub000 → fe644b3。中文站：/docs/ruby-sdk/volume。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/charts",
        "title": "typescript-sdk/charts",
        "webPath": "/docs/typescript-sdk/charts",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/charts",
        "detail": "官网正文 stub000 → cee2723。中文站：/docs/typescript-sdk/charts。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/code-interpreter",
        "title": "typescript-sdk/code-interpreter",
        "webPath": "/docs/typescript-sdk/code-interpreter",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/code-interpreter",
        "detail": "官网正文 stub000 → 6a50529。中文站：/docs/typescript-sdk/code-interpreter。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/computer-use",
        "title": "typescript-sdk/computer-use",
        "webPath": "/docs/typescript-sdk/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/computer-use",
        "detail": "官网正文 stub000 → 5d5b1ec。中文站：/docs/typescript-sdk/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/daytona",
        "title": "typescript-sdk/daytona",
        "webPath": "/docs/typescript-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/daytona",
        "detail": "官网正文 stub000 → eda4423。中文站：/docs/typescript-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/errors",
        "title": "typescript-sdk/errors",
        "webPath": "/docs/typescript-sdk/errors",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/errors",
        "detail": "官网正文 stub000 → e717e8b。中文站：/docs/typescript-sdk/errors。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/execute-response",
        "title": "typescript-sdk/execute-response",
        "webPath": "/docs/typescript-sdk/execute-response",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/execute-response",
        "detail": "官网正文 stub000 → 2939dd1。中文站：/docs/typescript-sdk/execute-response。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/file-system",
        "title": "typescript-sdk/file-system",
        "webPath": "/docs/typescript-sdk/file-system",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/file-system",
        "detail": "官网正文 stub000 → c1271a6。中文站：/docs/typescript-sdk/file-system。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/git",
        "title": "typescript-sdk/git",
        "webPath": "/docs/typescript-sdk/git",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/git",
        "detail": "官网正文 stub000 → 0bc1af4。中文站：/docs/typescript-sdk/git。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/image",
        "title": "typescript-sdk/image",
        "webPath": "/docs/typescript-sdk/image",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/image",
        "detail": "官网正文 stub000 → 8f53aff。中文站：/docs/typescript-sdk/image。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/lsp-server",
        "title": "typescript-sdk/lsp-server",
        "webPath": "/docs/typescript-sdk/lsp-server",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/lsp-server",
        "detail": "官网正文 stub000 → bc5e7ee。中文站：/docs/typescript-sdk/lsp-server。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/object-storage",
        "title": "typescript-sdk/object-storage",
        "webPath": "/docs/typescript-sdk/object-storage",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/object-storage",
        "detail": "官网正文 stub000 → 600a959。中文站：/docs/typescript-sdk/object-storage。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/process",
        "title": "typescript-sdk/process",
        "webPath": "/docs/typescript-sdk/process",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/process",
        "detail": "官网正文 stub000 → 9d66b67。中文站：/docs/typescript-sdk/process。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/pty-handle",
        "title": "typescript-sdk/pty-handle",
        "webPath": "/docs/typescript-sdk/pty-handle",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/pty-handle",
        "detail": "官网正文 stub000 → 0564c40。中文站：/docs/typescript-sdk/pty-handle。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/pty",
        "title": "typescript-sdk/pty",
        "webPath": "/docs/typescript-sdk/pty",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/pty",
        "detail": "官网正文 stub000 → 838dbb7。中文站：/docs/typescript-sdk/pty。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/sandbox",
        "title": "typescript-sdk/sandbox",
        "webPath": "/docs/typescript-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/sandbox",
        "detail": "官网正文 stub000 → 8c6a61e。中文站：/docs/typescript-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/secret",
        "title": "typescript-sdk/secret",
        "webPath": "/docs/typescript-sdk/secret",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/secret",
        "detail": "官网正文 stub000 → 0396453。中文站：/docs/typescript-sdk/secret。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/snapshot",
        "title": "typescript-sdk/snapshot",
        "webPath": "/docs/typescript-sdk/snapshot",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/snapshot",
        "detail": "官网正文 stub000 → d60769a。中文站：/docs/typescript-sdk/snapshot。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/volume",
        "title": "typescript-sdk/volume",
        "webPath": "/docs/typescript-sdk/volume",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/volume",
        "detail": "官网正文 stub000 → b17b436。中文站：/docs/typescript-sdk/volume。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/warm-pool",
        "title": "typescript-sdk/warm-pool",
        "webPath": "/docs/typescript-sdk/warm-pool",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/warm-pool",
        "detail": "官网正文 stub000 → e8880d4。中文站：/docs/typescript-sdk/warm-pool。"
      }
    ]
  },
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
