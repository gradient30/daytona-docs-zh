# MCP 服务器 {#mcp}

让 Claude / Cursor / Windsurf 操作 Daytona。

Daytona 的 Model Context Protocol（MCP）服务器让 AI 智能体以编程方式操作 [沙箱](/docs/sandboxes)。本页说明怎么接到各类智能体。

## 安装 Daytona CLI {#install-daytona-cli}

```bash
brew install daytonaio/cli/daytona
```

```bash
powershell -Command "irm https://get.daytona.io/windows | iex"
```

## 登录 Daytona {#authenticate-with-daytona}

```bash
daytona login
```

## 初始化 MCP 服务器 {#initialize-mcp-server}

用你常用的 AI 智能体初始化。支持 Claude、Cursor、Windsurf。

```bash
daytona mcp init claude
daytona mcp init cursor
daytona mcp init windsurf
```

初始化后打开对应应用即可使用 Daytona。

## 配置 MCP 服务器 {#configure-mcp-server}

给其他智能体生成 JSON 配置：

```bash
daytona mcp config
```

```json
{
  "mcpServers": {
    "daytona-mcp": {
      "command": "daytona",
      "args": ["mcp", "start"],
      "env": {
        "HOME": "${HOME}",
        "PATH": "${HOME}:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin"
      },
      "logFile": "${HOME}/Library/Logs/daytona/daytona-mcp-server.log"
    }
  }
}
```

> Windows 用户请在 `env` 里再加 `"APPDATA": "${APPDATA}"`。

## 启动 MCP 服务器 {#start-mcp-server}

```bash
daytona mcp start
```

## 可用工具 {#available-tools}

MCP 服务器提供这些能力：

- [沙箱管理](/docs/sandboxes)
- [文件系统](/docs/file-system-operations)
- [Git](/docs/git-operations)
- [进程与代码执行](/docs/process-code-execution)
- [计算机使用](/docs/computer-use)
- [预览](/docs/preview)

> 英文原文：https://www.daytona.io/docs/en/mcp
> 本站位置：`/docs/mcp`
