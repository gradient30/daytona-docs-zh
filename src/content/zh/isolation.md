# 隔离 {#isolation}

Daytona 沙箱默认隔离。一台沙箱里的代码读不到另一台的文件系统或内存，也不和别的沙箱共享网络；凭证和 API 访问范围仅限自己的组织。

隔离落在三条边界上：

| 边界 | 隔开什么 | 机制 |
| --- | --- | --- |
| 运行时 | 每台沙箱的进程、文件系统、内存、设备 | [沙箱类型](/docs/sandboxes) · [预留资源](/docs/sandboxes#resources) |
| 网络 | 进入（入站）和离开（出站）每台沙箱的流量 | [网络限额](/docs/network-limits) · [预览鉴权](/docs/preview) · [链接网络](/docs/sandboxes#linked-sandboxes) |
| 组织 | 对沙箱、数据和凭证的访问 | [组织](/docs/organizations) · [API 密钥权限](/docs/api-keys#permissions--scopes) · [密钥](/docs/secrets) |

## 运行时隔离 {#runtime-isolation}

运行时隔离把一台沙箱内部跑的东西，与它所在的 runner、以及所有其他沙箱隔开。每台沙箱是独立实例：自己的进程、网络、文件系统挂载和 IPC。细节见[架构](/docs/architecture#sandbox-runners)。

资源也是运行时边界的一部分。每台沙箱预留自己的 **vCPU、内存、磁盘**，硬限制，再怎么跑也不会吃掉别人的配额。不同类型提供的边界不一样：

| 沙箱类型 | 运行时边界 |
| --- | --- |
| 容器 | 独立命名空间 + 强制资源限额。沙箱内以 root 跑代码，不影响 runner |
| VM（Linux VM / Windows） | 带独立内核的完整虚拟机。硬件虚拟化边界才有：[暂停/恢复](/docs/sandboxes#pause--resume-sandboxes)、[Fork](/docs/sandboxes#fork-sandboxes)、[热快照](/docs/snapshots#create-snapshot-from-sandbox) |
| GPU | 独立容器 + 独占 GPU。分配到的 GPU 同一时刻只属于一台沙箱 |

沙箱内部可通过 `cgroup` 看到资源上限。`nproc`、`free` 读的是宿主机值，不能反映沙箱自己的限额：

```bash
cat /sys/fs/cgroup/cpu.max      # "<quota> <period>"（核数 = quota / period）
cat /sys/fs/cgroup/memory.max   # 字节
df -h /                         # 磁盘
```

## 网络隔离 {#network-isolation}

网络隔离按方向单独控制。出站和入站按沙箱配置；沙箱之间默认不通，除非显式链接。

| 方向 | 默认 | 控制 |
| --- | --- | --- |
| 沙箱 → 互联网 | Tier 3 及以上开放；Tier 1 / 2 受限 | [网络限额](/docs/network-limits)：全阻断、CIDR 允许列表、域名允许列表，或[出站代理](/docs/network-limits#outbound-proxy) |
| 互联网 → 沙箱 | 需认证的预览 URL 和 SSH | [预览令牌与签名 URL](/docs/preview)、[SSH 令牌](/docs/ssh-access)；`public` 标志可让预览免认证 |
| 沙箱 → 沙箱 | 不共享网络 | [链接沙箱](/docs/sandboxes#linked-sandboxes)把父子沙箱加入同一 link 网络 |

**出站**流量经过每台沙箱自己的防火墙。[按套餐的限制](/docs/network-limits#tier-based-network-restrictions)自动生效；还可以在三种互斥设置里再收紧：全阻断、只允许 CIDR、只允许域名。默认套餐策略下，包仓库等[必要服务](/docs/network-limits#essential-services)在所有套餐都可达。Tier 3 / 4 上若沙箱级允许列表或全阻断，必要服务也不会绕过。

```python
from daytona import CreateSandboxFromSnapshotParams, Daytona

daytona = Daytona()

sandbox = daytona.create(CreateSandboxFromSnapshotParams(
    network_block_all=True,
))

sandbox = daytona.create(CreateSandboxFromSnapshotParams(
    domain_allow_list="example.com,*.daytona.io",
))
```

```typescript
import { Daytona } from '@daytona/sdk'

const daytona = new Daytona()

const blocked = await daytona.create({ networkBlockAll: true })
const allowed = await daytona.create({ domainAllowList: 'example.com,*.daytona.io' })
```

## 组织隔离 {#organization-isolation}

每台沙箱、每个快照、每个卷都属于一个[组织](/docs/organizations)。API 密钥、角色和密钥的范围都停在组织边界：一个组织的凭证打不开另一个组织的资源。

> 英文原文：https://www.daytona.io/docs/en/isolation
> 本站位置：`/docs/isolation`
