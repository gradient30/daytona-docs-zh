# 快速手册 {#quick-guide}

面向日常最高频操作：拿密钥、起沙箱、跑代码、看预览。完整概念请回官网对照页。

## 一分钟跑通 {#one-minute}

1. 打开 [Daytona Dashboard](https://app.daytona.io) 注册。
2. 在 [Keys](https://app.daytona.io/dashboard/keys) 创建 API 密钥。
3. 安装 SDK 或 CLI。
4. `create()` 一台沙箱，再 `code_run` / `exec`。

```bash
export DAYTONA_API_KEY=你的密钥
pip install daytona
```

```python
from daytona import Daytona
sandbox = Daytona().create()
print(sandbox.process.code_run('print("ok")').result)
```

## 高频路径 {#paths}

| 你想做的事 | 去哪 | 本站位置 |
| --- | --- | --- |
| 选容器 / VM / GPU / macOS | 沙箱 | `/docs/sandboxes` |
| 固化环境以便秒级复用 | 快照 | `/docs/snapshots` |
| 跨沙箱共享数据 | 卷 | `/docs/volumes` |
| 指定 us / eu | 区域 | `/docs/regions` |
| 给智能体桌面控制 | 计算机使用 | `/docs/computer-use` |
| 把端口公开给浏览器 | 预览 | `/docs/preview` |
| 让 Claude / Cursor 直接调 | MCP | `/docs/mcp` |
| 对照官网改了什么 | 同步日志 | `/docs/updates` |

## 区域与密钥 {#region-key}

默认区域 `us`，欧洲用 `eu`。密钥优先读环境变量 `DAYTONA_API_KEY`，详见 [认证](/docs/api-keys)。

## 生命周期口诀 {#lifecycle}

创建 → 运行 → 暂停 / 停止 → 归档 → 删除。可设 auto-stop、auto-archive、wall-clock TTL。GPU 与 VM 另有热快照（含内存）。细节见 [沙箱](/docs/sandboxes#sandbox-lifecycle)。
