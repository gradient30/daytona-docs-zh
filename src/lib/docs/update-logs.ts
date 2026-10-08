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
    "id": "2026-10-08-e93a76",
    "date": "2026-10-08",
    "title": "官网对照：17 处变动",
    "summary": "更新 /docs/computer-use；更新 /docs/declarative-builder；更新 /docs/file-system-operations；更新 /docs/git-operations；更新 /docs/go-sdk/daytona；更新 /docs/guides/claude；新增 /docs/guides/claude/claude-draws-daytona-sandbox；更新 /docs/java-sdk/computer-use",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "computer-use",
        "title": "computer-use",
        "webPath": "/docs/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/computer-use",
        "detail": "官网正文 7a5ba7c → 74d5d94。中文站：/docs/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "declarative-builder",
        "title": "declarative-builder",
        "webPath": "/docs/declarative-builder",
        "officialUrl": "https://www.daytona.io/docs/en/declarative-builder",
        "detail": "官网正文 978332d → 9e45c33。中文站：/docs/declarative-builder。"
      },
      {
        "kind": "updated",
        "slug": "file-system-operations",
        "title": "file-system-operations",
        "webPath": "/docs/file-system-operations",
        "officialUrl": "https://www.daytona.io/docs/en/file-system-operations",
        "detail": "官网正文 c546686 → c436af8。中文站：/docs/file-system-operations。"
      },
      {
        "kind": "updated",
        "slug": "git-operations",
        "title": "git-operations",
        "webPath": "/docs/git-operations",
        "officialUrl": "https://www.daytona.io/docs/en/git-operations",
        "detail": "官网正文 22deb8e → c594923。中文站：/docs/git-operations。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/daytona",
        "title": "go-sdk/daytona",
        "webPath": "/docs/go-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/daytona",
        "detail": "官网正文 74cce37 → d36b086。中文站：/docs/go-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "guides/claude",
        "title": "guides/claude",
        "webPath": "/docs/guides/claude",
        "officialUrl": "https://www.daytona.io/docs/en/guides/claude",
        "detail": "官网正文 249e49b → ffd0e81。中文站：/docs/guides/claude。"
      },
      {
        "kind": "added",
        "slug": "guides/claude/claude-draws-daytona-sandbox",
        "title": "claude-draws-daytona-sandbox",
        "webPath": "/docs/guides/claude/claude-draws-daytona-sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/guides/claude/claude-draws-daytona-sandbox",
        "detail": "官网新增页面（哈希 732b8bf71a4d）。中文站位置：/docs/guides/claude/claude-draws-daytona-sandbox，已自动建档待补译。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/computer-use",
        "title": "java-sdk/computer-use",
        "webPath": "/docs/java-sdk/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/computer-use",
        "detail": "官网正文 e096be5 → bae6339。中文站：/docs/java-sdk/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "observability/otel-collection",
        "title": "observability/otel-collection",
        "webPath": "/docs/observability/otel-collection",
        "officialUrl": "https://www.daytona.io/docs/en/observability/otel-collection",
        "detail": "官网正文 2c75120 → 6c80fba。中文站：/docs/observability/otel-collection。"
      },
      {
        "kind": "updated",
        "slug": "process-code-execution",
        "title": "process-code-execution",
        "webPath": "/docs/process-code-execution",
        "officialUrl": "https://www.daytona.io/docs/en/process-code-execution",
        "detail": "官网正文 1a2fd79 → e5ce666。中文站：/docs/process-code-execution。"
      },
      {
        "kind": "updated",
        "slug": "pty",
        "title": "pty",
        "webPath": "/docs/pty",
        "officialUrl": "https://www.daytona.io/docs/en/pty",
        "detail": "官网正文 12a57f0 → b49f06d。中文站：/docs/pty。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-computer-use",
        "title": "python-sdk/async/async-computer-use",
        "webPath": "/docs/python-sdk/async/async-computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-computer-use",
        "detail": "官网正文 1676810 → ab3e318。中文站：/docs/python-sdk/async/async-computer-use。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/computer-use",
        "title": "python-sdk/sync/computer-use",
        "webPath": "/docs/python-sdk/sync/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/computer-use",
        "detail": "官网正文 36c3e76 → 802819c。中文站：/docs/python-sdk/sync/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "sandboxes",
        "title": "sandboxes",
        "webPath": "/docs/sandboxes",
        "officialUrl": "https://www.daytona.io/docs/en/sandboxes",
        "detail": "官网正文 46a0344 → f08df2f。中文站：/docs/sandboxes。"
      },
      {
        "kind": "updated",
        "slug": "snapshots",
        "title": "snapshots",
        "webPath": "/docs/snapshots",
        "officialUrl": "https://www.daytona.io/docs/en/snapshots",
        "detail": "官网正文 19e20c2 → c399a89。中文站：/docs/snapshots。"
      },
      {
        "kind": "updated",
        "slug": "tools/api",
        "title": "tools/api",
        "webPath": "/docs/tools/api",
        "officialUrl": "https://www.daytona.io/docs/en/tools/api",
        "detail": "官网正文 24fb2af → 59895e3。中文站：/docs/tools/api。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/computer-use",
        "title": "typescript-sdk/computer-use",
        "webPath": "/docs/typescript-sdk/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/computer-use",
        "detail": "官网正文 5d5b1ec → 869f141。中文站：/docs/typescript-sdk/computer-use。"
      }
    ]
  },
  {
    "id": "2026-10-07-a549ad",
    "date": "2026-10-07",
    "title": "官网对照：18 处变动",
    "summary": "更新 /；新增 /docs/acceptable-use；更新 /docs/audit-logs；更新 /docs/computer-use；更新 /docs/declarative-builder；更新 /docs/file-system-operations；更新 /docs/language-server-protocol；更新 /docs/limits",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "index",
        "title": "index",
        "webPath": "/",
        "officialUrl": "https://www.daytona.io/docs/",
        "detail": "官网正文 f1a498f → 8f2d385。中文站：/。"
      },
      {
        "kind": "added",
        "slug": "acceptable-use",
        "title": "acceptable-use",
        "webPath": "/docs/acceptable-use",
        "officialUrl": "https://www.daytona.io/docs/en/acceptable-use",
        "detail": "官网新增页面（哈希 e01e5d18b057）。中文站位置：/docs/acceptable-use，已自动建档待补译。"
      },
      {
        "kind": "updated",
        "slug": "audit-logs",
        "title": "audit-logs",
        "webPath": "/docs/audit-logs",
        "officialUrl": "https://www.daytona.io/docs/en/audit-logs",
        "detail": "官网正文 2fa6176 → 00007d0。中文站：/docs/audit-logs。"
      },
      {
        "kind": "updated",
        "slug": "computer-use",
        "title": "computer-use",
        "webPath": "/docs/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/computer-use",
        "detail": "官网正文 6a26c05 → 7a5ba7c。中文站：/docs/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "declarative-builder",
        "title": "declarative-builder",
        "webPath": "/docs/declarative-builder",
        "officialUrl": "https://www.daytona.io/docs/en/declarative-builder",
        "detail": "官网正文 4b83f68 → 978332d。中文站：/docs/declarative-builder。"
      },
      {
        "kind": "updated",
        "slug": "file-system-operations",
        "title": "file-system-operations",
        "webPath": "/docs/file-system-operations",
        "officialUrl": "https://www.daytona.io/docs/en/file-system-operations",
        "detail": "官网正文 80fe075 → c546686。中文站：/docs/file-system-operations。"
      },
      {
        "kind": "updated",
        "slug": "language-server-protocol",
        "title": "language-server-protocol",
        "webPath": "/docs/language-server-protocol",
        "officialUrl": "https://www.daytona.io/docs/en/language-server-protocol",
        "detail": "官网正文 9dffc9d → 7fa62a8。中文站：/docs/language-server-protocol。"
      },
      {
        "kind": "updated",
        "slug": "limits",
        "title": "limits",
        "webPath": "/docs/limits",
        "officialUrl": "https://www.daytona.io/docs/en/limits",
        "detail": "官网正文 4bd0118 → ecda79d。中文站：/docs/limits。"
      },
      {
        "kind": "updated",
        "slug": "observability/otel-collection",
        "title": "observability/otel-collection",
        "webPath": "/docs/observability/otel-collection",
        "officialUrl": "https://www.daytona.io/docs/en/observability/otel-collection",
        "detail": "官网正文 6a7f646 → 2c75120。中文站：/docs/observability/otel-collection。"
      },
      {
        "kind": "updated",
        "slug": "organizations",
        "title": "organizations",
        "webPath": "/docs/organizations",
        "officialUrl": "https://www.daytona.io/docs/en/organizations",
        "detail": "官网正文 4307b26 → e9b6526。中文站：/docs/organizations。"
      },
      {
        "kind": "updated",
        "slug": "persistence",
        "title": "persistence",
        "webPath": "/docs/persistence",
        "officialUrl": "https://www.daytona.io/docs/en/persistence",
        "detail": "官网正文 298711f → 02ca563。中文站：/docs/persistence。"
      },
      {
        "kind": "updated",
        "slug": "process-code-execution",
        "title": "process-code-execution",
        "webPath": "/docs/process-code-execution",
        "officialUrl": "https://www.daytona.io/docs/en/process-code-execution",
        "detail": "官网正文 d6ee219 → 1a2fd79。中文站：/docs/process-code-execution。"
      },
      {
        "kind": "updated",
        "slug": "pty",
        "title": "pty",
        "webPath": "/docs/pty",
        "officialUrl": "https://www.daytona.io/docs/en/pty",
        "detail": "官网正文 081df58 → 12a57f0。中文站：/docs/pty。"
      },
      {
        "kind": "updated",
        "slug": "sandboxes",
        "title": "sandboxes",
        "webPath": "/docs/sandboxes",
        "officialUrl": "https://www.daytona.io/docs/en/sandboxes",
        "detail": "官网正文 c152a0c → 46a0344。中文站：/docs/sandboxes。"
      },
      {
        "kind": "updated",
        "slug": "scale",
        "title": "scale",
        "webPath": "/docs/scale",
        "officialUrl": "https://www.daytona.io/docs/en/scale",
        "detail": "官网正文 f6c7762 → 20dd685。中文站：/docs/scale。"
      },
      {
        "kind": "updated",
        "slug": "snapshots",
        "title": "snapshots",
        "webPath": "/docs/snapshots",
        "officialUrl": "https://www.daytona.io/docs/en/snapshots",
        "detail": "官网正文 1ebe7b1 → 19e20c2。中文站：/docs/snapshots。"
      },
      {
        "kind": "updated",
        "slug": "troubleshooting",
        "title": "troubleshooting",
        "webPath": "/docs/troubleshooting",
        "officialUrl": "https://www.daytona.io/docs/en/troubleshooting",
        "detail": "官网正文 86aa5de → fc858c0。中文站：/docs/troubleshooting。"
      },
      {
        "kind": "updated",
        "slug": "vpn-connections",
        "title": "vpn-connections",
        "webPath": "/docs/vpn-connections",
        "officialUrl": "https://www.daytona.io/docs/en/vpn-connections",
        "detail": "官网正文 3d59956 → c89f8ee。中文站：/docs/vpn-connections。"
      }
    ]
  },
  {
    "id": "2026-10-06-fabffd",
    "date": "2026-10-06",
    "title": "官网对照：7 处变动",
    "summary": "更新 /docs/computer-use；更新 /docs/limits；更新 /docs/network-limits；更新 /docs/sandboxes；更新 /docs/troubleshooting；更新 /docs/vnc-access；更新 /docs/web-terminal",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "computer-use",
        "title": "计算机使用",
        "webPath": "/docs/computer-use",
        "officialUrl": "https://www.daytona.io/docs/en/computer-use",
        "detail": "macOS 入口改为沙箱文档锚点；自定义镜像/自定义快照（含 Linux VM 快照）需自行安装 VNC 与桌面软件包。官网正文 e4e9489 → 6a26c05。中文站：/docs/computer-use。"
      },
      {
        "kind": "updated",
        "slug": "limits",
        "title": "限额",
        "webPath": "/docs/limits",
        "officialUrl": "https://www.daytona.io/docs/en/limits",
        "detail": "GPU 沙箱改计 Earth 区域单独配额，vCPU/内存/磁盘不占等级计算池；Spot GPU 需要 Tier 2+；按需 GPU 不必升到 Tier 3。官网正文 2d2a821 → 4bd0118。中文站：/docs/limits。"
      },
      {
        "kind": "updated",
        "slug": "network-limits",
        "title": "网络限额",
        "webPath": "/docs/network-limits",
        "officialUrl": "https://www.daytona.io/docs/en/network-limits",
        "detail": "重译出站防火墙参数与等级策略：Tier 1/2 不能在沙箱级覆盖；Tier 3/4 允许列表或全阻断会挡住基础服务，除非自己列入。outboundProxyUrl 仍只能创建时设置。官网正文 bc1fc63 → ac1dd8f。中文站：/docs/network-limits。"
      },
      {
        "kind": "updated",
        "slug": "sandboxes",
        "title": "沙箱",
        "webPath": "/docs/sandboxes",
        "officialUrl": "https://www.daytona.io/docs/en/sandboxes",
        "detail": "补上 Earth 区域 GPU 配额说明，以及 Spot GPU 需要 Tier 2 或更高。官网正文 6b33ce5 → c152a0c。中文站：/docs/sandboxes。"
      },
      {
        "kind": "updated",
        "slug": "troubleshooting",
        "title": "故障排查",
        "webPath": "/docs/troubleshooting",
        "officialUrl": "https://www.daytona.io/docs/en/troubleshooting",
        "detail": "补 GPU 创建 400、配额为 0、Pending Build 与 CUDA 999：共享区域报错区域名为 earth。官网正文 b93ee4e → 86aa5de。中文站：/docs/troubleshooting。"
      },
      {
        "kind": "updated",
        "slug": "vnc-access",
        "title": "VNC 访问",
        "webPath": "/docs/vnc-access",
        "officialUrl": "https://www.daytona.io/docs/en/vnc-access",
        "detail": "要求改为默认快照；自定义镜像和自定义 Linux VM 快照需装包。Linux VM 快照不支持 Dockerfile，可在运行中的 VM 里装包再做快照。官网正文 ea8511a → 0919b87。中文站：/docs/vnc-access。"
      },
      {
        "kind": "updated",
        "slug": "web-terminal",
        "title": "Web 终端",
        "webPath": "/docs/web-terminal",
        "officialUrl": "https://www.daytona.io/docs/en/web-terminal",
        "detail": "安全模型改为凭证制：public 不作用于终端。签名预览 URL 把令牌放在 URL 里；标准预览 URL 用 x-daytona-preview-token，且令牌不可撤销。官网正文 28c85c5 → 9b06d80。中文站：/docs/web-terminal。"
      }
    ]
  },
  {
    "id": "2026-10-05-a0cbb0",
    "date": "2026-10-05",
    "title": "官网对照：1 处变动",
    "summary": "更新 /docs/mount-external-storage",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "mount-external-storage",
        "title": "mount-external-storage",
        "webPath": "/docs/mount-external-storage",
        "officialUrl": "https://www.daytona.io/docs/en/mount-external-storage",
        "detail": "官网正文 52876ea → a932b3d。中文站：/docs/mount-external-storage。"
      }
    ]
  },
  {
    "id": "2026-09-30-d892b0",
    "date": "2026-09-30",
    "title": "官网对照：1 处变动",
    "summary": "新增 /docs/guides/convex/convex-ai-app-builder-sandbox",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "added",
        "slug": "guides/convex/convex-ai-app-builder-sandbox",
        "title": "convex-ai-app-builder-sandbox",
        "webPath": "/docs/guides/convex/convex-ai-app-builder-sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/guides/convex/convex-ai-app-builder-sandbox",
        "detail": "官网新增页面（哈希 cddcdf397c21）。中文站位置：/docs/guides/convex/convex-ai-app-builder-sandbox，已自动建档待补译。"
      }
    ]
  },
  {
    "id": "2026-09-30-d5725b",
    "date": "2026-09-30",
    "title": "官网对照：22 处变动",
    "summary": "更新 /docs/api-keys；更新 /docs/architecture；更新 /docs/go-sdk/daytona；更新 /docs/go-sdk/errors；更新 /docs/go-sdk/types；更新 /docs/java-sdk/errors；更新 /docs/java-sdk/sandbox；更新 /docs/organizations",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "api-keys",
        "title": "api-keys",
        "webPath": "/docs/api-keys",
        "officialUrl": "https://www.daytona.io/docs/en/api-keys",
        "detail": "官网正文 1390fe9 → 5f60f43。中文站：/docs/api-keys。"
      },
      {
        "kind": "updated",
        "slug": "architecture",
        "title": "architecture",
        "webPath": "/docs/architecture",
        "officialUrl": "https://www.daytona.io/docs/en/architecture",
        "detail": "官网正文 990f008 → 1ecb821。中文站：/docs/architecture。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/daytona",
        "title": "go-sdk/daytona",
        "webPath": "/docs/go-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/daytona",
        "detail": "官网正文 8f74c61 → 74cce37。中文站：/docs/go-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/errors",
        "title": "go-sdk/errors",
        "webPath": "/docs/go-sdk/errors",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/errors",
        "detail": "官网正文 e94764e → 4b0a0b0。中文站：/docs/go-sdk/errors。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/types",
        "title": "go-sdk/types",
        "webPath": "/docs/go-sdk/types",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/types",
        "detail": "官网正文 ba03112 → 2a58985。中文站：/docs/go-sdk/types。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/errors",
        "title": "java-sdk/errors",
        "webPath": "/docs/java-sdk/errors",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/errors",
        "detail": "官网正文 98c29a3 → 1a97517。中文站：/docs/java-sdk/errors。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/sandbox",
        "title": "java-sdk/sandbox",
        "webPath": "/docs/java-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/sandbox",
        "detail": "官网正文 968ac0f → 85d0136。中文站：/docs/java-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "organizations",
        "title": "organizations",
        "webPath": "/docs/organizations",
        "officialUrl": "https://www.daytona.io/docs/en/organizations",
        "detail": "官网正文 8c44676 → 4307b26。中文站：/docs/organizations。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-daytona",
        "title": "python-sdk/async/async-daytona",
        "webPath": "/docs/python-sdk/async/async-daytona",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-daytona",
        "detail": "官网正文 aa5db26 → 4bb2a1c。中文站：/docs/python-sdk/async/async-daytona。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-sandbox",
        "title": "python-sdk/async/async-sandbox",
        "webPath": "/docs/python-sdk/async/async-sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-sandbox",
        "detail": "官网正文 1303717 → b764b8c。中文站：/docs/python-sdk/async/async-sandbox。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/common/errors",
        "title": "python-sdk/common/errors",
        "webPath": "/docs/python-sdk/common/errors",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/common/errors",
        "detail": "官网正文 7581917 → cff5999。中文站：/docs/python-sdk/common/errors。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/daytona",
        "title": "python-sdk/sync/daytona",
        "webPath": "/docs/python-sdk/sync/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/daytona",
        "detail": "官网正文 c8797e5 → 3d3e233。中文站：/docs/python-sdk/sync/daytona。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/sandbox",
        "title": "python-sdk/sync/sandbox",
        "webPath": "/docs/python-sdk/sync/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/sandbox",
        "detail": "官网正文 c55f9b8 → 495b041。中文站：/docs/python-sdk/sync/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/daytona",
        "title": "ruby-sdk/daytona",
        "webPath": "/docs/ruby-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/daytona",
        "detail": "官网正文 2bd87e0 → e34b1b5。中文站：/docs/ruby-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/sandbox",
        "title": "ruby-sdk/sandbox",
        "webPath": "/docs/ruby-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/sandbox",
        "detail": "官网正文 5d0ea4c → 1a331ff。中文站：/docs/ruby-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "sso",
        "title": "sso",
        "webPath": "/docs/sso",
        "officialUrl": "https://www.daytona.io/docs/en/sso",
        "detail": "官网正文 13b0ddd → 3899975。中文站：/docs/sso。"
      },
      {
        "kind": "updated",
        "slug": "tools/api",
        "title": "tools/api",
        "webPath": "/docs/tools/api",
        "officialUrl": "https://www.daytona.io/docs/en/tools/api",
        "detail": "官网正文 943cb21 → 24fb2af。中文站：/docs/tools/api。"
      },
      {
        "kind": "updated",
        "slug": "tools/cli",
        "title": "tools/cli",
        "webPath": "/docs/tools/cli",
        "officialUrl": "https://www.daytona.io/docs/en/tools/cli",
        "detail": "官网正文 0a3b024 → f365893。中文站：/docs/tools/cli。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/daytona",
        "title": "typescript-sdk/daytona",
        "webPath": "/docs/typescript-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/daytona",
        "detail": "官网正文 286910e → 78cdf0d。中文站：/docs/typescript-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/errors",
        "title": "typescript-sdk/errors",
        "webPath": "/docs/typescript-sdk/errors",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/errors",
        "detail": "官网正文 e717e8b → 58f6d5f。中文站：/docs/typescript-sdk/errors。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/sandbox",
        "title": "typescript-sdk/sandbox",
        "webPath": "/docs/typescript-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/sandbox",
        "detail": "官网正文 e38b608 → 9b38f2d。中文站：/docs/typescript-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "vpn-connections",
        "title": "vpn-connections",
        "webPath": "/docs/vpn-connections",
        "officialUrl": "https://www.daytona.io/docs/en/vpn-connections",
        "detail": "官网正文 6bb9b92 → 3d59956。中文站：/docs/vpn-connections。"
      }
    ]
  },
  {
    id: "2026-09-28-sync",
    date: "2026-09-28",
    title: "官网对照：密钥权限与嵌套虚拟化",
    summary: "Developer 不再包含创建密钥；write:sandboxes 可挂载任意密钥；Linux VM 支持嵌套虚拟化（kvm）。404 页补上中文。",
    sourceHint: "https://www.daytona.io/docs/sitemap-0.xml · 2026-09-28",
    changes: [
      { kind: "updated", slug: "sandboxes", title: "沙箱", webPath: "/docs/sandboxes", officialUrl: "https://www.daytona.io/docs/en/sandboxes", detail: "新增嵌套虚拟化：Linux VM 可开 kvm。中文站 /docs/sandboxes#nested-virtualization。" },
      { kind: "updated", slug: "api-keys", title: "认证", webPath: "/docs/api-keys", officialUrl: "https://www.daytona.io/docs/en/api-keys", detail: "创建密钥不再是可分配权限。write:sandboxes 可以挂载组织内任意密钥。" },
      { kind: "updated", slug: "organizations", title: "组织", webPath: "/docs/organizations", officialUrl: "https://www.daytona.io/docs/en/organizations", detail: "Developer 只创建沙箱，不再包含创建密钥。" },
      { kind: "updated", slug: "secrets", title: "密钥", webPath: "/docs/secrets", officialUrl: "https://www.daytona.io/docs/en/secrets", detail: "没有主机允许列表时会对任意主机替换。挂载密钥需要 write:sandboxes。" },
      { kind: "updated", slug: "tools/cli", title: "CLI", webPath: "/docs/tools/cli", officialUrl: "https://www.daytona.io/docs/en/tools/cli", detail: "daytona create 新增 --kvm。" },
      { kind: "updated", slug: "tools/api", title: "API 参考", webPath: "/docs/tools/api", officialUrl: "https://www.daytona.io/docs/en/tools/api", detail: "新增 GET …/identity-providers/workos-sso-connections。" },
      { kind: "updated", slug: "troubleshooting", title: "故障排查", webPath: "/docs/troubleshooting", officialUrl: "https://www.daytona.io/docs/en/troubleshooting", detail: "403 说明改为 Developer 只创建沙箱。" },
      { kind: "added", slug: "404", title: "未找到", webPath: "/docs/404", officialUrl: "https://www.daytona.io/docs/en/404", detail: "官网 404 页补上中文说明。" },
    ],
  },
  {
    "id": "2026-09-26-13daf7",
    "date": "2026-09-26",
    "title": "官网对照：13 处变动",
    "summary": "更新 /docs/go-sdk/daytona；更新 /docs/go-sdk/types；更新 /docs/java-sdk/daytona；更新 /docs/java-sdk/sandbox；更新 /docs/python-sdk/async/async-daytona；更新 /docs/python-sdk/async/async-sandbox；更新 /docs/python-sdk/sync/daytona；更新 /docs/python-sdk/sync/sandbox",
    "sourceHint": "https://www.daytona.io/docs/llms.txt · https://www.daytona.io/docs/sitemap-0.xml",
    "changes": [
      {
        "kind": "updated",
        "slug": "go-sdk/daytona",
        "title": "go-sdk/daytona",
        "webPath": "/docs/go-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/daytona",
        "detail": "官网正文 d0fd864 → 8f74c61。中文站：/docs/go-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "go-sdk/types",
        "title": "go-sdk/types",
        "webPath": "/docs/go-sdk/types",
        "officialUrl": "https://www.daytona.io/docs/en/go-sdk/types",
        "detail": "官网正文 22f7345 → ba03112。中文站：/docs/go-sdk/types。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/daytona",
        "title": "java-sdk/daytona",
        "webPath": "/docs/java-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/daytona",
        "detail": "官网正文 ec8d0b8 → 0010d85。中文站：/docs/java-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "java-sdk/sandbox",
        "title": "java-sdk/sandbox",
        "webPath": "/docs/java-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/java-sdk/sandbox",
        "detail": "官网正文 29aca72 → 968ac0f。中文站：/docs/java-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-daytona",
        "title": "python-sdk/async/async-daytona",
        "webPath": "/docs/python-sdk/async/async-daytona",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-daytona",
        "detail": "官网正文 3bab91e → aa5db26。中文站：/docs/python-sdk/async/async-daytona。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/async/async-sandbox",
        "title": "python-sdk/async/async-sandbox",
        "webPath": "/docs/python-sdk/async/async-sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/async/async-sandbox",
        "detail": "官网正文 6af9b9d → 1303717。中文站：/docs/python-sdk/async/async-sandbox。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/daytona",
        "title": "python-sdk/sync/daytona",
        "webPath": "/docs/python-sdk/sync/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/daytona",
        "detail": "官网正文 3f1f6fc → c8797e5。中文站：/docs/python-sdk/sync/daytona。"
      },
      {
        "kind": "updated",
        "slug": "python-sdk/sync/sandbox",
        "title": "python-sdk/sync/sandbox",
        "webPath": "/docs/python-sdk/sync/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/python-sdk/sync/sandbox",
        "detail": "官网正文 2c36774 → c55f9b8。中文站：/docs/python-sdk/sync/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "ruby-sdk/sandbox",
        "title": "ruby-sdk/sandbox",
        "webPath": "/docs/ruby-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/ruby-sdk/sandbox",
        "detail": "官网正文 4d831bd → 5d0ea4c。中文站：/docs/ruby-sdk/sandbox。"
      },
      {
        "kind": "updated",
        "slug": "sandboxes",
        "title": "sandboxes",
        "webPath": "/docs/sandboxes",
        "officialUrl": "https://www.daytona.io/docs/en/sandboxes",
        "detail": "官网正文 91f9ea2 → 6b33ce5。中文站：/docs/sandboxes。"
      },
      {
        "kind": "updated",
        "slug": "tools/cli",
        "title": "tools/cli",
        "webPath": "/docs/tools/cli",
        "officialUrl": "https://www.daytona.io/docs/en/tools/cli",
        "detail": "官网正文 814b44b → 0a3b024。中文站：/docs/tools/cli。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/daytona",
        "title": "typescript-sdk/daytona",
        "webPath": "/docs/typescript-sdk/daytona",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/daytona",
        "detail": "官网正文 eda4423 → 286910e。中文站：/docs/typescript-sdk/daytona。"
      },
      {
        "kind": "updated",
        "slug": "typescript-sdk/sandbox",
        "title": "typescript-sdk/sandbox",
        "webPath": "/docs/typescript-sdk/sandbox",
        "officialUrl": "https://www.daytona.io/docs/en/typescript-sdk/sandbox",
        "detail": "官网正文 8c6a61e → e38b608。中文站：/docs/typescript-sdk/sandbox。"
      }
    ]
  },
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
