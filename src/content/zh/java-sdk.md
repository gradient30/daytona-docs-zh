# Java SDK {#java-sdk}

Maven / Gradle 与入门。

The Daytona Java SDK provides a robust interface for programmatically interacting with Daytona Sandboxes. It targets Java 11+ and uses OkHttp and Jackson.

## 安装 {#installation}

### Gradle {#gradle}

Add the Daytona SDK dependency to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("io.daytona:sdk:x.y.z")
}
```

### Maven {#maven}

Add the Daytona SDK dependency to your `pom.xml`:

```xml
<dependency>
  <groupId>io.daytona</groupId>
  <artifactId>sdk</artifactId>
  <version>x.y.z</version>
</dependency>
```

## 入门 {#getting-started}

### 创建沙箱 {#create-a-sandbox}

创建一台 Daytona 沙箱，在隔离环境里安全跑代码。 The following snippet is an example "Hello World" program that runs securely inside a Daytona Sandbox.

```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.ExecuteResponse;

public class Main {
    public static void main(String[] args) {
        // Initialize the SDK (uses environment variables by default)
        try (Daytona daytona = new Daytona()) {
            // Create a new sandbox
            Sandbox sandbox = daytona.create();

            // Execute a command
            ExecuteResponse response = sandbox.getProcess().executeCommand("echo 'Hello, World!'");
            System.out.println(response.getResult());

            // Clean up
            sandbox.delete();
        }
    }
}
```

## 配置 {#configuration}

The Daytona SDK can be configured using environment variables or by passing a configuration object:

```java
// Using environment variables (DAYTONA_API_KEY, DAYTONA_API_URL, DAYTONA_TARGET)
Daytona daytona = new Daytona();
```

```java
// Using explicit configuration
DaytonaConfig config = new DaytonaConfig.Builder()
    .apiKey("YOUR_API_KEY")
    .apiUrl("YOUR_API_URL")
    .target("us")
    .build();
Daytona daytona = new Daytona(config);
```

SDK 配置详见 [API keys](/docs/api-keys#authentication).

## 实时状态更新 {#real-time-state-updates}

从 SDK 版本 **0.198.0**, the SDK streams sandbox state changes over a WebSocket (Socket.IO) connection by default. Sandbox lifecycle operations that wait on a state change (start, stop, pause, resize, snapshot, delete with `wait`) complete as soon as the server pushes the new state, instead of waiting for the next polling interval.

Each `Daytona` client opens a single WebSocket connection shared by all of its sandboxes. A sparse polling safety net runs alongside the event stream, so a missed event never hangs a waiting operation.

The WebSocket handshake carries `source` and `sdkVersion` query parameters, equivalent to the `X-Daytona-Source` and `X-Daytona-SDK-Version` REST headers. The SDK collects no client-side telemetry.

### 轮询回退 {#polling-fallback}

如果无法建立 WebSocket 连接, for example when a proxy, firewall, or network policy blocks it, the SDK falls back to polling automatically. Connection setup runs in the background and never throws, so no error handling is required.

The WebSocket endpoint derives from the configured API URL, including custom base paths, so reverse proxy deployments such as `https://host/prefix/api` work without additional configuration.

### 退出事件流 {#opt-out-of-event-streaming}

> Polling-only mode is deprecated and will be removed in a future release. Because the SDK falls back to polling automatically, opting out is only needed in environments that prohibit WebSocket connections by policy.

纯轮询模式下 SDK 不会打开 WebSocket。 Sandbox state is observed exclusively by polling the REST API, with the same cadence as SDK versions before event streaming.

To opt out, set the `DAYTONA_USE_DEPRECATED_POLLING` environment variable:

```bash
export DAYTONA_USE_DEPRECATED_POLLING=true
```

Or set `useDeprecatedPolling` on the configuration builder. The explicit configuration option always takes precedence over the environment variable; the environment variable applies only when the option is unset.

```java
DaytonaConfig config = new DaytonaConfig.Builder()
    .useDeprecatedPolling(true)
    .build();
Daytona daytona = new Daytona(config);
```

See the [`DaytonaConfig` reference](/docs/java-sdk/config) for details.

## 参考 {#reference}

The Java SDK reference documents the following modules:

- [CodeInterpreter](/docs/java-sdk/code-interpreter)
- [ComputerUse](/docs/java-sdk/computer-use)
- [Daytona](/docs/java-sdk/daytona)
- [DaytonaConfig](/docs/java-sdk/config)
- [Errors](/docs/java-sdk/errors)
- [FileSystem](/docs/java-sdk/file-system)
- [Git](/docs/java-sdk/git)
- [Image](/docs/java-sdk/image)
- [LspServer](/docs/java-sdk/lsp-server)
- [Process](/docs/java-sdk/process)
- [Pty](/docs/java-sdk/pty)
- [PtyHandle](/docs/java-sdk/pty-handle)
- [Sandbox](/docs/java-sdk/sandbox)
- [SecretService](/docs/java-sdk/secret-service)
- [SnapshotService](/docs/java-sdk/snapshot)
- [VolumeService](/docs/java-sdk/volume-service)

> 英文原文：https://www.daytona.io/docs/en/java-sdk
> 本站位置：`/docs/java-sdk`
