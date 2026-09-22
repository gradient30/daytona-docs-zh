# 区域 {#regions}

每台沙箱跑在一个**区域**：地理或逻辑上的计算分组。创建时可指定 `target`，Daytona 在该区域的可用容量上调度。

## 共享区域 {#shared-regions}

所有组织都能用、由 Daytona 运营：

| 区域 | target |
| --- | --- |
| 美国 | `us` |
| 欧洲 | `eu` |

```python
from daytona import Daytona, DaytonaConfig
daytona = Daytona(DaytonaConfig(target="us"))
sandbox = daytona.create()
```

```typescript
import { Daytona } from '@daytona/sdk'
const daytona = new Daytona({ target: 'us' })
const sandbox = await daytona.create()
```

列出共享区域：

```bash
curl 'https://app.daytona.io/api/shared-regions' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

## Earth 区域 {#earth-region}

共享区域上的 [GPU 沙箱](/docs/sandboxes#gpu-sandboxes) 与 GPU 快照属于 **Earth**：覆盖共享 GPU 机群的全局逻辑区域。Daytona 自行选择实际共享区域，**忽略**你填的区域偏好。

Earth **不是**物理区域：不会出现在 regions / shared-regions 接口里，也不能赋给自定义区域。专用区域和自定义区域上的 GPU 仍用真实 region ID。

Earth ID 会出现在：GPU 沙箱的 `target`、GPU 快照的 `regionIds`、用量总览的 `earth` 条目、可用沙箱类型、配额、OTel 指标、相关错误信息。

## 专用区域 {#dedicated-regions}

由 Daytona 运营、只给你的组织用。联系 [sales@daytona.io](mailto:sales@daytona.io)。

## 自定义区域 {#custom-regions}

跑在你提供的机器上，通过 [自带算力 (BYOC)](/docs/bring-your-own-compute) 接入。并发资源没有平台限额，只受你挂上的机器限制。
