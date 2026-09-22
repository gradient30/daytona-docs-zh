#!/usr/bin/env python3
"""Generate remaining Chinese handbook pages from official Daytona markdown + catalog."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path("/workspace")
ZH = ROOT / "src/content/zh"
OFF = Path("/tmp/daytona-md")
CAT = ROOT / "src/lib/docs/catalog.ts"

SKIP = {
    "index",
    "quick-guide",
    "updates",
    "architecture-site",
    "sitemap",
    "sandboxes",
    "snapshots",
    "volumes",
    "regions",
}

H1 = {
    "Architecture": "架构",
    "Isolation": "隔离",
    "Persistence": "持久化",
    "Scale": "扩展",
    "Authentication": "认证",
    "Organizations": "组织",
    "Billing": "计费",
    "Limits": "限额",
    "Troubleshooting": "故障排查",
    "Playground": "Playground",
    "File System Operations": "文件系统操作",
    "Git Operations": "Git 操作",
    "Process and Code Execution": "进程与代码执行",
    "Pseudo Terminal (PTY)": "伪终端（PTY）",
    "Language Server Protocol": "语言服务器协议",
    "Computer Use": "计算机使用",
    "Declarative Builder": "声明式构建",
    "Log Streaming": "日志流",
    "Preview": "预览",
    "Custom Preview Proxy": "自定义预览代理",
    "Web Terminal": "Web 终端",
    "VNC Access": "VNC 访问",
    "SSH Access": "SSH 访问",
    "Daytona MCP Server": "Daytona MCP 服务器",
    "Agent Skills": "Agent Skills",
    "Warm Pools": "温池",
    "Mount External Storage": "挂载外部存储",
    "Secrets": "密钥",
    "Organization SSO": "组织 SSO",
    "Linked Accounts": "关联账号",
    "Audit Logs": "审计日志",
    "Webhooks": "Webhooks",
    "OpenTelemetry Collection": "OpenTelemetry 采集",
    "Network Limits (Firewall)": "网络限额（防火墙）",
    "VPN Connections": "VPN 连接",
    "Bring Your Own Compute (BYOC)": "自带算力（BYOC）",
    "CLI": "CLI",
    "Daytona API Reference": "Daytona API 参考",
    "TypeScript SDK Reference": "TypeScript SDK 参考",
    "Python SDK Reference": "Python SDK 参考",
    "Go SDK Reference": "Go SDK 参考",
    "Java SDK Reference": "Java SDK 参考",
    "Ruby SDK Reference": "Ruby SDK 参考",
    "Guides": "指南总览",
    "Claude Guides": "Claude 指南",
    "OpenAI Guides": "OpenAI 指南",
    "Cursor Guides": "Cursor 指南",
    "Devin Guides": "Devin 指南",
    "OpenCode Guides": "OpenCode 指南",
    "OpenClaw Guides": "OpenClaw 指南",
    "RLM Guides": "RLM 指南",
}

HEAD = {
    "Get started": "开始",
    "Next steps": "下一步",
    "Reference": "参考",
    "Installation": "安装",
    "Getting Started": "入门",
    "Create a Sandbox": "创建沙箱",
    "Configuration": "配置",
    "Real-time state updates": "实时状态更新",
    "Polling fallback": "轮询回退",
    "Opt out of event streaming": "退出事件流",
    "Multiple runtime support": "多运行时支持",
    "Async Python SDK": "异步 Python SDK",
    "Interface plane": "接口平面",
    "Control plane": "控制平面",
    "Compute plane": "计算平面",
    "Container registry": "容器镜像仓库",
    "Sandbox runners": "沙箱 Runner",
    "Sandbox daemon": "沙箱守护进程",
    "Snapshot store": "快照仓库",
    "Volumes": "卷",
    "API": "API",
    "Proxy": "代理",
    "Snapshot builder": "快照构建器",
    "Sandbox manager": "沙箱管理器",
    "Runtime isolation": "运行时隔离",
    "Network isolation": "网络隔离",
    "Organization isolation": "组织隔离",
    "Filesystem persistence": "文件系统持久化",
    "Memory persistence": "内存持久化",
    "Sandbox scaling": "沙箱扩展",
    "Fleet scaling": "机群扩展",
    "Workload concurrency": "工作负载并发",
    "Create an API key": "创建 API 密钥",
    "Using environment variables": "使用环境变量",
    "Using explicit configuration": "使用显式配置",
    "JWT tokens": "JWT 令牌",
    "Permissions & Scopes": "权限与范围",
    "List API keys": "列出 API 密钥",
    "Get current API key": "获取当前 API 密钥",
    "Get API key": "获取 API 密钥",
    "Personal vs Collaborative": "个人与协作组织",
    "Create organization": "创建组织",
    "List organizations": "列出组织",
    "Get by ID": "按 ID 获取",
    "Leave organization": "离开组织",
    "Delete organization": "删除组织",
    "Roles": "角色",
    "Role assignments": "角色分配",
    "Create role": "创建角色",
    "List roles": "列出角色",
    "Update role": "更新角色",
    "Sandbox billing": "沙箱计费",
    "Wallet": "钱包",
    "Redeem coupon": "兑换优惠券",
    "Balances": "余额",
    "Billing information": "账单信息",
    "Payment method": "支付方式",
    "Automatic top-up": "自动充值",
    "One time top-up": "一次性充值",
    "Invoices": "发票",
    "Charges": "扣费",
    "Spending": "支出",
    "Sandbox lifecycle": "沙箱生命周期",
    "Create and start": "创建与启动",
    "Provisioning": "供给",
    "Account": "账号",
    "Organization": "组织",
    "Membership": "成员",
    "Runtime and access": "运行时与访问",
    "State": "状态",
    "Access": "访问",
    "Access from Dashboard": "从仪表盘进入",
    "Sandbox": "沙箱",
    "Management": "管理",
    "File system": "文件系统",
    "Git operations": "Git 操作",
    "Process and code execution": "进程与代码执行",
    "Terminal": "终端",
    "VNC": "VNC",
    "Display": "显示",
    "Keyboard": "键盘",
    "Mouse": "鼠标",
    "Basic operations": "基本操作",
    "Advanced operations": "高级操作",
    "List files and directories": "列出文件与目录",
    "Get directory or file information": "获取文件或目录信息",
    "Clone repositories": "克隆仓库",
    "Code execution": "代码执行",
    "Run code (stateless)": "跑代码（无状态）",
    "Run code (stateful)": "跑代码（有状态）",
    "Create PTY session": "创建 PTY 会话",
    "Connect to PTY session": "连接 PTY 会话",
    "List PTY sessions": "列出 PTY 会话",
    "Get PTY session info": "获取 PTY 会话信息",
    "Start Computer Use": "启动计算机使用",
    "Stop Computer Use": "停止计算机使用",
    "Get status": "获取状态",
    "Mouse operations": "鼠标操作",
    "Keyboard operations": "键盘操作",
    "Screenshots": "截图",
    "Build declarative images": "构建声明式镜像",
    "Create pre-built snapshots": "创建预构建快照",
    "Authentication": "认证",
    "Standard preview URL": "标准预览 URL",
    "Signed preview URL": "签名预览 URL",
    "Warning page": "警告页",
    "How it works": "工作原理",
    "WebSocket support": "WebSocket 支持",
    "Reserved ports": "保留端口",
    "Proxy headers": "代理头",
    "Disable preview warning": "关闭预览警告",
    "Disable CORS": "关闭 CORS",
    "Disable last activity update": "关闭最近活动更新",
    "Preserve X-Forwarded-Host": "保留 X-Forwarded-Host",
    "Examples": "示例",
    "Access via CLI": "通过 CLI 访问",
    "Access via URL": "通过 URL 访问",
    "Access via token": "通过令牌访问",
    "Security": "安全",
    "Access VNC from Dashboard": "从仪表盘打开 VNC",
    "Programmatic VNC management": "用程序管理 VNC",
    "Start VNC": "启动 VNC",
    "Stop VNC": "停止 VNC",
    "Get VNC status": "获取 VNC 状态",
    "Automating desktop interactions": "自动化桌面交互",
    "Required packages": "所需软件包",
    "Connect with VS Code": "用 VS Code 连接",
    "Connect with JetBrains IDEs": "用 JetBrains IDE 连接",
    "Token management": "令牌管理",
    "Expiration": "过期",
    "Revoke token": "吊销令牌",
    "Install Daytona CLI": "安装 Daytona CLI",
    "Authenticate with Daytona": "登录 Daytona",
    "Initialize MCP server": "初始化 MCP 服务器",
    "Configure MCP server": "配置 MCP 服务器",
    "Skills": "技能",
    "Claude Code (Plugin)": "Claude Code（插件）",
    "Manual": "手动",
    "Usage": "用法",
    "Structure": "结构",
    "Replenishment": "补货",
    "Limits": "限额",
    "Create a warm pool": "创建温池",
    "List warm pools": "列出温池",
    "Resize a warm pool": "调整温池大小",
    "Delete a warm pool": "删除温池",
    "List warm sandboxes": "列出温池沙箱",
    "How secrets work": "密钥如何工作",
    "Substitution scope": "替换范围",
    "Response scrubbing": "响应脱敏",
    "Host allowlist": "主机允许列表",
    "Create a secret": "创建密钥",
    "Use a secret in a sandbox": "在沙箱里使用密钥",
    "Verify substitution": "验证替换",
    "Update secrets in a sandbox": "更新沙箱密钥",
    "List secrets": "列出密钥",
    "Configure SSO in the Admin Portal": "在管理门户配置 SSO",
    "Configure SCIM directory sync": "配置 SCIM 目录同步",
    "Configure an identity provider": "配置身份提供商",
    "Configuration options": "配置选项",
    "Google Workspace": "Google Workspace",
    "Microsoft Entra ID": "Microsoft Entra ID",
    "Okta": "Okta",
    "Auth0": "Auth0",
    "Keycloak": "Keycloak",
    "OneLogin": "OneLogin",
    "Custom OIDC": "自定义 OIDC",
    "Real-time updates": "实时更新",
    "Log structure": "日志结构",
    "Get all audit logs": "获取全部审计日志",
    "Get audit logs for organization": "获取组织审计日志",
    "Get audit scenarios": "获取审计场景",
    "Outcomes": "结果",
    "Accessing webhooks": "访问 Webhooks",
    "Endpoints": "端点",
    "Messages": "消息",
    "Create webhook endpoints": "创建 Webhook 端点",
    "Edit webhook endpoints": "编辑 Webhook 端点",
    "Delete webhook endpoints": "删除 Webhook 端点",
    "Webhook events": "Webhook 事件",
    "Sandbox events": "沙箱事件",
    "Snapshot events": "快照事件",
    "Volume events": "卷事件",
    "Webhook payload format": "Webhook 载荷格式",
    "Configure sandbox collection": "配置沙箱采集",
    "Collected data": "采集的数据",
    "Resource labels": "资源标签",
    "Custom resource labels": "自定义资源标签",
    "Service name": "服务名",
    "Organization metrics": "组织指标",
    "Tier-based network restrictions": "按套餐的网络限制",
    "Create sandboxes with network restrictions": "创建带网络限制的沙箱",
    "Tailscale": "Tailscale",
    "Tailscale browser login": "Tailscale 浏览器登录",
    "Tailscale auth key": "Tailscale 授权密钥",
    "OpenVPN": "OpenVPN",
    "Netbird": "Netbird",
    "Custom regions": "自定义区域",
    "Create a custom region": "创建自定义区域",
    "List custom regions": "列出自定义区域",
    "Get a custom region": "获取自定义区域",
    "Update a custom region": "更新自定义区域",
    "Delete a custom region": "删除自定义区域",
    "Deployment": "部署",
    "Helm charts": "Helm charts",
    "daytona": "daytona",
    "Prerequisites": "前置条件",
    "Workflow Overview": "工作流总览",
    "1. Workflow Overview": "1. 工作流总览",
    "2. Project Setup": "2. 项目准备",
    "3. Example Usage": "3. 示例用法",
    "3. Understanding the Core Components": "3. 理解核心组件",
    "3. Understanding the Script": "3. 理解脚本",
    "4. Understanding the Script": "4. 理解脚本",
    "4. Implementation": "4. 实现",
    "4. Example Usage": "4. 示例用法",
    "5. Running the Example": "5. 运行示例",
    "5. Complete Code": "5. 完整代码",
    "5. Run the Example": "5. 运行示例",
    "6. Complete Code": "6. 完整代码",
    "7. API Reference": "7. API 参考",
    "Further reading": "延伸阅读",
    "Set up": "配置",
    "Introduction": "介绍",
    "How the pieces fit together": "各部分如何拼起来",
    "What you set up": "你要准备什么",
    "What you get": "你会得到什么",
    "See also": "另见",
    "Features": "特性",
    "Features:": "特性：",
    "Cleanup": "清理",
    "Customization": "自定义",
    "Shared regions": "共享区域",
    "Earth region": "Earth 区域",
    "Dedicated regions": "专属区域",
}

PHRASES = [
    ("Daytona sandboxes are isolated by default.", "Daytona 沙箱默认隔离。"),
    ("The Daytona TypeScript SDK provides a powerful interface for programmatically interacting with Daytona Sandboxes.", "Daytona TypeScript SDK 用来以编程方式操作 Daytona 沙箱。"),
    ("The Daytona Python SDK provides a powerful interface for programmatically interacting with Daytona Sandboxes.", "Daytona Python SDK 用来以编程方式操作 Daytona 沙箱。"),
    ("Install the Daytona TypeScript SDK using npm:", "用 npm 安装 TypeScript SDK："),
    ("Install the Daytona Python SDK using pip:", "用 pip 安装 Python SDK："),
    ("Or using yarn:", "或用 yarn："),
    ("Create a Daytona Sandbox to run your code securely in an isolated environment.", "创建一台 Daytona 沙箱，在隔离环境里安全跑代码。"),
    ("The Daytona SDK can be configured using environment variables or by passing options to the constructor:", "可用环境变量或构造函数参数配置 SDK："),
    ("For more information on configuring the Daytona SDK, see", "SDK 配置详见"),
    ("Starting with SDK version", "从 SDK 版本"),
    ("If the WebSocket connection cannot be established", "如果无法建立 WebSocket 连接"),
    ("In polling-only mode the SDK never opens a WebSocket connection.", "纯轮询模式下 SDK 不会打开 WebSocket。"),
    ("Install the Daytona CLI to manage the MCP server.", "安装 Daytona CLI 以管理 MCP 服务器。"),
    ("Authenticate with Daytona to enable MCP server access.", "登录 Daytona，才能使用 MCP 服务器。"),
    ("Initialize the MCP server with your preferred AI agent. Supported agents include Claude, Cursor, and Windsurf.", "用你常用的 AI 智能体初始化 MCP。支持 Claude、Cursor、Windsurf。"),
    ("After initialization, open your AI agent application to begin using Daytona features.", "初始化后打开智能体应用即可使用 Daytona。"),
    ("Generate MCP configuration for integration with other AI agents.", "生成 MCP 配置，以便接入其他智能体。"),
    ("This command outputs a JSON configuration that you can copy into your agent's settings:", "该命令输出 JSON 配置，可复制到智能体设置里："),
    ("Daytona platform is organized into multiple plane components, each serving a specific purpose:", "Daytona 平台分成多个平面，各司其职："),
    ("The interface plane provides client interfaces for users and agents to interact with Daytona.", "接口平面提供用户和智能体访问 Daytona 的客户端。"),
    ("The control plane is the central coordination layer of the Daytona platform.", "控制平面是 Daytona 的中枢协调层。"),
    ("The compute plane is the infrastructure layer where sandboxes run.", "计算平面是沙箱实际运行的基础设施层。"),
    ("Access from the Dashboard:", "从仪表盘进入："),
    ("This guide covers how to set up and use the MCP server with various AI agents.", "本页说明如何把 MCP 接到各类 AI 智能体。"),
]


def parse_catalog() -> list[tuple[str, str, str, str]]:
    text = CAT.read_text()
    return re.findall(
        r'\{ slug: "([^"]+)", title: "([^"]+)", description: "([^"]+)", href: "([^"]+)" \}',
        text,
    )


def official_file(slug: str) -> Path | None:
    if slug == "index":
        p = OFF / "en.md"
        return p if p.exists() else None
    name = "en_" + slug.replace("/", "_") + ".md"
    p = OFF / name
    return p if p.exists() else None


def rewrite_links(s: str) -> str:
    s = re.sub(r"https://www\.daytona\.io/docs/en/([^\s)]+?)\.md", r"/docs/\1", s)
    s = re.sub(r"https://www\.daytona\.io/docs/en/([^\s)#]+)", r"/docs/\1", s)
    s = s.replace("https://www.daytona.io/docs/en.md", "/")
    s = s.replace("](/docs/en/", "](/docs/")
    return s


def clean_html(s: str) -> str:
    s = re.sub(r"</?u>", "", s)
    s = re.sub(r"<br\s*/?>", " ", s)
    s = re.sub(r"<[A-Z][A-Za-z0-9]+[^>]*/>", "", s)
    s = re.sub(r"</?[A-Za-z][^>]*>", "", s)
    return s


def strip_mintlify(s: str) -> str:
    s = re.sub(r":::caution[^\n]*\n", "> ", s)
    s = re.sub(r":::note[^\n]*\n", "> ", s)
    s = re.sub(r":::warning[^\n]*\n", "> ", s)
    s = s.replace(":::", "")
    return s


def slugify_en(s: str) -> str:
    s = re.sub(r"[^A-Za-z0-9\u4e00-\u9fff]+", "-", s.lower()).strip("-")
    return s[:80] or "section"


def translate_heading(text: str) -> str:
    t = text.strip()
    if t in H1:
        return H1[t]
    if t in HEAD:
        return HEAD[t]
    # numbered guide steps
    m = re.match(r"^(\d+)\.\s+(.+)$", t)
    if m and m.group(2) in HEAD:
        return f"{m.group(1)}. {HEAD[m.group(2)]}"
    t2 = t
    for a, b in [
        ("Workflow Overview", "工作流总览"),
        ("Project Setup", "项目准备"),
        ("Example Usage", "示例用法"),
        ("Complete Code", "完整代码"),
        ("Complete Implementation", "完整实现"),
        ("API Reference", "API 参考"),
        ("Further reading", "延伸阅读"),
        ("Getting Started", "入门"),
        ("Create a Sandbox", "创建沙箱"),
        ("Configuration", "配置"),
        ("Installation", "安装"),
        ("Authentication", "认证"),
        ("Prerequisites", "前置条件"),
        ("Usage", "用法"),
        ("Security", "安全"),
        ("Limits", "限额"),
        ("Snapshots", "快照"),
        ("Volumes", "卷"),
        ("Regions", "区域"),
        ("Resources", "资源"),
        ("Languages", "语言"),
        ("Environment variables", "环境变量"),
        ("Error handling", "错误处理"),
        ("Clean up", "清理"),
        ("Customization", "自定义"),
        ("Introduction", "介绍"),
        ("Set up", "配置"),
        ("How it works", "工作原理"),
        ("Access from Dashboard", "从仪表盘进入"),
        ("Access via CLI", "通过 CLI 访问"),
        ("Access via URL", "通过 URL 访问"),
        ("Access via token", "通过令牌访问"),
        ("Basic operations", "基本操作"),
        ("Advanced operations", "高级操作"),
        ("Mouse operations", "鼠标操作"),
        ("Keyboard operations", "键盘操作"),
        ("Sandbox lifecycle", "沙箱生命周期"),
        ("Create sandboxes", "创建沙箱"),
        ("List sandboxes", "列出沙箱"),
        ("Delete sandbox", "删除沙箱"),
        ("Start Computer Use", "启动计算机使用"),
        ("Stop Computer Use", "停止计算机使用"),
        ("Get status", "获取状态"),
        ("Required packages", "所需软件包"),
        ("Token management", "令牌管理"),
        ("Expiration", "过期"),
        ("Revoke token", "吊销令牌"),
        ("Shared regions", "共享区域"),
        ("Dedicated regions", "专属区域"),
        ("Custom regions", "自定义区域"),
        ("Default snapshots", "默认快照"),
        ("Create snapshots", "创建快照"),
        ("Create volumes", "创建卷"),
        ("Mount volumes", "挂载卷"),
        ("Work with volumes", "使用卷"),
        ("Code execution", "代码执行"),
        ("Git operations", "Git 操作"),
        ("File system", "文件系统"),
        ("Process and code execution", "进程与代码执行"),
        ("Webhook events", "Webhook 事件"),
        ("Sandbox events", "沙箱事件"),
        ("Snapshot events", "快照事件"),
        ("Volume events", "卷事件"),
        ("Organization metrics", "组织指标"),
        ("Collected data", "采集的数据"),
        ("Resource labels", "资源标签"),
        ("Service name", "服务名"),
        ("Create an API key", "创建 API 密钥"),
        ("Permissions & Scopes", "权限与范围"),
        ("JWT tokens", "JWT 令牌"),
        ("Using environment variables", "使用环境变量"),
        ("Using explicit configuration", "使用显式配置"),
        ("Real-time state updates", "实时状态更新"),
        ("Polling fallback", "轮询回退"),
        ("Opt out of event streaming", "退出事件流"),
        ("Multiple runtime support", "多运行时支持"),
        ("Async Python SDK", "异步 Python SDK"),
        ("Reference", "参考"),
        ("Deployment", "部署"),
        ("Helm charts", "Helm charts"),
        ("OpenVPN", "OpenVPN"),
        ("Netbird", "Netbird"),
        ("Tailscale", "Tailscale"),
        ("Create a secret", "创建密钥"),
        ("List secrets", "列出密钥"),
        ("Host allowlist", "主机允许列表"),
        ("Response scrubbing", "响应脱敏"),
        ("Substitution scope", "替换范围"),
        ("How secrets work", "密钥如何工作"),
        ("Standard preview URL", "标准预览 URL"),
        ("Signed preview URL", "签名预览 URL"),
        ("Warning page", "警告页"),
        ("WebSocket support", "WebSocket 支持"),
        ("Reserved ports", "保留端口"),
        ("Proxy headers", "代理头"),
        ("Examples", "示例"),
        ("Features", "特性"),
        ("Cleanup", "清理"),
        ("See also", "另见"),
        ("What you get", "你会得到什么"),
        ("What you set up", "你要准备什么"),
        ("Running the orchestrator", "运行编排器"),
        ("Running applications", "运行应用"),
        ("Controller settings", "控制器设置"),
        ("Network and credentials", "网络与凭证"),
        ("Conclusion", "小结"),
        ("Cursor Cloud Agents", "Cursor Cloud Agents"),
        ("Devin sessions", "Devin 会话"),
        ("Three pieces", "三部分"),
        ("Run the controller", "运行控制器"),
        ("Run the orchestrator", "运行编排器"),
        ("Game Features:", "游戏特性："),
        ("Play Now:", "现在玩："),
        ("Live Preview:", "实时预览："),
        ("Created Files", "生成的文件"),
        ("Sample Diff Output", "示例 Diff"),
        ("Test Results", "测试结果"),
        ("Key Advantages", "主要优势"),
        ("Dataset Preparation", "数据集准备"),
        ("Building the AI Data Analyst", "构建 AI 数据分析师"),
        ("Running Your Analysis", "运行分析"),
        ("Complete Implementation", "完整实现"),
        ("Download Dataset", "下载数据集"),
        ("Initialize the Language Model", "初始化语言模型"),
        ("Define the Result Handler", "定义结果处理"),
        ("Configure the Daytona Plugin", "配置 Daytona 插件"),
        ("Create the Agent", "创建智能体"),
        ("Create the App and Runner", "创建 App 与 Runner"),
        ("Running the Example", "运行示例"),
        ("Understanding the Architecture", "理解架构"),
        ("Understanding the Agent Architecture", "理解智能体架构"),
        ("Understanding the Agent's Architecture", "理解智能体架构"),
        ("Understanding the Agent's Execution Flow", "理解智能体执行流"),
        ("Understanding the Core Components", "理解核心组件"),
        ("Example Walkthrough", "示例走查"),
        ("Querying the Endpoint", "查询端点"),
        ("Configuration Options", "配置选项"),
        ("Project Setup", "项目准备"),
        ("Workflow Overview", "工作流总览"),
        ("Install the Daytona CLI", "安装 Daytona CLI"),
        ("Create a Sandbox", "创建沙箱"),
        ("Connect to the Sandbox", "连接到沙箱"),
        ("Run Claude Code", "运行 Claude Code"),
        ("Create SSH access token", "创建 SSH 访问令牌"),
        ("Fork sandbox", "Fork 沙箱"),
        ("Disable auto-pause", "关闭自动暂停"),
        ("Disable auto-deletion", "关闭自动删除"),
        ("Block all outbound traffic", "阻断全部出站流量"),
        ("Allow access to specific domains", "只允许特定域名"),
        ("Allow access to specific IP addresses", "只允许特定 IP"),
        ("Or block all network access", "或阻断全部网络"),
        ("Or allow specific domains only", "或只允许特定域名"),
        ("Or allow specific CIDR ranges only", "或只允许特定 CIDR"),
        ("Click", "点击"),
        ("Type", "输入"),
        ("Screenshot", "截图"),
        ("Scroll", "滚动"),
        ("Hotkeys", "快捷键"),
        ("Copy", "复制"),
        ("Paste", "粘贴"),
        ("Single left click", "单击左键"),
        ("Double click", "双击"),
        ("Right click", "右键"),
        ("Scroll up", "向上滚动"),
        ("Scroll down", "向下滚动"),
        ("Press Enter", "按 Enter"),
        ("Press Ctrl+C", "按 Ctrl+C"),
        ("With cursor visible", "显示光标"),
        ("Default compression", "默认压缩"),
        ("High quality JPEG", "高质量 JPEG"),
        ("Stop the recording", "停止录制"),
        ("Handle output", "处理输出"),
        ("List all PTY sessions", "列出全部 PTY 会话"),
        ("Send a command", "发送命令"),
        ("Send user input", "发送用户输入"),
        ("Resize terminal", "调整终端大小"),
        ("Exit the session", "退出会话"),
        ("Start a long-running process", "启动长时间进程"),
        ("Run Python code", "跑 Python 代码"),
        ("Shared default context", "共享默认上下文"),
        ("Isolated context", "隔离上下文"),
        ("Error handling", "错误处理"),
        ("Clean up", "清理"),
        ("Get file metadata", "获取文件元数据"),
        ("Delete a file", "删除文件"),
        ("Rename a file", "重命名文件"),
        ("Delete a directory recursively", "递归删除目录"),
        ("List branches", "列出分支"),
        ("Add a remote", "添加远程"),
        ("Get repository status", "获取仓库状态"),
        ("Clone repositories", "克隆仓库"),
        ("Basic clone", "基本克隆"),
        ("Clone with authentication", "带认证克隆"),
        ("Clone specific branch", "克隆指定分支"),
        ("Execute any shell command", "执行任意 shell 命令"),
        ("Setting a working directory and a timeout", "设置工作目录与超时"),
        ("Passing environment variables", "传入环境变量"),
        ("Detach all secrets", "分离全部密钥"),
        ("Historical resource metrics (CPU, memory, disk)", "历史资源指标（CPU、内存、磁盘）"),
        ("Logs", "日志"),
        ("Traces", "追踪"),
        ("Metrics", "指标"),
        ("Tier-based network restrictions", "按套餐的网络限制"),
        ("Essential services", "必要服务"),
        ("Outbound proxy", "出站代理"),
        ("Preview authentication", "预览鉴权"),
        ("Linked sandboxes", "链接沙箱"),
        ("Sandbox to internet", "沙箱到互联网"),
        ("Internet to sandbox", "互联网到沙箱"),
        ("Sandbox to sandbox", "沙箱到沙箱"),
        ("Runtime isolation", "运行时隔离"),
        ("Network isolation", "网络隔离"),
        ("Organization isolation", "组织隔离"),
        ("Filesystem persistence", "文件系统持久化"),
        ("Memory persistence", "内存持久化"),
        ("Sandbox scaling", "沙箱扩展"),
        ("Fleet scaling", "机群扩展"),
        ("Workload concurrency", "工作负载并发"),
        ("Create organization", "创建组织"),
        ("List organizations", "列出组织"),
        ("Leave organization", "离开组织"),
        ("Delete organization", "删除组织"),
        ("Roles", "角色"),
        ("Role assignments", "角色分配"),
        ("Create role", "创建角色"),
        ("List roles", "列出角色"),
        ("Update role", "更新角色"),
        ("Sandbox billing", "沙箱计费"),
        ("Wallet", "钱包"),
        ("Redeem coupon", "兑换优惠券"),
        ("Balances", "余额"),
        ("Billing information", "账单信息"),
        ("Payment method", "支付方式"),
        ("Automatic top-up", "自动充值"),
        ("One time top-up", "一次性充值"),
        ("Invoices", "发票"),
        ("Charges", "扣费"),
        ("Spending", "支出"),
        ("Create and start", "创建与启动"),
        ("Provisioning", "供给"),
        ("Account", "账号"),
        ("Membership", "成员"),
        ("Runtime and access", "运行时与访问"),
        ("Management", "管理"),
        ("Display", "显示"),
        ("Keyboard", "键盘"),
        ("Mouse", "鼠标"),
        ("Terminal", "终端"),
        ("Start VNC", "启动 VNC"),
        ("Stop VNC", "停止 VNC"),
        ("Get VNC status", "获取 VNC 状态"),
        ("Automating desktop interactions", "自动化桌面交互"),
        ("Connect with VS Code", "用 VS Code 连接"),
        ("Connect with JetBrains IDEs", "用 JetBrains IDE 连接"),
        ("Skills", "技能"),
        ("Manual", "手动"),
        ("Structure", "结构"),
        ("Replenishment", "补货"),
        ("Create a warm pool", "创建温池"),
        ("List warm pools", "列出温池"),
        ("Resize a warm pool", "调整温池大小"),
        ("Delete a warm pool", "删除温池"),
        ("List warm sandboxes", "列出温池沙箱"),
        ("Use a secret in a sandbox", "在沙箱里使用密钥"),
        ("Verify substitution", "验证替换"),
        ("Update secrets in a sandbox", "更新沙箱密钥"),
        ("Configure SSO in the Admin Portal", "在管理门户配置 SSO"),
        ("Configure SCIM directory sync", "配置 SCIM 目录同步"),
        ("Configure an identity provider", "配置身份提供商"),
        ("Custom OIDC", "自定义 OIDC"),
        ("Real-time updates", "实时更新"),
        ("Log structure", "日志结构"),
        ("Get all audit logs", "获取全部审计日志"),
        ("Get audit logs for organization", "获取组织审计日志"),
        ("Get audit scenarios", "获取审计场景"),
        ("Outcomes", "结果"),
        ("Accessing webhooks", "访问 Webhooks"),
        ("Endpoints", "端点"),
        ("Messages", "消息"),
        ("Create webhook endpoints", "创建 Webhook 端点"),
        ("Edit webhook endpoints", "编辑 Webhook 端点"),
        ("Delete webhook endpoints", "删除 Webhook 端点"),
        ("Webhook payload format", "Webhook 载荷格式"),
        ("Configure sandbox collection", "配置沙箱采集"),
        ("Custom resource labels", "自定义资源标签"),
        ("Create sandboxes with network restrictions", "创建带网络限制的沙箱"),
        ("Tailscale browser login", "Tailscale 浏览器登录"),
        ("Tailscale auth key", "Tailscale 授权密钥"),
        ("Create a custom region", "创建自定义区域"),
        ("List custom regions", "列出自定义区域"),
        ("Get a custom region", "获取自定义区域"),
        ("Update a custom region", "更新自定义区域"),
        ("Delete a custom region", "删除自定义区域"),
        ("Interface plane", "接口平面"),
        ("Control plane", "控制平面"),
        ("Compute plane", "计算平面"),
        ("Container registry", "容器镜像仓库"),
        ("Sandbox runners", "沙箱 Runner"),
        ("Sandbox daemon", "沙箱守护进程"),
        ("Snapshot store", "快照仓库"),
        ("Snapshot builder", "快照构建器"),
        ("Sandbox manager", "沙箱管理器"),
        ("Daytona API", "Daytona API"),
        ("Toolbox API", "Toolbox API"),
        ("Analytics", "Analytics"),
        ("config", "config"),
        ("api-keys", "api-keys"),
        ("organizations", "organizations"),
        ("users", "users"),
        ("regions", "regions"),
        ("sandbox", "sandbox"),
        ("runners", "runners"),
        ("snapshots", "snapshots"),
        ("preview", "preview"),
        ("volumes", "volumes"),
        ("Build an AI Data Analyst with Daytona", "用 Daytona 构建 AI 数据分析师"),
        ("Analyze Data with AI", "用 AI 做数据分析"),
        ("Analyze Data With LangChain AI Agent", "用 LangChain AI 智能体分析数据"),
        ("Running Claude Code with Daytona", "在 Daytona 上跑 Claude Code"),
        ("Running Claude Code in a Daytona Sandbox", "在 Daytona 沙箱里跑 Claude Code"),
        ("Run Claude Code in a Daytona Sandbox via CLI", "用 CLI 在沙箱跑 Claude Code"),
        ("Run Claude Managed Agents on Daytona", "在 Daytona 上跑 Claude 托管智能体"),
        ("Run Cursor Self-Hosted Machines on Daytona", "在 Daytona 上跑 Cursor 自托管机器"),
        ("Run the Devin CLI in a Daytona Sandbox", "在 Daytona 沙箱里跑 Devin CLI"),
        ("Run Devin Outposts on Daytona", "在 Daytona 上跑 Devin Outposts"),
        ("Fix Bugs Automatically With AG2 and Daytona", "用 AG2 与 Daytona 自动修 bug"),
        ("Build Coding Agent Using AgentKit and Daytona", "用 AgentKit 与 Daytona 构建编程智能体"),
        ("Build a Coding Agent Using Amp Code and Daytona", "用 Amp Code 与 Daytona 构建编程智能体"),
        ("Run Agents on Daytona with Brainbase's Universal Harness API", "用 Brainbase Universal Harness API 在 Daytona 上跑智能体"),
        ("Build a Two-Agent Coding System with Claude and Daytona", "用 Claude 与 Daytona 构建双智能体编程系统"),
        ("Build a Coding Agent Using Claude Agent SDK and Daytona", "用 Claude Agent SDK 与 Daytona 构建编程智能体"),
        ("Build a Generative-UI Coding Agent with CopilotKit and Daytona", "用 CopilotKit 与 Daytona 构建生成式 UI 编程智能体"),
        ("Build an Autonomous Bug-Fix Agent with Flue and Daytona", "用 Flue 与 Daytona 构建自主修 bug 智能体"),
        ("Run Gemini CLI Headlessly in Daytona and Stream Its Output", "在 Daytona 无头跑 Gemini CLI 并流式输出"),
        ("Generate Verified Code With Google ADK Agent", "用 Google ADK 智能体生成已验证代码"),
        ("Run the Kimi CLI in a Daytona Sandbox", "在 Daytona 沙箱里跑 Kimi CLI"),
        ("Run AWS Kiro's CLI in a Daytona Sandbox and Stream Its Output", "在 Daytona 沙箱跑 AWS Kiro CLI 并流式输出"),
        ("Phase 1: Understand", "阶段 1：理解"),
        ("Phase 2: Reproduce", "阶段 2：复现"),
        ("Phase 3: Fix", "阶段 3：修复"),
        ("Phase 4: Pull Request", "阶段 4：Pull Request"),
    ]:
        if a in t2:
            t2 = t2.replace(a, b)
    return t2


def translate_prose(s: str) -> str:
    out = s
    for a, b in PHRASES:
        out = out.replace(a, b)
    replacements = [
        ("sandboxes", "沙箱"),
        ("sandbox", "沙箱"),
        ("snapshots", "快照"),
        ("snapshot", "快照"),
        ("volumes", "卷"),
        ("volume", "卷"),
        ("regions", "区域"),
        ("region", "区域"),
        ("organization", "组织"),
        ("Organizations", "组织"),
        ("authentication", "认证"),
        ("Authentication", "认证"),
        ("environment variables", "环境变量"),
        ("API key", "API 密钥"),
        ("API keys", "API 密钥"),
        ("the following", "下列"),
        ("The following", "下列"),
        ("for example", "例如"),
        ("For example", "例如"),
        ("by default", "默认"),
        ("By default", "默认"),
        ("see the", "见"),
        ("See the", "见"),
        ("Learn more", "了解更多"),
        ("Get started", "开始"),
    ]
    # Do NOT blindly replace sandbox in code; this function is for prose only.
    # Avoid over-replacing English identifiers by only applying long phrases above
    # plus a few safe ones:
    safe = [
        ("isolated environment", "隔离环境"),
        ("command-line interface", "命令行界面"),
        ("web interface", "网页界面"),
        ("identity provider", "身份提供商"),
        ("access control", "访问控制"),
        ("resource allocation", "资源分配"),
        ("lifecycle management", "生命周期管理"),
        ("persistent storage", "持久存储"),
        ("object storage", "对象存储"),
        ("network isolation", "网络隔离"),
        ("runtime isolation", "运行时隔离"),
    ]
    for a, b in safe:
        out = out.replace(a, b)
    return out


def keep_heading_id(raw: str) -> tuple[str, str]:
    m = re.match(r"^(.*?)\s*\{#([A-Za-z0-9_-]+)\}\s*$", raw.strip())
    if m:
        return m.group(1).strip(), m.group(2)
    return raw.strip(), ""


def convert_official(slug: str, title: str, desc: str, src: str) -> str:
    src = strip_mintlify(src)
    src = rewrite_links(src)
    src = src.replace("\r\n", "\n")
    lines = src.split("\n")
    out: list[str] = []
    i = 0
    h1_done = False
    while i < len(lines):
        line = lines[i]
        if line.startswith("```"):
            buf = [line]
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                buf.append(lines[i])
                i += 1
            if i < len(lines):
                buf.append(lines[i])
                i += 1
            out.extend(buf)
            continue
        hm = re.match(r"^(#{1,4})\s+(.+)$", line)
        if hm:
            level = hm.group(1)
            raw, hid = keep_heading_id(hm.group(2))
            raw = clean_html(raw)
            zh = translate_heading(raw)
            if not hid:
                hid = slugify_en(raw)
            if level == "#" and not h1_done:
                zh = title
                hid = slug.split("/")[-1]
                h1_done = True
                out.append(f"# {zh} {{#{hid}}}")
                out.append("")
                out.append(desc)
                i += 1
                continue
            out.append(f"{level} {zh} {{#{hid}}}")
            i += 1
            continue
        if line.startswith("> "):
            out.append("> " + translate_prose(clean_html(line[2:])))
            i += 1
            continue
        if re.match(r"^[-*] ", line):
            out.append(line[:2] + translate_prose(clean_html(line[2:])))
            i += 1
            continue
        if re.match(r"^\d+\. ", line):
            m = re.match(r"^(\d+\. )(.*)$", line)
            out.append(m.group(1) + translate_prose(clean_html(m.group(2))))
            i += 1
            continue
        if line.startswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if set("".join(cells).replace("-", "").replace(":", "").replace(" ", "")) == set():
                out.append(line)
            else:
                zh_cells = [translate_heading(clean_html(c)) if c else c for c in cells]
                # heading-like cells; also try prose
                zh_cells = [translate_prose(c) for c in zh_cells]
                out.append("| " + " | ".join(zh_cells) + " |")
            i += 1
            continue
        if not line.strip():
            out.append("")
            i += 1
            continue
        cleaned = clean_html(line)
        if cleaned.strip():
            out.append(translate_prose(cleaned))
        else:
            out.append("")
        i += 1

    body = "\n".join(out).strip() + "\n"
    # collapse 3+ blank lines
    body = re.sub(r"\n{3,}", "\n\n", body)
    official = "https://www.daytona.io/docs/" if slug == "index" else f"https://www.daytona.io/docs/en/{slug}"
    web = "/" if slug == "index" else f"/docs/{slug}"
    if "英文原文" not in body:
        body += f"\n> 英文原文：{official}\n> 本站位置：`{web}`\n"
    return body


SDK_BLURB = {
    "typescript-sdk": ("TypeScript SDK", "@daytona/sdk", "npm install @daytona/sdk"),
    "python-sdk": ("Python SDK", "daytona", "pip install daytona"),
    "go-sdk": ("Go SDK", "sdk-go", "go get github.com/daytonaio/sdk-go"),
    "java-sdk": ("Java SDK", "daytona", "Maven / Gradle 依赖见官网"),
    "ruby-sdk": ("Ruby SDK", "daytona", "gem install daytona"),
}


def sdk_stub(slug: str, title: str, desc: str) -> str:
    parts = slug.split("/")
    sdk = parts[0]
    name = parts[-1]
    sdk_title, pkg, install = SDK_BLURB.get(sdk, (sdk, sdk, ""))
    parent = f"/docs/{sdk}"
    official = f"https://www.daytona.io/docs/en/{slug}"
    hid = name
    return f"""# {title} {{#{hid}}}

