# 快照 {#snapshots}

快照是沙箱状态的持久捕获，用来快速创建新沙箱。容器快照基于 OCI 镜像；VM 快照可以是冷（仅文件系统）或热（文件系统 + 内存）。

## 默认快照 {#default-snapshots}

见 [沙箱](/docs/sandboxes#snapshots) 表格：`daytona-small/medium/large`、`daytona-gpu`、`daytona-vm-*`、`windows-*`。

## 创建快照 {#create-snapshots}

从 Dockerfile、镜像仓库或[声明式构建](/docs/declarative-builder)创建。构建由控制平面的 snapshot builder 调度到 runner，结果推进内部 OCI registry。

## VM 快照 {#vm-snapshots}

冷快照：沙箱先停。热快照：运行中捕获内存，恢复后进程还在。

## GPU 快照 {#gpu-snapshots}

带 GPU 驱动与 CUDA/ROCm 环境。共享区域上的 GPU 快照 `regionIds` 为 `earth`。

## 从沙箱做快照 {#create-snapshot-from-sandbox}

```python
# 冷快照（先停沙箱，只保留文件系统）
snapshot = sandbox.snapshot()
# 热快照（运行中，含内存）
snapshot = sandbox.snapshot(hot=True)
```

## 私有仓库与本地镜像 {#private-and-local}

支持 Docker Hub、GHCR、GAR、任意 OCI 仓库；本地镜像可 push 进 Daytona。

## 获取 / 列表 / 激活 / 停用 / 删除 {#crud}

快照有生命周期：构建中 → 激活 → 停用 → 删除。停用后不能再用来创建沙箱，但数据还在，直到删除。

## 在沙箱里跑 Docker {#run-docker-in-a-sandbox}

可用 DinD 快照，在沙箱内 `docker compose up`。适合评测需要容器的任务。

## 在沙箱里跑 Kubernetes {#run-kubernetes-in-a-sandbox}

沙箱内可以运行完整的 Kubernetes 集群。Kubernetes 完全跑在沙箱里，沙箱删除时一并移除，环境安全且可复现。

1. 创建沙箱
2. 在沙箱内安装并启动 k3s 集群

```python
from daytona import Daytona, SessionExecuteRequest
import time

daytona = Daytona()
sandbox = daytona.create()

# 运行 k3s 安装脚本
response = sandbox.process.exec('curl -sfL https://get.k3s.io | sh -')

# 启动 k3s
session_name = 'k3s-server'
sandbox.process.create_session(session_name)
sandbox.process.execute_session_command(
    session_name,
    SessionExecuteRequest(
        command='sudo /usr/local/bin/k3s server',
        run_async=True,
    ),
)

# 等待 k3s 完全启动
time.sleep(30)

# 查看所有 Pod
pods = sandbox.process.exec('sudo /usr/local/bin/kubectl get pod -A')
print(pods.result)
```

TypeScript、Ruby 等其他语言示例见[英文原文](https://www.daytona.io/docs/en/snapshots#run-kubernetes-in-a-sandbox)。
