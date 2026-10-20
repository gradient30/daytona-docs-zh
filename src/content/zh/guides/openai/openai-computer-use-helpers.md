# 使用 OpenAI Computer-Use Helpers 与 Daytona 桌面 {#openai-computer-use-helpers}

本指南介绍如何让 OpenAI 模型操作运行在 Daytona 桌面上的浏览器。Daytona 提供桌面环境，OpenAI 的 `ComputerToolset` 辅助工具负责模型的计算机使用循环：它截取屏幕截图，发送给模型，并执行模型请求的操作。该辅助工具随 OpenAI Python SDK [3.31.0](https://github.com/openai/openai-python/releases/tag/v3.31.0) 和 OpenAI Node SDK [7.33.0](https://github.com/openai/openai-node/releases/tag/v7.33.0) 一起发布。工具集本身从不创建或管理沙箱，因此你的应用始终掌控模型实际可以执行哪些操作。

两个 SDK 都在其 “Connect a browser or desktop” 提供商页面中记录了驱动合约：[Python](https://github.com/openai/openai-python/blob/v3.31.0/docs/browser-providers.md) 和 [Node](https://github.com/openai/openai-node/blob/v7.33.0/docs/browser-providers.md)。本指南使用 Python。

---

### 1. 工作流概览 {#workflow-overview}

[示例](https://github.com/daytona/guides/tree/main/python/computer-use/openai-computer-use) 是一个单一脚本。它创建 Daytona 沙箱，启动其桌面，在 Chromium 中打开 Python 文档首页，并将一个故意受限的驱动连接到 OpenAI 的原生 `computer` 工具。模型可以截取屏幕截图并恰好执行一次普通左键点击，而且只有在你回答 `y/N` 同意提示之后。脚本随后打印模型的回答（应为打开页面的标题），并删除沙箱：

```bash
$ python main.py
Allow screenshots and one click? [y/N] y
The Python Tutorial
Deleted sandbox 05f343d2-e007-469e-8887-d221bf2f2737
```

使其工作的组成部分：

- **桌面（Daytona）**：启动了 [计算机使用](/docs/computer-use) 的沙箱，提供屏幕截图并接受鼠标输入。
- **驱动（你的应用）**：一个小类，实现 OpenAI 驱动方法并决定每个方法允许做什么。
- **工具集（OpenAI）**：`ComputerToolset`，针对模型运行截图-行动循环。

### 2. 项目设置 {#project-setup}

#### 克隆仓库

```bash
git clone https://github.com/daytona/guides.git
cd guides/python/computer-use/openai-computer-use
```

#### 配置环境

示例读取三个环境变量：

- **`OPENAI_API_KEY`**：你的 OpenAI 密钥，来自 [OpenAI 开发者平台](https://platform.openai.com/api-keys)。
- **`OPENAI_MODEL`**：驱动桌面的模型。它必须支持原生 `computer` 工具。
- **`DAYTONA_API_KEY`**：你的 Daytona 密钥，来自 [Daytona 仪表盘](https://app.daytona.io/dashboard/keys)。

将 `.env.example` 复制为 `.env` 并添加你的密钥：

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-6-astra
DAYTONA_API_KEY=your_daytona_key
```

每次运行都会计费 OpenAI 模型使用量和 Daytona 沙箱运行时。

#### 安装并运行

```bash
pip install "openai==3.31.0" "daytona==0.224.1" python-dotenv
python main.py
```

### 3. 理解集成 {#understanding-the-integration}

#### 创建桌面

脚本从默认快照创建沙箱（已包含计算机使用包），然后启动桌面进程。`start()` 在桌面可用之前就返回，因此脚本轮询 `get_status()` 直到状态报告 `active`，然后才打开浏览器。Chromium 在 `DISPLAY=:0` 上以后台方式启动，输出重定向，因此调用立即返回，脚本等待页面加载：

```python
daytona = Daytona()
sandbox = None
toolset = None
try:
    sandbox = daytona.create(
        CreateSandboxFromSnapshotParams(
            auto_stop_interval=20,
            auto_delete_interval=60,
        ),
        timeout=REQUEST_TIMEOUT,
    )
    sandbox.computer_use.start(request_timeout=REQUEST_TIMEOUT)

    deadline = time.monotonic() + 60
    while True:
        status = sandbox.computer_use.get_status(
            request_timeout=REQUEST_TIMEOUT
        ).status
        if status == "active":
            break
        if time.monotonic() > deadline:
            raise RuntimeError(
                "Computer use did not become active in time "
                f"(last status: {status})."
            )
        time.sleep(2)

    sandbox.process.exec(
        f"DISPLAY=:0 nohup chromium --no-sandbox --disable-dev-shm-usage "
        f"{START_URL} >/tmp/cu-browser.log 2>&1 </dev/null &",
        timeout=REQUEST_TIMEOUT,
    )
    time.sleep(10)
```

`auto_stop_interval=20` 和 `auto_delete_interval=60` 以分钟为单位限制沙箱的生命周期，以防脚本在清理前被中断。

#### 连接桌面

`DaytonaDriver` 实现了 `ComputerToolset` 所需的九个方法。其中只有两个真正做事：`screenshot` 返回工具集期望的 `computer_screenshot` 形状的 base64 PNG，`click` 允许在显示边界内进行一次普通左键点击。所有其他操作名称都被别名为 `unsupported`，它会抛出异常：

```python
class DaytonaDriver:
    def __init__(self, computer, display):
        self.computer = computer
        self.display = display
        self.clicked = False

    def screenshot(self):
        image = self.computer.screenshot.take_full_screen(
            show_cursor=False,
            request_timeout=REQUEST_TIMEOUT,
        )
        if not image.screenshot:
            raise RuntimeError("Daytona returned no screenshot.")
        return {
            "type": "computer_screenshot",
            "image_url": f"data:image/png;base64,{image.screenshot}",
        }

    def click(self, action):
        # 限制模型仅执行本示例所需的单次点击。
        if self.clicked or action.button != "left" or action.keys:
            raise RuntimeError("Only one plain left click is allowed.")
        inside_x = 0 <= action.x < self.display.width
        inside_y = 0 <= action.y < self.display.height
        if not inside_x or not inside_y:
            raise RuntimeError("Click is outside the display.")
        self.clicked = True
        self.computer.mouse.click(
            action.x,
            action.y,
            button="left",
            request_timeout=REQUEST_TIMEOUT,
        )
```

（其余驱动方法如 `move`、`scroll`、`type` 等均委托给 `unsupported`，以确保模型不能执行未授权的操作。）

### 4. 运行循环

脚本将驱动和显示信息交给 `ComputerToolset`，然后调用模型。模型会请求屏幕截图，可能请求一次点击，然后给出最终回答。

完整示例见仓库中的 `main.py`。

### 5. 清理

无论成功与否，脚本都会删除沙箱，避免产生费用。

---

更多计算机使用细节见 [计算机使用](/docs/computer-use)。
