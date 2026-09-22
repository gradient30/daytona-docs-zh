# TypeScript SDK {#typescript-sdk}

`@daytona/sdk` 安装、配置与实时状态。

Daytona TypeScript SDK 用来以编程方式操作沙箱。

## 安装 {#installation}

```bash
npm install @daytona/sdk
```

或 yarn：

```bash
yarn add @daytona/sdk
```

## 入门 {#getting-started}

### 创建沙箱 {#create-a-sandbox}

```typescript
import { Daytona } from '@daytona/sdk'

async function main() {
  const daytona = new Daytona()
  const sandbox = await daytona.create({
    language: 'typescript',
    envVars: { NODE_ENV: 'development' },
  })
  const response = await sandbox.process.executeCommand('echo "Hello, World!"')
  console.log(response.result)
}

main().catch(console.error)
```

## 配置 {#configuration}

可用环境变量或构造函数参数：

```typescript
import { Daytona } from '@daytona/sdk'

const daytona = new Daytona()

const explicit = new Daytona({
  apiKey: 'YOUR_API_KEY',
  apiUrl: 'https://app.daytona.io/api',
  target: 'us',
})
```

环境变量：`DAYTONA_API_KEY`、`DAYTONA_API_URL`、`DAYTONA_TARGET`。详见[认证](/docs/api-keys#authentication)。

## 实时状态更新 {#real-time-state-updates}

从 SDK **0.198.0** 起，默认通过 WebSocket（Socket.IO）推送沙箱状态。等待状态变化的生命周期操作（start / stop / pause / resize / snapshot、带 `wait` 的 delete）会在服务端推到新状态时立刻完成，不必等下一轮轮询。

每个 `Daytona` 客户端只开一条 WebSocket，该客户端下所有沙箱共用。事件流旁边有稀疏轮询兜底，漏事件也不会把等待挂死。这条连接不会让 Node.js / Bun 进程一直活着。

握手带 `source` 和 `sdkVersion` 查询参数，等价于 REST 头 `X-Daytona-Source`、`X-Daytona-SDK-Version`。SDK 不采集客户端遥测。

### 轮询回退 {#polling-fallback}

代理、防火墙或网络策略挡住 WebSocket 时，SDK 会自动改轮询。连接在后台建立，不会抛错。

WebSocket 端点从配置的 API URL 推导，包含自定义 base path，所以 `https://host/prefix/api` 这种反向代理不用额外配置。

### 退出事件流 {#opt-out-of-event-streaming}

> 纯轮询模式已弃用，后续版本会移除。因为 SDK 会自动回退轮询，只有策略禁止 WebSocket 时才需要显式退出。

```bash
export DAYTONA_USE_DEPRECATED_POLLING=true
```

或初始化时传 `useDeprecatedPolling`（显式配置优先于环境变量）：

```typescript
import { Daytona } from '@daytona/sdk'

const daytona = new Daytona({ useDeprecatedPolling: true })
```

详见 [`DaytonaConfig`](/docs/typescript-sdk/daytona#daytonaconfig)。

## 多运行时支持 {#multiple-runtime-support}

SDK 同时发 ESM / CJS，开箱可用于 **Node.js、Bun、Next.js、Nuxt.js、Remix、Vite SSR、AWS Lambda、Azure Functions**。

**Cloudflare Workers** 在 `wrangler.toml` 打开 Node 兼容：

```toml
compatibility_flags = ["nodejs_compat"]
```

**Deno**：`deno add npm:@daytona/sdk`，或用 `npm:` 说明符：

```typescript
import { Daytona, Image } from 'npm:@daytona/sdk'
```

**浏览器 + Vite**：安装 [`vite-plugin-node-polyfills`](https://www.npmjs.com/package/vite-plugin-node-polyfills)，在 `vite.config.ts` 加入 `Buffer` / `process` / `global` polyfill。没有 `Buffer` 时，`Image.base()`、`daytona.list()` 仍可用，但 `fs.downloadFile` 这类二进制方法会抛错。

浏览器和边缘运行时没有完整 Node API（无文件系统、无 `crypto` 等），依赖这些 API 的方法会抛明确运行时错误，而不是默默给错结果。

## 参考 {#reference}

- [Charts](/docs/typescript-sdk/charts)
- [CodeInterpreter](/docs/typescript-sdk/code-interpreter)
- [ComputerUse](/docs/typescript-sdk/computer-use)
- [Daytona](/docs/typescript-sdk/daytona)
- [Errors](/docs/typescript-sdk/errors)
- [ExecuteResponse](/docs/typescript-sdk/execute-response)
- [FileSystem](/docs/typescript-sdk/file-system)
- [Git](/docs/typescript-sdk/git)
- [Image](/docs/typescript-sdk/image)
- [LspServer](/docs/typescript-sdk/lsp-server)
- [ObjectStorage](/docs/typescript-sdk/object-storage)
- [Process](/docs/typescript-sdk/process)
- [Pty](/docs/typescript-sdk/pty)
- [PtyHandle](/docs/typescript-sdk/pty-handle)
- [Sandbox](/docs/typescript-sdk/sandbox)
- [Secret](/docs/typescript-sdk/secret)
- [Snapshot](/docs/typescript-sdk/snapshot)
- [Volume](/docs/typescript-sdk/volume)
- [WarmPool](/docs/typescript-sdk/warm-pool)

> 英文原文：https://www.daytona.io/docs/en/typescript-sdk
> 本站位置：`/docs/typescript-sdk`
