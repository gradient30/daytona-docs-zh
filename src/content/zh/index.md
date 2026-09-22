# Daytona 文档 {#daytona-documentation}

Daytona 是一套**安全、弹性**的基础设施，专门用来运行 AI 生成的代码。

它提供完整的可组合计算机——[沙箱](/docs/sandboxes)——每一台都有独立内核、文件系统、网络栈，以及分配好的 vCPU、内存和磁盘。沙箱默认在 **90ms** 内从代码到可执行，兼容 OCI / Docker，支持大规模并行和持久化，适合智能体、强化学习和长时间任务。

开发者与智能体通过 SDK、API、CLI 管理沙箱生命周期、文件系统、进程执行和运行时配置。有状态的环境[快照](/docs/snapshots)让智能体可以跨会话继续工作。

## 开始 {#get-started}

1. 创建账号 → [app.daytona.io](https://app.daytona.io)
2. 获取 API 密钥 → [app.daytona.io/dashboard/keys](https://app.daytona.io/dashboard/keys)

### Python

```bash
pip install daytona
```

```python
from daytona import Daytona, DaytonaConfig

config = DaytonaConfig(api_key="YOUR_API_KEY")
daytona = Daytona(config)
sandbox = daytona.create()
response = sandbox.process.code_run('print("Hello World")')
print(response.result)
```

### TypeScript

```bash
npm install @daytona/sdk
```

```typescript
import { Daytona } from '@daytona/sdk'

const daytona = new Daytona({ apiKey: 'YOUR_API_KEY' })
const sandbox = await daytona.create()
const response = await sandbox.process.codeRun('print("Hello World")')
console.log(response.result)
```

### CLI

```shell
daytona create --name hello
daytona exec hello -- python3 -c 'print("Hello World")'
```

也提供 [Ruby](/docs/ruby-sdk)、[Go](/docs/go-sdk)、[Java](/docs/java-sdk) SDK，以及 [REST API](/docs/tools/api)。

## 下一步 {#next-steps}

| 章节 | 说明 | 本站位置 |
| --- | --- | --- |
| [沙箱](/docs/sandboxes) | 隔离运行时，可编程管理 | `/docs/sandboxes` |
| [快照](/docs/snapshots) | 持久捕获沙箱状态 | `/docs/snapshots` |
| [卷](/docs/volumes) | 跨沙箱共享文件 | `/docs/volumes` |
| [区域](/docs/regions) | 沙箱所在地理位置 | `/docs/regions` |

## 参考 {#reference}

- SDK：[TypeScript](/docs/typescript-sdk)、[Python](/docs/python-sdk)、[Ruby](/docs/ruby-sdk)、[Go](/docs/go-sdk)、[Java](/docs/java-sdk)
- API：[Platform](/docs/tools/api#daytona)、[Toolbox](/docs/tools/api#daytona-toolbox)、[Analytics](/docs/tools/api#daytona-analytics)
- [CLI](/docs/tools/cli) · [MCP](/docs/mcp) · [Agent Skills](/docs/agent-skills)
- 官网给 LLM 的索引：[llms.txt](https://www.daytona.io/docs/llms.txt) · [sitemap](https://www.daytona.io/docs/sitemap-0.xml)
- 任意页面可加 `.md` 后缀拿到 Markdown，例如 [sandboxes.md](https://www.daytona.io/docs/en/sandboxes.md)

> 本站是非官方中文译本。命令、产品名、代码块与官网路径对齐。顶栏「同步」记录官网每次改动以及中文站位置。
