# Web 终端 {#web-terminal}

仪表盘、CLI 或预览 URL 进入沙箱终端。

Daytona 提供浏览器里的 Web 终端，用来和沙箱交互。不用在本机装工具，就能跑命令、看文件、直接调试。

- **远程执行命令**：在沙箱里直接跑 shell
- **文件管理**：浏览文件系统，查看和编辑文件
- **调试**：看日志、盯进程、排查问题
- **包管理**：安装依赖、配置环境

## 从仪表盘进入 {#access-from-dashboard}

从 [Daytona 仪表盘 ↗](https://app.daytona.io/dashboard/sandboxes) 直接打开 Web 终端。

1. 打开 [Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. 找到要进入的、正在运行的沙箱
3. 点击终端图标 **`>_`**

终端会在新标签页打开，连到该沙箱的完整会话。只有状态为 `STARTED` 的沙箱才能用。沙箱若已停止，先启动再打开终端。

## 通过 CLI 访问 {#access-via-cli}

用 Daytona CLI 创建沙箱时，输出里会自动带上 Web 终端 URL。

```shell
daytona create
```

CLI 输出包含终端地址：

```text
Sandbox '<sandboxId>' created successfully
Connect via SSH:         daytona ssh <sandboxId>
Open the Web Terminal:   https://22222-<sandboxId>.proxy.daytona.work
```

## 通过 URL 访问 {#access-via-url}

Web 终端跑在每个沙箱的 `22222` 端口。可以用[预览 URL](/docs/preview) 以编程方式拿到终端地址。

把端口 `22222` 传给预览 URL 方法：

```python
terminal_info = sandbox.get_preview_link(22222)
print(f"Web Terminal URL: {terminal_info.url}")
```

```typescript
const terminalInfo = await sandbox.getPreviewLink(22222);
console.log(`Web Terminal URL: ${terminalInfo.url}`);
```

```ruby
terminal_info = sandbox.preview_url(22222)
puts "Web Terminal URL: #{terminal_info.url}"
```

```go
url, err := sandbox.GetPreviewLink(ctx, 22222)
```

```bash
daytona preview-url <sandbox-name> --port 22222
```

```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxId}/ports/22222/preview-url' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 安全 {#security}

只有所属[组织](/docs/organizations)里、并且能访问该沙箱的已登录成员，才能拿到 Web 终端凭证。沙箱的 `public` 设置**不适用于** Web 终端：即便 `public` 为 `true`，仍然需要有效凭证。

凭证形态取决于 URL 类型：

- [签名预览 URL](/docs/preview#signed-preview-url) 把令牌放在 URL 里。拿到这条 URL 的人，在过期或被撤销之前，不用登录 Daytona 就能使用终端。从仪表盘打开的终端 URL 就是签名预览 URL。
- [标准预览 URL](/docs/preview#standard-preview-url) 需要预览令牌，放在 `x-daytona-preview-token` 请求头里。持有该令牌的人可以使用终端，而且这个令牌不能撤销。

> Web 终端等于沙箱的完整 shell。终端 URL 和预览令牌要按 SSH 凭证同等保管，不要发给不受信任的人。

> 英文原文：https://www.daytona.io/docs/en/web-terminal
> 本站位置：`/docs/web-terminal`
