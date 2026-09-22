# Python SDK {#python-sdk}

`pip install daytona`，同步与异步客户端。

Daytona Python SDK 用来以编程方式操作沙箱。同时提供同步 `Daytona` 和异步 `AsyncDaytona`。

## 安装 {#installation}

```bash
pip install daytona
```

或 poetry：

```bash
poetry add daytona
```

## 入门 {#getting-started}

### 创建沙箱 {#create-a-sandbox}

```python
from daytona import Daytona

def main():
    daytona = Daytona()
    sandbox = daytona.create()
    response = sandbox.process.exec("echo 'Hello, World!'")
    print(response.result)

if __name__ == "__main__":
    main()
```

异步：

```python
import asyncio
from daytona import AsyncDaytona

async def main():
    async with AsyncDaytona() as daytona:
        sandbox = await daytona.create()
        response = await sandbox.process.exec("echo 'Hello, World!'")
        print(response.result)

if __name__ == "__main__":
    asyncio.run(main())
```

## 配置 {#configuration}

```python
from daytona import Daytona, DaytonaConfig

daytona = Daytona()

config = DaytonaConfig(
    api_key="YOUR_API_KEY",
    api_url="https://app.daytona.io/api",
    target="us",
)
daytona = Daytona(config)
```

环境变量：`DAYTONA_API_KEY`、`DAYTONA_API_URL`、`DAYTONA_TARGET`。详见[认证](/docs/api-keys)。

## 实时状态更新 {#real-time-state-updates}

与 TypeScript SDK 相同：默认 WebSocket 推送沙箱状态，连不上就自动回退轮询。详见 [TypeScript SDK · 实时状态](/docs/typescript-sdk#real-time-state-updates)。

## 参考 {#reference}

- 同步：[Daytona](/docs/python-sdk/sync/daytona)、[Sandbox](/docs/python-sdk/sync/sandbox)、[File System](/docs/python-sdk/sync/file-system)、[Git](/docs/python-sdk/sync/git)、[Process](/docs/python-sdk/sync/process)、[Snapshot](/docs/python-sdk/sync/snapshot)、[Volume](/docs/python-sdk/sync/volume)
- 异步：对应 `python-sdk/async/...` 各页
- 公共：[Charts](/docs/python-sdk/common/charts)、[Errors](/docs/python-sdk/common/errors)、[Image](/docs/python-sdk/common/image)

> 英文原文：https://www.daytona.io/docs/en/python-sdk
> 本站位置：`/docs/python-sdk`
