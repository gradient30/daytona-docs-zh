# 让 Claude 在 Daytona 沙箱桌面上作画 {#let-claude-draw-on-a-daytona-sandbox-desktop}

这篇指南走一遍 [`claude-draws`](https://github.com/daytona/guides/tree/main/python/computer-use/claude-draws) 示例：Daytona 沙箱拉起桌面，一个自包含的 HTML 画板在可见的 Chromium 窗口里打开，再通过 Anthropic SDK 的计算机工具集（`computer_toolset_20260801`）把键盘和鼠标交给 Claude。

这个应用没有为模型做任何特判。没有 DOM 访问，没有无障碍树，也没有写死的点击目标。Claude 截一张图，找到调色板，把它横向滚动，按可见标签点色块，再拖动画线——和人的操作一样。模型工具调用和沙箱之间的桥是 `daytona-claude-toolsets` 包里的 `DaytonaComputer`，它把工具集的每个成员转成对 Daytona [计算机使用 API](/docs/computer-use) 的调用。

---

### 1. 流程概览 {#1-workflow-overview}

```text
Your process                              Daytona sandbox
──────────────                            ───────────────
DaytonaComputer(...)         ──────────▶  create sandbox, start desktop (1280x800)
upload paint.html            ──────────▶  /tmp/claude-draws/paint.html
launch Chromium (--app=...)  ──────────▶  visible window, no tab strip or omnibox
                                   │
client.beta.messages.tool_runner   │
  model ⇄ computer toolset         │
    screenshot  ───────────────────┼───▶  screenshot API
    scroll / click / drag  ────────┼───▶  mouse API
    key / type  ───────────────────┼───▶  keyboard API
                                   ▼
close()                      ──────────▶  sandbox deleted
```

模型循环、你的 API 密钥和工具集都留在你自己的进程里。沙箱只看见输入事件，并交回 PNG。

:::note[用完即弃]
这个例子里的桌面是一次性沙箱：为这次运行创建，`with` 块退出时删除。正因为这样，才可以在没有人盯着键盘时批准模型请求的每一个动作。如果把同一套循环指到你打算留下来的沙箱，这个理由就不成立了。
:::

### 2. 项目准备 {#2-project-setup}

#### 要求 {#requirements}

- 本机 Python 3.10 或更高。
- Daytona 账号和 API 密钥。
- Anthropic API 密钥。

#### 克隆仓库 {#clone-the-repository}

克隆 [Daytona guides 仓库](https://github.com/daytona/guides) 并装好示例：

```bash
git clone https://github.com/daytona/guides.git
cd guides/python/computer-use/claude-draws
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -e .
```

`pip install -e .` 会拉入 `daytona-claude-toolsets`（提供 `DaytonaComputer`）以及足够新的 `anthropic` 发行版，里面才有 `anthropic.tools.computer`。`daytona-claude-toolsets` 又要求 `daytona` SDK 0.223.x——这是第一版在 Python 客户端里暴露鼠标与键盘按住调用的发行版，驱动会走这些调用。

#### 配置 API 密钥 {#configure-api-keys}

```bash
cp .env.example .env
```

填上：

- `DAYTONA_API_KEY`：必填。从 [Daytona 仪表盘](https://app.daytona.io/dashboard/keys) 获取。
- `ANTHROPIC_API_KEY`：必填，给模型循环用。
- `MODEL`：可选，作画循环使用的模型。默认 `claude-sonnet-5-5`。

:::note[`.env` 是 POSIX shell 文件]
模板是一组 `export` 行，没有程序会替你加载，所以运行前要 `source .env`。PowerShell 不能 source 它——在当前会话里设同样的变量。不设 `MODEL` 就用默认值：

```powershell
$env:DAYTONA_API_KEY = "..."
$env:ANTHROPIC_API_KEY = "..."
# $env:MODEL = "..."  # only to pick a different model
```
:::

### 3. 打开画板 {#3-opening-the-sketchpad}

`DaytonaComputer` 是上下文管理器。进入时会创建沙箱、启动桌面、等到显示器报出尺寸，并露出活的 `Sandbox` 对象，方便你在模型看见屏幕之前把画面布置好：

```python
with DaytonaComputer(confirm=confirm, resolution=(WIDTH, HEIGHT)) as computer:
    print(f"sandbox {computer.sandbox.id}, screen {computer.width}x{computer.height}")
    upload_sketchpad(computer.sandbox)
    launch_chromium(computer.sandbox)
```

`paint.html` 用沙箱文件系统 API 上传，再以应用模式（`--app=file://...`）在 Chromium 里打开，窗口里就只有画板——没有标签栏、没有地址栏，也没有首次运行气泡干扰模型。

Chromium 是永不返回的前台 GUI 进程，用 `process.exec` 启动会一直阻塞到浏览器退出。示例改走异步进程会话，再把回环调试端口当作就绪探针：

```python
sandbox.process.create_session(SESSION_ID)
sandbox.process.execute_session_command(
    SESSION_ID, SessionExecuteRequest(command=command, run_async=True)
)
deadline = time.monotonic() + 60
while time.monotonic() < deadline:
    probe = sandbox.process.exec(
        f"curl -s -o /dev/null -w '%{{http_code}}' {CHROME_READY_URL}",
        timeout=5,
    )
    if probe.result.strip() == "200":
        return
    time.sleep(1)
```

### 4. 驱动如何把工具集成员映射到沙箱 {#4-how-the-driver-maps-toolset-members-to-the-sandbox}

Anthropic 的计算机工具集成员由 `DaytonaComputer` 落到 [计算机使用](/docs/computer-use) API。需要按住的成员（按住键、按住鼠标键再拖）走的是第一版在 Python 客户端里暴露的 hold 调用，所以要钉在 `daytona` SDK 0.223.x。

:::note[守护进程版本]
驱动创建的默认快照沙箱带着能应答这些调用的守护进程。示例里探针得到 `400` 表示路由存在。自己钉镜像不一定如此——从 `daytonaio/sandbox:latest` 创建的沙箱曾起来在 daemon 0.217.0，应答 `404`，并拒绝列表里的每一个成员。没有特别理由就用默认快照。
:::

:::tip[键盘成员必须批准]
只要启用了 `type`、`key` 或 `hold_key`，Anthropic SDK 就要求传入 `confirm` 可调用对象。示例会记下成员和参数，然后返回 `True`：

```python
def confirm(context: BetaComputerConfirmContext) -> bool:
    call = json.dumps(context.input.model_dump(exclude_none=True))
    print(f"[confirm] {context.member} {call}")
    return True
```

对用完即弃的桌面，一律批准没问题。沙箱里一旦有你在意的东西，就要把这道门做实。
:::

### 5. 运行示例 {#5-run-the-example}

```bash
source .env
python draw.py
```

每一行输出是循环的一步：

```text
sandbox 7f3c…, screen 1280x800
sketchpad open at file:///tmp/claude-draws/paint.html; handing the desktop to the model
[confirm] screenshot {}
[screenshot] {}
[text] I can see the sketchpad. The palette along the bottom…
[confirm] scroll {"coordinate": [640, 720], "scroll_direction": "right", "scroll_amount": 3}
```

最后一行汇总这次运行的花费，把每一轮助手回合加总：

```text
tokens: 412905 input, 6124 output
```

截图占了输入量的大头：模型在大多数动作之后都会截一张，每张都按图像计费。缓存和服务器工具计数是 API 响应里的独立字段，没有折进这两个数字。

任务提示词是固定的，在 `draw.py` 顶部的 `TASK`：画一幅水面上的日落，橙色太阳、带波浪的青色地平线、玫瑰色云，以及一行标题。运行结束时沙箱会被删除。

:::caution[结果不可复现]
模型驱动的 GUI 运行不是确定性的。同一提示词不会画出同一幅图，模型也可能读错屏幕或完全没点中色块。把这幅画当成循环的演示，而不是可以 diff 的渲染结果。
:::

### 6. 改写这个示例 {#6-adapting-the-example}

**改任务，留下两条约束。** 编辑 `TASK` 去画别的东西，但保留让这次运行成立的两条规则：按可见标签选颜色（`orange`、`teal`、`rose`），不要按位置，因为调色板横向滚动，色块坐标不稳定；并且停在绘制带里，大约距顶部 120 到 620 像素，浮动工具栏和调色板不会挡住点击。

**给模型一个反馈信号。** `paint.html` 在顶部工具栏显示当前选中颜色的名字，模型可以截图确认点击落地后再画。你指过去的任何应用都受益于同一件事：模型能读回来的可见状态，比一次精确点击更值钱。

**驱动一个不是画板的应用。** 循环本身不知道画布。把 `launch_chromium` 换成在沙箱 `DISPLAY=:0` 上启动你的 GUI 的命令，再改提示词。第 4 步的工具集映射不变。

**带上你自己的沙箱。** 把正在运行的 `Sandbox` 传给 `DaytonaComputer(sandbox)`，驱动就只会操作它，不会停止或删除。不传沙箱时，它会创建一个，并在关闭时删除——也可以用 `on_close="stop"` 改成停止。活过这次运行的沙箱不再是用完即弃，所以要把一律 `confirm` 换成真正检查 `context.member` 及其参数再返回 `True` 的实现。你自己建的沙箱还得满足平台下限；驱动用默认快照创建的沙箱已经满足。

**改屏幕尺寸。** `resolution=(width, height)` 设置驱动所创建沙箱的桌面。记住 `TASK` 里的坐标建议是按 1280x800 写的；改了分辨率就要改绘制带。

### 7. 关键优势 {#7-key-advantages}

- **桌面是一次性的。** 每次运行都有一个新沙箱，结束时删除，带鼠标的智能体碰不到比任务活得更久的东西。
- **密钥不离开你的进程。** 模型循环和工具集在本地跑；沙箱只接收输入事件并返回截图。
- **完整工具集都实现了**，包括需要按住输入的成员，不必为每个成员写绕过办法。
- **错误对模型可读。** 屏幕外坐标和不支持的平台能力会以明文消息回来，模型可以据此行动，而不是输入悄悄消失。

> 英文原文：https://www.daytona.io/docs/en/guides/claude/claude-draws-daytona-sandbox
> 本站位置：`/docs/guides/claude/claude-draws-daytona-sandbox`
