# Computer Use {#computer-use}

Java SDK 参考：计算机使用。

官网这一页已扩到无障碍（AT-SPI）、录屏和显示窗口。调用前要先启动 Computer Use。应用若没有暴露无障碍对象，树可能很稀，此时仍可用鼠标、键盘和截图。

## 无障碍 {#accessibility}

- `getTree` / `get_tree`：按 `focused`、`pid` 或 `all` 读取 AT-SPI 树，可限 `maxDepth`。
- `findNodes` / `find_nodes`：按 role、name、`nameMatch` 找节点。
- `focusNode`：把焦点给到节点 id。
- `invokeNode`：对节点触发动作。
- `setNodeValue`：设置节点值。

## 录屏 {#recording}

- 默认目录 `~/.daytona/recordings`，创建沙箱时可用环境变量 `DAYTONA_RECORDINGS_DIR` 覆盖。
- `start` / `stop` / `list` / `get` / `delete` / `download`。
- 仪表盘可回放会话，便于调试 GUI 自动化。

## 键盘按住与显示 {#keyboard-hold-and-display}

- `keyboard.down` / `keyboard.up`：按下并保持、再释放，供热键和拖拽类工具集成员使用。Python 客户端从 SDK 0.223.x 起暴露这些 hold 调用。
- `display.info` / `display.windows`：读显示器信息与窗口列表。

方法签名、参数名与代码示例以官网为准，本页保持标识符不译。

> 英文原文：https://www.daytona.io/docs/en/java-sdk/computer-use
> 本站位置：`/docs/java-sdk/computer-use`
