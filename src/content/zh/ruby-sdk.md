# Ruby SDK {#ruby-sdk}

gem install daytona。

The Daytona Ruby SDK provides a robust interface for programmatically interacting with Daytona Sandboxes.

## 安装 {#installation}

Install the Daytona Ruby SDK using Bundler by adding it to your Gemfile:

```ruby
gem 'daytona'
```

Then run:

```bash
bundle install
```

Or install it directly:

```bash
gem install daytona
```

## 入门 {#getting-started}

Here's a simple example to help you get started with the Daytona Ruby SDK:

```ruby
require 'daytona'

# Initialize the SDK (uses environment variables by default)
daytona = Daytona::Daytona.new

# Create a new sandbox
sandbox = daytona.create

# Execute a command
response = sandbox.process.exec(command: "echo 'Hello, World!'")
puts response.result

# Clean up
daytona.delete(sandbox)
```

## 配置 {#configuration}

The SDK can be configured using environment variables or by passing options to the constructor:

```ruby
require 'daytona'

# Using environment variables (DAYTONA_API_KEY, DAYTONA_API_URL, DAYTONA_TARGET)
daytona = Daytona::Daytona.new

# Using explicit configuration
config = Daytona::Config.new(
  api_key: 'your-api-key',
  api_url: 'https://app.daytona.io/api',
  target: 'us'
)
daytona = Daytona::Daytona.new(config)
```

## 实时状态更新 {#real-time-state-updates}

从 SDK 版本 **0.198.0**, the SDK streams sandbox state changes over a WebSocket (Socket.IO) connection by default. Sandbox lifecycle operations that wait on a state change (start, stop, pause, resize, snapshot, delete with `wait`) complete as soon as the server pushes the new state, instead of waiting for the next polling interval.

Each `Daytona::Daytona` client opens a single WebSocket connection shared by all of its sandboxes. A sparse polling safety net runs alongside the event stream, so a missed event never hangs a waiting operation.

The WebSocket handshake carries `source` and `sdkVersion` query parameters, equivalent to the `X-Daytona-Source` and `X-Daytona-SDK-Version` REST headers. The SDK collects no client-side telemetry.

### 轮询回退 {#polling-fallback}

如果无法建立 WebSocket 连接, for example when a proxy, firewall, or network policy blocks it, the SDK falls back to polling automatically. Connection setup runs in the background and never raises an error, so no handling is required.

The WebSocket endpoint derives from the configured API URL, including custom base paths, so reverse proxy deployments such as `https://host/prefix/api` work without additional configuration.

### 退出事件流 {#opt-out-of-event-streaming}

> Polling-only mode is deprecated and will be removed in a future release. Because the SDK falls back to polling automatically, opting out is only needed in environments that prohibit WebSocket connections by policy.

纯轮询模式下 SDK 不会打开 WebSocket。 Sandbox state is observed exclusively by polling the REST API, with the same cadence as SDK versions before event streaming.

To opt out, set the `DAYTONA_USE_DEPRECATED_POLLING` environment variable:

```bash
export DAYTONA_USE_DEPRECATED_POLLING=true
```

Or pass `use_deprecated_polling` when initializing the client. The explicit configuration option always takes precedence over the environment variable; the environment variable applies only when the option is unset.

```ruby
require 'daytona'

config = Daytona::Config.new(use_deprecated_polling: true)
daytona = Daytona::Daytona.new(config)
```

See the [`Config` reference](/docs/ruby-sdk/config) for details.

## Environment Variables {#environment-variables}

The SDK supports the following environment variables:

| Variable | Description |
|----------|-------------|
| `DAYTONA_API_KEY` | API key for authentication |
| `DAYTONA_API_URL` | URL of the Daytona API (defaults to `https://app.daytona.io/api`) |
| `DAYTONA_TARGET` | Target location for Sandboxes |
| `DAYTONA_JWT_TOKEN` | JWT token for authentication (alternative to API key) |
| `DAYTONA_ORGANIZATION_ID` | Organization ID (required when using JWT token) |

## 参考 {#reference}

The Ruby SDK reference documents the following modules:

- [Chart](/docs/ruby-sdk/charts)
- [ComputerUse](/docs/ruby-sdk/computer-use)
- [Config](/docs/ruby-sdk/config)
- [Daytona](/docs/ruby-sdk/daytona)
- [FileSystem](/docs/ruby-sdk/file-system)
- [Git](/docs/ruby-sdk/git)
- [Image](/docs/ruby-sdk/image)
- [LspServer](/docs/ruby-sdk/lsp-server)
- [ObjectStorage](/docs/ruby-sdk/object-storage)
- [Process](/docs/ruby-sdk/process)
- [Sandbox](/docs/ruby-sdk/sandbox)
- [Secret](/docs/ruby-sdk/secret)
- [SecretService](/docs/ruby-sdk/secret-service)
- [SnapshotService](/docs/ruby-sdk/snapshot)
- [Volume](/docs/ruby-sdk/volume)
- [VolumeService](/docs/ruby-sdk/volume-service)

> 英文原文：https://www.daytona.io/docs/en/ruby-sdk
> 本站位置：`/docs/ruby-sdk`
