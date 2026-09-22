# 沙箱 {#sandboxes}

Daytona 提供完整的可组合计算机——**沙箱**——给 AI 智能体用。沙箱是可编程管理的隔离运行时：独立内核、文件系统、网络栈，以及分配好的 vCPU、内存和磁盘。智能体可以装包、起服务、编译代码、管进程。

默认是 **Linux 容器**。另外还有：

- [Linux VM / Windows VM](#vm-sandboxes)
- [macOS 沙箱](#macos-sandboxes)（Apple silicon）
- [GPU 沙箱](#gpu-sandboxes)（NVIDIA / AMD，推理、微调、加速计算）

| 类型 | 特点 |
| --- | --- |
| 容器 | 默认，<90ms，动态构建，Docker 镜像 |
| Linux VM | 可 Fork、暂停/恢复、内存快照 |
| Windows | 跑 Windows 应用与工具 |
| macOS | Computer Use、VNC、SSH |
| GPU | H100 / H200 / RTX / MI355X |

## 创建沙箱 {#create-sandboxes}

仪表盘：[Sandboxes](https://app.daytona.io/dashboard/sandboxes) → **Create Sandbox**。

```python
from daytona import Daytona
daytona = Daytona()
sandbox = daytona.create()
```

```typescript
import { Daytona } from '@daytona/sdk'
const daytona = new Daytona()
const sandbox = await daytona.create()
```

```bash
daytona create
curl https://app.daytona.io/api/sandbox -X POST \
  -H 'Authorization: Bearer YOUR_API_KEY' -H 'Content-Type: application/json' -d '{}'
```

### 快照 {#snapshots}

从[默认快照](/docs/snapshots#default-snapshots)创建：

| 快照 | vCPU | 内存 | 磁盘 | GPU | 类型 |
| --- | --- | --- | --- | --- | --- |
| `daytona-small` | 1 | 1GiB | 3GiB |  | 容器 |
| `daytona-medium` | 2 | 4GiB | 8GiB |  | 容器 |
| `daytona-large` | 4 | 8GiB | 10GiB |  | 容器 |
| `daytona-gpu` | 1 | 1GiB | 1GiB | 1 | GPU |
| `daytona-vm-small` | 1 | 1GiB | 3GiB |  | Linux VM |
| `windows-small` | 1 | 4GiB | 30GiB |  | Windows |

```python
from daytona import Daytona, CreateSandboxFromSnapshotParams
sandbox = Daytona().create(CreateSandboxFromSnapshotParams(snapshot="daytona-medium"))
```

### 镜像 {#images}

可用公开 / 私有 OCI 镜像，或[声明式构建](/docs/declarative-builder)。

### 资源 {#resources}

创建时可指定 vCPU、内存、磁盘。之后还能[调整大小](#resize-sandboxes)。

### 语言 {#languages}

沙箱默认带 Python / Node。可用快照或声明式镜像换成别的运行时。

### 环境变量 {#environment-variables}

`env_vars` / `envVars` 在创建时注入。密钥请走 [Secrets](/docs/secrets)，不要把明文写进代码。

### 区域 {#regions}

`target="us"` 或 `"eu"`。GPU 在共享区域属于逻辑上的 **Earth** 区域，详见 [区域](/docs/regions)。

## VM 沙箱 {#vm-sandboxes}

Linux VM 与 Windows 跑在独立虚拟机里，支持 Fork、暂停/恢复、热快照（含内存）。适合需要完整操作系统或 Windows 工具链的智能体。

## macOS 沙箱 {#macos-sandboxes}

跑在 Apple silicon 上，适合桌面自动化、Computer Use、VNC。

## GPU 沙箱 {#gpu-sandboxes}

NVIDIA / AMD GPU，用于推理、微调、vLLM / SGLang 等。可配 [Spot GPU](#spot-gpu-sandboxes)。配额见组织用量。

## 临时沙箱 {#ephemeral-sandboxes}

用完即删，不进入持久化路径。适合一次性评测。

## 链接沙箱 {#linked-sandboxes}

子沙箱与父沙箱同机、共享 link 网络，可用名字或 ID 互访。适合 sidecar / 多容器任务。

## 沙箱操作 {#sandbox-operations}

### 列表 / 获取 / 打标签 / 调整大小

`daytona.list()`、`daytona.get(id)`、labels、resize。资源变更按计费规则生效。

## 生命周期 {#sandbox-lifecycle}

**启动 / 暂停 / 恢复 / 停止 / 归档 / 删除 / 恢复（recover） / Fork。**

自动化策略：

- Auto-stop：空闲后停止
- Auto-pause：空闲后暂停（VM 可保留内存）
- Auto-archive：停止后归档
- Auto-delete：到期删除
- Wall-clock TTL：墙上时钟寿命
- 更新 last activity：延长空闲计时
- 无限运行：关掉自动停止（注意费用）

详见官网原文对应小节。本页中文站位置：`/docs/sandboxes`。
