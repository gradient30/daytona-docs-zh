# Computer Use {#computer-use}

TypeScript SDK 参考：计算机使用。

官网这一页已扩到无障碍（AT-SPI）、录屏和显示窗口。调用前要先启动 Computer Use。应用若没有暴露无障碍对象，树可能很稀，此时仍可用鼠标、键盘和截图。

## 无障碍 {#accessibility}

- `getTree`：按 `focused`、`pid` 或 `all` 读取 AT-SPI 树，可限 `maxDepth`。
- `findNodes`：按 role、name、`nameMatch` 找节点。
- `focusNode`：把焦点给到节点 id。
- `invokeNode`：对节点触发动作。
- `setNodeValue`：设置节点值。

## 录屏 {#recording}

- 默认目录 `~/.daytona/recordings`，创建沙箱时可用环境变量 `DAYTONA_RECORDINGS_DIR` 覆盖。
- `start` / `stop` / `list` / `get` / `delete` / `download`。
- 仪表盘可回放会话。

## 键盘按住与显示 {#keyboard-hold-and-display}

- `keyboard.down` / `keyboard.up`：按下并保持、再释放。
- `display.info` / `display.windows`：读显示器信息与窗口列表。

方法签名与代码示例以官网为准。

> 英文原文：https://www.daytona.io/docs/en/typescript-sdk/computer-use
> 本站位置：`/docs/typescript-sdk/computer-use`
