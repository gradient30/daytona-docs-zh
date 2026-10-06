# 限额 {#limits}

资源、沙箱配额、磁盘配额与速率限制。

[Daytona Limits ↗](https://app.daytona.io/dashboard/limits) 汇总组织的[资源](#resources)、[单沙箱限额](#sandbox-limits)和[速率限制](#rate-limits)。Daytona 按验证状态把组织放进[等级](#tiers)，每个等级对应一块计算池和一组速率限制。消费与钱包见[计费](/docs/billing)。

## 资源 {#resources}

资源在所有正在运行的沙箱之间共享。能同时跑多少沙箱，取决于各自的用量。组织会按验证状态自动进入某个等级，并获得一块计算池：

- **Compute**：可用的 CPU 核心总数
- **Memory**：可用的内存总量
- **Storage**：可用的磁盘总量

[GPU 沙箱](/docs/sandboxes#gpu-sandboxes) 使用 [Earth 区域](/docs/regions#earth-region) 下单独的 GPU 配额。它们的 vCPU、内存和磁盘**不计入**等级计算池。

## 单沙箱限额 {#sandbox-limits}

单沙箱限额是每个沙箱的资源上限。

- **Compute**：每个沙箱最多多少 vCPU
- **Memory**：每个沙箱最多多少 GiB 内存
- **Storage**：每个沙箱最多多少 GiB 磁盘

是否占用这些限额取决于[生命周期状态](/docs/sandboxes#sandbox-lifecycle)：停止、暂停、归档、删除会释放预留的 CPU 和内存；磁盘配额则看沙箱类型和状态。

## 磁盘配额 {#disk-quota}

磁盘配额和[沙箱计费](/docs/billing#sandbox-billing)是两件事：沙箱可以按预留磁盘计费，但不一定计入组织存储上限。下表说明[容器沙箱](/docs/sandboxes#create-sandboxes)和 [VM 沙箱](/docs/sandboxes#vm-sandboxes)在哪些状态占用磁盘配额。

| **状态** | **容器沙箱** | **VM 沙箱（Linux VM 与 Windows）** | **说明** |
| --- | --- | --- | --- |
| Stopped | ✓ | ✗ | 已停止的容器沙箱在归档前仍占磁盘配额。已停止的 VM 沙箱会释放配额：状态卸载到存储层，恢复仍然快，配额已放出。 |
| Paused | ✗ | ✗ | 已暂停的 VM 沙箱释放磁盘配额。仅 [**VM 沙箱**](/docs/sandboxes#vm-sandboxes) 支持。 |
| Archived | ✗ | ✗ | [**归档**](/docs/sandboxes#archive-sandboxes) 把容器文件系统挪到对象存储，释放配额并停止计费。仅 [**容器沙箱**](/docs/sandboxes#create-sandboxes) 支持。VM 没有归档态，因为停止或暂停已经释放配额。 |

## 速率限制 {#rate-limits}

速率限制控制一段时间窗口内能发多少 API 请求。限额按等级、是否登录、以及操作类型生效。一般已认证请求按组织计数。

| **等级** | **一般请求（每分钟）** | **创建沙箱（每分钟）** | **生命周期操作（每分钟）** |
| --- | --- | --- | --- |
| Tier 1 | 10,000 | 300 | 10,000 |
| Tier 2 | 20,000 | 400 | 20,000 |
| Tier 3 | 40,000 | 500 | 40,000 |
| Tier 4 | 50,000 | 600 | 50,000 |
| Enterprise | 定制 | 定制 | 定制 |

### 速率限制响应头 {#rate-limit-headers}

API 响应头里带有速率限制信息。头名称后缀取决于触发的限制（例如 `-anonymous`、`-authenticated`、`-sandbox-create`、`-sandbox-lifecycle`）：

| 头模式 | 说明 |
| --- | --- |
| **`X-RateLimit-Limit-{throttler}`** | 时间窗口内允许的最大请求数 |
| **`X-RateLimit-Remaining-{throttler}`** | 当前窗口剩余请求数 |
| **`X-RateLimit-Reset-{throttler}`** | 距离窗口重置还有多少秒 |
| **`Retry-After-{throttler}`** | 超限后建议等待多少秒再重试 |

### 速率限制错误 {#rate-limit-errors}

[Python](/docs/python-sdk)、[TypeScript](/docs/typescript-sdk)、[Ruby](/docs/ruby-sdk) 和 [Go](/docs/go-sdk) SDK 在超限时抛出 `DaytonaRateLimitError`（Python 为异常，TypeScript / Ruby / Go 为错误）。

错误响应是 JSON：

- **`statusCode`**：HTTP 状态码
- **`message`**：错误信息
- **`error`**：错误类型

```json
{
  "statusCode": 429,
  "message": "Rate limit exceeded",
  "error": "Too Many Requests"
}
```

所有错误都带 [**`headers`**](#rate-limit-headers) 和状态码，可以直接从错误对象读速率限制头。头名称不区分大小写：

```typescript
try {
  await daytona.create()
} catch (error) {
  if (error instanceof DaytonaRateLimitError) {
    console.log(error.headers?.get('x-ratelimit-remaining-sandbox-create'))
    console.log(error.headers?.get('X-RateLimit-Remaining-Sandbox-Create')) // also works
  }
}
```

```python
try:
  daytona.create(snapshot="my-snapshot")
except DaytonaRateLimitError as e:
  print(e.headers['x-ratelimit-remaining-sandbox-create'])
  print(e.headers['X-RateLimit-Remaining-Sandbox-Create'])  # also works
```

```ruby
begin
  daytona.create
rescue Daytona::Sdk::Error => e
  puts "Error: #{e.message}"
end
```

```go
sandbox, err := daytona.Create(ctx, nil)
if err != nil {
  var rateLimitErr *errors.DaytonaRateLimitError
  if errors.As(err, &rateLimitErr) {
    fmt.Println(rateLimitErr.Headers.Get("x-ratelimit-remaining-sandbox-create"))
    fmt.Println(rateLimitErr.Headers.Get("X-RateLimit-Remaining-Sandbox-Create")) // also works
  }
}
```

## 等级 {#tiers}

限额作用在组织的默认区域。要提高限额，在 [Daytona 仪表盘 ↗](https://app.daytona.io/dashboard/limits) 完成对应验证：

| **等级** | **资源（vCPU / RAM / Storage）** | **准入** |
| --- | --- | --- |
| Tier 1 | 10 / 10GiB / 30GiB | 邮箱已验证 |
| Tier 2 | 100 / 200GiB / 300GiB | 已绑信用卡，充值 $25 |
| Tier 3 | 250 / 500GiB / 2000GiB | 充值 $500 |
| Tier 4 | 500 / 1000GiB / 5000GiB | 每 30 天充值 $2000 |
| Custom | 定制 | 联系 [support@daytona.io](mailto:support@daytona.io) |

> 按等级施加的网络限制会自动生效，见[网络限制](/docs/network-limits)。

> 等级资源不含 GPU 沙箱。按需 [GPU 沙箱](/docs/sandboxes#gpu-sandboxes) 只计入 [Earth 区域](/docs/regions#earth-region) 的 GPU 配额，不必升到 Tier 3 才能跑。[Spot GPU 沙箱](/docs/sandboxes#spot-gpu-sandboxes) 需要 Tier 2 或更高。

## 限额一览 {#limits-overview}

下表是各等级的资源与速率限制总览。

| **等级** | **Compute (vCPU)** | **Memory (GiB)** | **Storage (GiB)** | **API 请求（每分钟）** | **创建沙箱（每分钟）** | **生命周期（每分钟）** |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | 10 | 20 | 30 | 10,000 | 300 | 10,000 |
| **2** | 100 | 200 | 300 | 20,000 | 400 | 20,000 |
| **3** | 250 | 500 | 2,000 | 40,000 | 500 | 40,000 |
| **4** | 500 | 1,000 | 5,000 | 50,000 | 600 | 50,000 |
| **Enterprise** | 定制 | 定制 | 定制 | 定制 | 定制 | 定制 |

## 实践建议 {#best-practices}

在速率限制内工作，要妥善处理 `429`：收到限流错误后做指数退避，重试间隔逐步拉长（1s、2s、4s、8s……），避免把 API 打满。

**盯住[速率限制响应头](#rate-limit-headers)**（例如 `X-RateLimit-Remaining-{throttler}`、`X-RateLimit-Reset-{throttler}`），在触顶前主动降速。这些头在所有错误对象的 `headers` 上都能读到。

**缓存不常变的响应**，例如相对稳定的[沙箱列表](/docs/sandboxes#list-sandboxes)、[可用区域](/docs/regions)和[快照信息](/docs/snapshots)，减少无谓调用。

**批量并优化操作**：在限额内并行创建多个沙箱，而不是串行；能复用就别为每个任务新建。

**管好生命周期以减少调用**：[归档](/docs/sandboxes#archive-sandboxes) 而不是删了再建；不用时停止而不是删除；用[自动停止间隔](/docs/sandboxes#auto-stop-interval) 管理运行中的沙箱。

**做请求排队**，避免突发超限；用 [Webhooks](/docs/webhooks) 代替轮询状态。给应用日志里的 `429` 配监控和告警，赶在影响用户之前处理限流。

> 英文原文：https://www.daytona.io/docs/en/limits
> 本站位置：`/docs/limits`