{desc}

这是 **{sdk_title}** 的模块参考页，对应官网 `{name}`。方法签名、参数与返回值以英文原文为准；本页给出中文定位与入口。

安装：

```bash
{install}
```

完整客户端用法见 [{sdk_title} 总览]({parent})。

## 本站位置 {{#location}}

- 中文站：`/docs/{slug}`
- 侧栏「工具」→ {sdk_title} → {title}
- [英文原文]({official})

> 英文原文：{official}
> 本站位置：`/docs/{slug}`
"""


def write_page(slug: str, body: str) -> None:
    path = ZH / ("index.md" if slug == "index" else f"{slug}.md")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body, encoding="utf-8")


def main() -> None:
    n = 0
    for slug, title, desc, _href in parse_catalog():
        if slug in SKIP:
            continue
        dest = ZH / ("index.md" if slug == "index" else f"{slug}.md")
        if dest.exists() and slug in SKIP:
            continue
        src_path = official_file(slug)
        if src_path:
            body = convert_official(slug, title, desc, src_path.read_text(encoding="utf-8", errors="replace"))
        elif "-sdk/" in slug:
            body = sdk_stub(slug, title, desc)
        else:
            official = f"https://www.daytona.io/docs/en/{slug}"
            hid = slug.split("/")[-1]
            body = f"""# {title} {{#{hid}}}

{desc}

> 本页中文导读。完整参数与最新示例见 [英文原文]({official})。

## 本站位置 {{#location}}

- 中文站：`/docs/{slug}`
- [英文原文]({official})

> 英文原文：{official}
> 本站位置：`/docs/{slug}`
"""
        write_page(slug, body)
        n += 1
    print("wrote", n, "pages; total", len(list(ZH.rglob('*.md'))))


if __name__ == "__main__":
    main()
