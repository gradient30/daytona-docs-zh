# Playground {#playground}

浏览器里创建沙箱、跑 SDK、开终端和 VNC。

Daytona provides an interactive environment ("Playground") for creating sandboxes, running SDK operations, and exploring Daytona features directly from your browser.

- **Interactive sandbox creation**: configure and create sandboxes with custom resources
- **Code snippet generation**: automatically generate SDK code samples based on the values configured in the [management](#management) section
- [Web terminal](/docs/web-terminal): run commands directly in your sandbox through a built-in web terminal
- [VNC access](/docs/vnc-access): interact with GUI applications using [Computer Use](/docs/computer-use) features

## 从仪表盘进入 {#access-from-dashboard}

Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/playground) to access the playground.

Playground consists of three tabs: [Sandbox](#sandbox), [Terminal](#terminal), and [VNC](#vnc). All three tabs operate on the same active sandbox.

## 沙箱 {#sandbox}

The sandbox tab provides an interactive interface to configure sandboxes and perform SDK operations. The left panel contains configurable parameters organized into collapsible sections. The right panel displays auto-generated code snippets that you can inspect, copy, and run.

### 管理 {#management}

The management section contains the parameters used to configure a sandbox. You can edit these parameters to customize your sandbox and its resources.

- [sandbox language](/docs/sandboxes#multiple-runtime-support): select a programming language runtime for the sandbox
- [sandbox resources](/docs/sandboxes#resources): configure resources allocated to the sandbox
- [sandbox lifecycle](/docs/sandboxes#sandbox-lifecycle): set the sandbox lifecycle policies

> In the management section, sandboxes are only created when you explicitly click **Run**, replacing any existing playground sandbox. In the [Terminal](#terminal) or [VNC](#vnc) tabs, if there are no active sandboxes, the playground automatically creates one using the configured parameters.

### 文件系统 {#file-system}

The file system section provides operations to manage files and directories in the sandbox. You can modify files and directories in the sandbox using the following operations:

- **Create a new directory**: set the directory location and its permissions
- **List files and directories**: set the directory location
- **Delete files**: set the file location and delete directory checkbox

For more information, see [file system operations](/docs/file-system-operations).

### Git 操作 {#git-operations}

The Git operations section provides operations to manage Git repositories in the sandbox. You can clone, get repository status, and list branches using the following operations:

- **Clone a Git repository**: set the repository URL, destination, branch, commit ID, and credentials
- **Get repository status**: retrieve the repository status
- **List branches**: retrieve the list of branches in the repository

For more information, see [Git operations](/docs/git-operations).

### 进程与代码执行 {#process-and-code-execution}

The process and code execution section provides operations to run code snippets and shell commands directly in the sandbox. Shell commands are fixed, while code snippets change automatically based on the selected [sandbox language](/docs/sandboxes#multiple-runtime-support) parameter.

For more information, see [process and code execution](/docs/process-code-execution).

## 终端 {#terminal}

The terminal tab provides a web-based terminal connected to the sandbox. This gives you direct command-line access to the sandbox environment for running commands, viewing files, and debugging.

The terminal runs on port `22222` and remains active as long as the sandbox is running. If the sandbox stops due to inactivity, start it again to restore terminal access.

> Terminal access is restricted to authenticated members of your [organization](/docs/organizations).

For more information, see [web terminal](/docs/web-terminal).

## VNC {#vnc}

The VNC tab provides graphical desktop access to the sandbox, enabling you to interact with GUI applications and test [Computer Use](/docs/computer-use) features. The left panel contains interaction controls organized into sections. The right panel displays the desktop view.

For more information, see [VNC access](/docs/vnc-access).

### 显示 {#display}

The display section provides options to inspect the sandbox desktop environment.

- **Get display information**: retrieve information about the available displays
- **List open windows**: retrieve a list of currently open windows

For more information, see [display operations](/docs/computer-use#display-operations).

### 键盘 {#keyboard}

The keyboard section provides options to send keyboard input to the sandbox.

- **Press a hotkey combination**: send a hotkey combination to the sandbox
- **Press a key**: press a key with optional modifiers
- **Type text**: type text into the active window

For more information, see [keyboard operations](/docs/computer-use#keyboard-operations).

### 鼠标 {#mouse}

The mouse section provides options to control mouse input in the sandbox.

- **Click**: click at a specified position
- **Drag**: drag from one position to another
- **Move**: move the cursor to a specified position
- **Get cursor position**: retrieve the current cursor position

For more information, see [mouse operations](/docs/computer-use#mouse-operations).

### 截图 {#screenshot}

The screenshot section provides options to capture screenshots of the sandbox desktop.

- **Take a screenshot**: select format, scale, and quality, show cursor, and capture the entire screen or specific regions

For more information, see [screenshot operations](/docs/computer-use#screenshot-operations).

> 英文原文：https://www.daytona.io/docs/en/playground
> 本站位置：`/docs/playground`
