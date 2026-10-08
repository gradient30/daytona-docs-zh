# Computer Use {#computer-use}

Python SDK（同步）参考：计算机使用。

官网这一页已扩到无障碍（AT-SPI）、录屏和显示窗口。调用前要先启动 Computer Use。

## 无障碍 {#accessibility}

- `get_tree`：按 `focused`、`pid` 或 `all` 读取 AT-SPI 树。
- `find_nodes`：按 role、name、`name_match` 找节点。
- `focus_node` / `invoke_node` / 设置节点值。

## 录屏 {#recording}

- 默认目录 `~/.daytona/recordings`，可用 `DAYTONA_RECORDINGS_DIR` 覆盖。
- `start` / `stop` / `list` / `get` / `delete` / `download`。

## 键盘按住与显示 {#keyboard-hold-and-display}

- 同步客户端从 SDK 0.223.x 起暴露鼠标与键盘 hold 调用。
- `display` 读显示器信息与窗口列表。

> 英文原文：https://www.daytona.io/docs/en/python-sdk/sync/computer-use
> 本站位置：`/docs/python-sdk/sync/computer-use`
