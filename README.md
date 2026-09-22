# Daytona 中文手册

[Daytona](https://www.daytona.io/docs/) 官方文档的中文手册站点：安全、弹性的 AI 代码沙箱。

**在线阅读：** [https://gradient30.github.io/daytona-docs-zh/](https://gradient30.github.io/daytona-docs-zh/)

- 官方文档：[www.daytona.io/docs](https://www.daytona.io/docs/)
- 英文源：官网 Markdown（任意页面加 `.md`，例如 [sandboxes.md](https://www.daytona.io/docs/en/sandboxes.md)）与 [sitemap-0.xml](https://www.daytona.io/docs/sitemap-0.xml)
- 本仓库：**非官方**译本与阅读器。命令、产品名、代码块与 `/docs/...` 路径与官网对齐
- 发布：GitHub Pages（`main` 推送后自动构建；工作流 `.github/workflows/pages.yml`）
- **第一次上线**（一次性）：打开 [Settings → Pages](https://github.com/gradient30/daytona-docs-zh/settings/pages)，Source 选 **GitHub Actions**，再在 [Actions](https://github.com/gradient30/daytona-docs-zh/actions) 里重新跑 `Deploy GitHub Pages`
- 顶栏「同步」：每次官网对照后单独记一笔日志，写明改了什么、中文站在哪一页（[同步日志](src/content/zh/updates.md)）
- 仓库每天 UTC 08:00 用 GitHub Actions 拉 sitemap 与各页 Markdown 哈希，有变动才回写同步日志并标出中文站路径
- 每天 09:00（北京时间）例行重译变动页，保持永久汉化
- 风格：明 / 暗 / 彩，切换结果保存在浏览器本地

## 内容

| 部分 | 说明 |
| --- | --- |
| 官网正文 | 沙箱、快照、卷、区域、架构、隔离、运行时、安全运维、SDK / CLI / API、集成指南 |
| [快速手册](src/content/zh/quick-guide.md) | 拿密钥、起沙箱、跑代码 |
| [同步日志](src/content/zh/updates.md) | 每次官网更新的独立记录：改了什么 + 中文站路径 |
| [对照表](src/content/zh/sitemap.md) | 每页指纹，待更新行直接链到中文站位置 |
| [本站架构](src/content/zh/architecture-site.md) | 阅读器与每日同步驱动图 |

常用入口：

- `/` — 官网首页译本
- `/docs/quick-guide` — 快速手册
- `/docs/updates` — 同步日志（顶栏「同步」进入）
- `/docs/sitemap` — 对照表
- `/docs/sandboxes`、`/docs/guides/claude` 等与官网路径对齐（去掉 `en/`）

## 本地运行

```bash
npm install
npm run dev
```

GitHub Pages 静态构建：

```bash
npm run build:pages
```

同步官方文档指纹（有变动会写入同步日志）：

```bash
npm run sync:docs
```

某页补译完成后，把指纹标成已对齐：

```bash
npm run sync:docs -- --mark-translated sandboxes,snapshots
```

产物在 `.output/public`。

## 技术栈

TanStack Start + Vite + Tailwind v4。正文是 `src/content/zh/**/*.md`，由 `src/lib/docs/catalog.ts` 建目录、`src/components/docs/Markdown.tsx` 渲染。

## 许可与归属

Daytona 是 [Daytona](https://www.daytona.io) 的产品。本仓库仅提供中文阅读与对照，不替代官方文档。
