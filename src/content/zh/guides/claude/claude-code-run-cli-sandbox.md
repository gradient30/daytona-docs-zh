# 用 CLI 在沙箱跑 Claude Code {#claude-code-run-cli-sandbox}

安装 CLI、创建沙箱、SSH 后启动 claude。

This guide walks you through running Claude Code inside a Daytona sandbox using the Daytona CLI.

### 前置条件 {#prerequisites}

- Daytona account and API key (Get it from [Daytona Dashboard](https://app.daytona.io/dashboard/keys))
- Local terminal (macOS, Linux, or Windows)

### 安装 Daytona CLI {#install-the-daytona-cli}

    ```bash 
    brew install daytonaio/cli/daytona
    ```
    ```bash
    powershell -Command "irm https://get.daytona.io/windows | iex" 
    ```

> Already have the CLI? Check your version with `daytona --version`. If it's below **0.135.0**, [upgrade to the latest version](/docs/tools/cli).

### 登录 Daytona {#authenticate-with-daytona}

Log in to your Daytona account using your API key:

```bash
daytona login --api-key=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your actual Daytona API key.

### 创建沙箱 {#create-a-sandbox}

Create a new sandbox for running Claude Code:

```bash
daytona sandbox create --name claude-sandbox
```

This creates a sandbox named `claude-sandbox`, visible in your [Dashboard](https://app.daytona.io/dashboard/sandboxes). The default Daytona snapshot includes Claude Code, so the command above is all you need.

tip
Need more power? Pass `--snapshot daytona-large` or `--snapshot daytona-medium` flag to increase your sandbox resources. See [default snapshots](/docs/snapshots#default-snapshots) for resource details.

### 连接到沙箱 {#connect-to-the-sandbox}

SSH into your sandbox:

```bash
daytona ssh claude-sandbox
```

You now have an interactive terminal session inside the sandbox.

### 运行 Claude Code {#run-claude-code}

Inside the SSH session, start Claude Code:

```bash
claude
```

On first run, Claude Code will prompt you to authenticate:

1. Copy the authentication URL displayed in the terminal
2. Open the URL in your local browser
3. Complete the authentication flow
4. Copy the code provided by the browser
5. Paste the code back into the terminal

Once authenticated, you're all set. Claude Code runs inside the sandbox while you control it from your terminal.

> 英文原文：https://www.daytona.io/docs/en/guides/claude/claude-code-run-cli-sandbox
> 本站位置：`/docs/guides/claude/claude-code-run-cli-sandbox`
