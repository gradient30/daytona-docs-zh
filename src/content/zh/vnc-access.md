# VNC 访问 {#vnc-access}

图形桌面与 Computer Use。

VNC（虚拟网络计算）在浏览器里直接提供 Daytona 沙箱的图形桌面，用来操作沙箱内的 GUI 应用、桌面工具和可视化界面。

VNC 与 [Computer Use](/docs/computer-use) 配合，同时支持人工和自动桌面操作。VNC 给人看、给人点；Computer Use 给智能体鼠标、键盘和截图 API。通过 VNC 可以实时看到智能体在自动操作。

> VNC 和 Computer Use 需要从默认快照创建的沙箱。自定义镜像或自定义快照（含自定义 [Linux VM 快照](/docs/snapshots#vm-snapshots)）默认不含 VNC，除非装上[所需软件包](#required-packages)。

## 从仪表盘打开 VNC {#access-vnc-from-dashboard}

从 [Daytona 仪表盘 ↗](https://app.daytona.io/dashboard/sandboxes) 直接打开 VNC 桌面。

1. 打开 [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. 找到要用 VNC 进入的沙箱
3. 点沙箱旁的选项菜单（**⋮**）
4. 在下拉菜单里选 VNC

浏览器会打开带 **Connect** 按钮的 VNC 查看器。

5. 点 Connect 建立会话

连上后，浏览器里加载完整桌面，可以用鼠标和键盘操作沙箱图形界面。

> 只要沙箱在跑，VNC 会话就保持。若因空闲自动停止，需要先再启动沙箱才能重连。

创建沙箱时用环境变量 [`VNC_RESOLUTION`](/docs/computer-use#configure-desktop-resolution) 设定桌面分辨率。运行中的沙箱不能改分辨率。

## 用程序管理 VNC {#programmatic-vnc-management}

可以用 [Computer Use](/docs/computer-use) 以编程方式[启动](#start-vnc)、[停止](#stop-vnc)和[查看](#get-vnc-status) VNC 进程，放进自动化流程。

### 启动 VNC {#start-vnc}

启动沙箱里全部 VNC 进程（Xvfb、xfce4、x11vnc、novnc），才能打开桌面。

```python
result = sandbox.computer_use.start()
print("VNC processes started:", result.message)
```

```typescript
const result = await sandbox.computerUse.start();
console.log('VNC processes started:', result.message);
```

```ruby
result = sandbox.computer_use.start
puts "VNC processes started: #{result.message}"
```

```go
err := sandbox.ComputerUse.Start(ctx)
if err != nil {
	log.Fatal(err)
}
defer sandbox.ComputerUse.Stop(ctx)

fmt.Println("VNC processes started")
```

```java
var result = sandbox.computerUse.start();
System.out.println("VNC processes started: " + result.getMessage());
```

```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/computeruse/start' \
  --request POST
```

### 停止 VNC {#stop-vnc}

停止沙箱里全部 VNC 进程。

```python
result = sandbox.computer_use.stop()
print("VNC processes stopped:", result.message)
```

```typescript
const result = await sandbox.computerUse.stop();
console.log('VNC processes stopped:', result.message);
```

```ruby
result = sandbox.computer_use.stop
puts "VNC processes stopped: #{result.message}"
```

```go
err := sandbox.ComputerUse.Stop(ctx)
if err != nil {
	log.Fatal(err)
}

fmt.Println("VNC processes stopped")
```

```java
var result = sandbox.computerUse.stop();
System.out.println("VNC processes stopped: " + result.getMessage());
```

```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/computeruse/stop' \
  --request POST
```

### 获取 VNC 状态 {#get-vnc-status}

查看 VNC 进程状态，确认它们在跑。

```python
response = sandbox.computer_use.get_status()
print("VNC status:", response.status)
```

```typescript
const status = await sandbox.computerUse.getStatus();
console.log('VNC status:', status.status);
```

```ruby
response = sandbox.computer_use.status
puts "VNC status: #{response.status}"
```

```go
status, err := sandbox.ComputerUse.GetStatus(ctx)
if err != nil {
	log.Fatal(err)
}

fmt.Printf("VNC status: %v\n", status["status"])
```

```java
var response = sandbox.computerUse.getStatus();
System.out.println("VNC status: " + response.getStatus());
```

```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/computeruse/status'
```

重启单个进程、看日志等更多操作见 [Computer Use](/docs/computer-use)。

## 自动化桌面交互 {#automating-desktop-interactions}

VNC 跑起来之后，可以用 Computer Use 自动化桌面。智能体能在 VNC 会话里程序化控制鼠标、键盘并截图。

**可用操作：**

- **鼠标**：点击、移动、拖拽、滚动、读取光标位置
- **键盘**：输入文本、按键、组合热键
- **截图**：全屏、区域或压缩图
- **显示**：读取显示信息、列出打开的窗口

完整说明见 [Computer Use](/docs/computer-use)。

> **示例**：自动操作浏览器

```python
# Start VNC processes
sandbox.computer_use.start()

# Click to open browser
sandbox.computer_use.mouse.click(50, 50)

# Type a URL
sandbox.computer_use.keyboard.type("https://www.daytona.io/docs/")
sandbox.computer_use.keyboard.press("enter")

# Take a screenshot
screenshot = sandbox.computer_use.screenshot.take_full_screen()
```

```typescript
// Start VNC processes
await sandbox.computerUse.start();

// Click to open browser
await sandbox.computerUse.mouse.click(50, 50);

// Type a URL
await sandbox.computerUse.keyboard.type('https://www.daytona.io/docs/');
await sandbox.computerUse.keyboard.press('enter');

// Take a screenshot
const screenshot = await sandbox.computerUse.screenshot.takeFullScreen();
```

```java
// Start VNC processes
sandbox.computerUse.start();

// Click to open browser
sandbox.computerUse.click(50, 50);

// Type a URL
sandbox.computerUse.typeText("https://www.daytona.io/docs/");
sandbox.computerUse.pressKey("enter");

// Take a screenshot
var screenshot = sandbox.computerUse.takeScreenshot();
```

## 所需软件包 {#required-packages}

默认快照（含默认 Linux VM 快照）已经带齐 VNC 和 Computer Use 所需软件包。自定义镜像或自定义快照需要自己安装下面这些包。缺包时启动 VNC 会报错，并列出没起来的进程。

Linux VM 快照不支持 Dockerfile 构建。把包装进推到仓库的镜像，或在正在运行的 Linux VM 沙箱里安装后[从沙箱创建快照](/docs/snapshots#create-snapshot-from-sandbox)。

### VNC 与桌面环境 {#vnc-and-desktop-environment}

| Package | Description |
| -------------------- | ------------------------------------------ |
| **`xvfb`** | 无头显示用的 X 虚拟帧缓冲 |
| **`xfce4`** | 桌面环境 |
| **`xfce4-terminal`** | 终端模拟器 |
| **`x11vnc`** | VNC 服务 |
| **`novnc`** | 基于 Web 的 VNC 客户端 |
| **`dbus-x11`** | D-Bus 会话支持 |

### X11 库 {#x11-libraries}

| Library | Description |
| ----------------- | ------------------------------------------- |
| **`libx11-6`** | X11 客户端库 |
| **`libxrandr2`** | X11 RandR 扩展（显示配置） |
| **`libxext6`** | X11 扩展库 |
| **`libxrender1`** | X11 渲染扩展 |
| **`libxfixes3`** | X11 fixes 扩展 |
| **`libxss1`** | X11 屏保扩展 |
| **`libxtst6`** | X11 测试扩展（输入模拟） |
| **`libxi6`** | X11 输入扩展 |

> 英文原文：https://www.daytona.io/docs/en/vnc-access
> 本站位置：`/docs/vnc-access`
