# 认证 {#api-keys}

API 密钥、JWT、权限范围与托管密钥。

Daytona API 密钥用于认证对 Daytona API 的请求。它们被 Daytona SDK 和 CLI 用来访问和管理组织中的资源。

## 创建 API 密钥 {#create-an-api-key}

创建 API 密钥以认证 Daytona SDK、API 和 CLI 请求。

1. 前往 [Daytona 仪表盘 ↗](https://app.daytona.io/dashboard/keys)
2. 点击 <Button>Create Key</Button>
3. 输入 API 密钥的名称，设置过期日期，并 [选择权限](#permissions--scopes)
4. 点击 <Button>Create</Button>
5. 将 API 密钥复制到剪贴板并用于认证请求

```python
from daytona import Daytona, DaytonaConfig

# Using environment variables
daytona = Daytona()

# Using explicit configuration
config = DaytonaConfig(
    api_key="YOUR_API_KEY",
    api_url="https://app.daytona.io/api",
    target="us",
)

daytona = Daytona(config)
```

```typescript
import { Daytona } from '@daytona/sdk'

// Using environment variables
const daytona = new Daytona()

// Using explicit configuration
const daytonaWithConfig = new Daytona({
  apiKey: 'YOUR_API_KEY',
  apiUrl: 'https://app.daytona.io/api',
  target: 'us',
})
```

```ruby
require 'daytona'

# Using environment variables
daytona = Daytona::Daytona.new

# Using explicit configuration
config = Daytona::Config.new(
  api_key: 'YOUR_API_KEY',
  api_url: 'https://app.daytona.io/api',
  target: 'us'
)

daytona = Daytona::Daytona.new(config)
```

```go
import (
    "github.com/daytona/clients/sdk-go/pkg/daytona"
    "github.com/daytona/clients/sdk-go/pkg/types"
)

// Using environment variables
client, _ := daytona.NewClient()

// Using explicit configuration
client, _ = daytona.NewClientWithConfig(&types.DaytonaConfig{
    APIKey: "YOUR_API_KEY",
    APIUrl: "https://app.daytona.io/api",
    Target: "us",
})
```

```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.DaytonaConfig;

// Using environment variables
Daytona daytona = new Daytona();

// Using explicit configuration
DaytonaConfig config = new DaytonaConfig.Builder()
    .apiKey("YOUR_API_KEY")
    .apiUrl("https://app.daytona.io/api")
    .target("us")
    .build();

Daytona daytonaWithConfig = new Daytona(config);
```

## 认证 {#authentication}

Daytona 支持多种配置方法，优先级如下：

1. 代码中的配置
2. 环境变量
3. **`.env`** 文件
4. 默认值

| **变量** | **描述** |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| **`DAYTONA_API_KEY`** | 你的 Daytona API 密钥<br />必需 |
| **`DAYTONA_API_URL`** | Daytona API 的 URL<br />默认： **`https://app.daytona.io/api`** |
| **`DAYTONA_TARGET`** | 沙箱的目标区域<br />区域： **`us`**, **`eu`** |
| **`DAYTONA_ORGANIZATION_ID`** | 你的组织 ID<br />使用 JWT 令牌认证时必需 |
| **`DAYTONA_JWT_TOKEN`** | 来自 **`daytona login`** 的 JWT 令牌<br />用于程序化的账户级操作 |

#### **`.env`** 文件 {#env-file}

```bash
DAYTONA_API_KEY=YOUR_API_KEY
DAYTONA_API_URL=https://app.daytona.io/api
DAYTONA_TARGET=us
```

#### Shell {#shell}

```bash
export DAYTONA_API_KEY=YOUR_API_KEY
export DAYTONA_API_URL=https://app.daytona.io/api
export DAYTONA_TARGET=us
```

```bash
$env:DAYTONA_API_KEY="YOUR_API_KEY"
$env:DAYTONA_API_URL="https://app.daytona.io/api"
$env:DAYTONA_TARGET="us"
```

### JWT 令牌 {#jwt-tokens}

JWT 令牌用于认证 Daytona API 的账户级操作。

每个 JWT 认证的请求必须包含设置为你的组织 ID 的 `X-Daytona-Organization-ID` 头。JWT 令牌会在短时间后过期。

1. 运行 [**`daytona login`**](/docs/tools/cli#daytona-login)
2. 选择 <Button>Login with Browser</Button>
3. 在浏览器中完成登录
4. CLI 将访问令牌保存到 Daytona 配置目录中的 `config.json`

Daytona 从 `$DAYTONA_CONFIG_DIR` 环境变量解析配置目录。如果未设置该变量，Daytona 使用操作系统用户配置目录中的 `daytona` 文件夹：Linux 上为 `~/.config/daytona`，macOS 上为 `~/Library/Application Support/daytona`。活动配置文件将令牌存储在 `api.token.accessToken` 字段中。

## 权限与范围 {#permissions--scopes}

权限控制组织中的资源——创建、修改和删除沙箱、快照、注册表、卷、区域、运行器和密钥。对沙箱、快照、注册表和区域的读取访问始终被授予且不能被剥夺。

组织中的任何成员都可以为自己创建 API 密钥；密钥创建本身不是可分配的权限。密钥不能超出其创建者所持有的权限——包含创建者自身分配之外任何范围的请求将被直接拒绝而不是被裁剪。因此，没有任何分配的成员只能创建没有权限的密钥。`manage:api_keys` 控制使用 API 密钥创建密钥，而不是交互式创建。

沙箱运行时访问不是可授予的范围。任何对组织有效的 API 密钥都可以通过工具箱访问该组织的运行中沙箱——运行进程、读写文件、打开预览 URL 和使用终端——无论为密钥选择的权限如何，包括使用 none 创建的密钥。组织是沙箱计算的信任边界；下面的范围控制资源本身，而不是其中运行的内容。

组织用量和支出数据是一个部分例外。服务用量和成本的端点接受 `read:billing`，并且为了与 `read:billing` 存在之前配置的密钥兼容，也接受 `write:sandboxes`。因此，能够创建沙箱的密钥也可以读取这些沙箱的成本。交互式会话不受影响——成员的角色必须授予 `read:billing` 才能在仪表盘中查看支出。

沙箱的删除计划是修改而不是删除。在现有沙箱上设置自动删除间隔或存活时间需要 `write:sandboxes`，并且在创建沙箱时也接受这两个值。当任一计划到期时，沙箱被销毁且其本地文件系统不可恢复，因此仅持有 `write:sandboxes` 的密钥可以导致沙箱按计划被删除。`delete:sandboxes` 控制显式删除请求。

从现有沙箱创建快照需要 `write:sandboxes` 而不是 `write:snapshots`。结果是一个组织 [快照](/docs/snapshots#create-snapshot-from-sandbox)，与其他快照一样：它与组织的快照一起列出，其他成员可以从中创建沙箱，它计入组织的快照配额，并且在源沙箱被删除后仍然存在。`delete:snapshots` 控制其删除。

密钥按名称挂载到沙箱中，因此 `write:sandboxes` 也控制沙箱接收哪些 [密钥](/docs/secrets)。持有 `write:sandboxes` 的密钥可以挂载组织中的任何密钥，而无需持有 `manage:secrets`。没有 [主机允许列表](/docs/secrets#host-allowlist) 的密钥会被替换到任何主机的请求中，因此这样的密钥可以获取该密钥的值。请为每个密钥设置主机允许列表。

| **资源** | **范围** | **描述** |
| ------------ | ----------------------- | ------------------------ |
| 沙箱 | **`write:sandboxes`** | 创建/修改沙箱，包括删除计划和从沙箱创建的快照 |
|  | **`delete:sandboxes`** | 删除沙箱 |
| 快照 | **`write:snapshots`** | 创建/修改快照 |
|  | **`delete:snapshots`** | 删除快照 |
| 注册表 | **`write:registries`** | 创建/修改注册表 |
|  | **`delete:registries`** | 删除注册表 |
| 卷 | **`read:volumes`** | 查看卷 |
|  | **`write:volumes`** | 创建/修改卷 |
|  | **`delete:volumes`** | 删除卷 |
| 审计 | **`read:audit_logs`** | 查看审计日志 |
| 区域 | **`write:regions`** | 创建/修改区域 |
|  | **`delete:regions`** | 删除区域 |
| 运行器 | **`read:runners`** | 查看运行器 |
|  | **`write:runners`** | 创建/修改运行器 |
|  | **`delete:runners`** | 删除运行器 |
| API 密钥 | **`manage:api_keys`** | 使用 API 密钥创建、列出和删除 API 密钥 |
| 密钥 | **`manage:secrets`** | 创建、更新和删除 [密钥](/docs/secrets) |
| SSO | **`manage:sso`** | 生成管理门户链接、列出 SSO 连接，并管理 [组织 SSO](/docs/sso) 的旧身份提供商 |
| 限额 | **`read:limits`** | 查看组织限额和配额使用情况 |
| 计费 | **`read:billing`** | 查看组织用量、支出、钱包和发票 |
|  | **`manage:billing`** | 管理计费设置和支付方式 |

## 列出 API 密钥 {#list-api-keys}

列出当前用户或组织的 API 密钥。

当使用 JWT 认证时，组织所有者可以看到组织中的所有密钥，其他用户只能看到自己的密钥。当使用管理器 API 密钥认证时，响应仅限于该管理器密钥创建的密钥。参见 [托管 API 密钥](#managed-api-keys)。

```bash
curl 'https://app.daytona.io/api/api-keys' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## 获取当前 API 密钥 {#get-current-api-key}

获取用于认证当前请求的 API 密钥的详细信息。

```bash
curl 'https://app.daytona.io/api/api-keys/current' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

## 获取 API 密钥 {#get-api-key}

按名称获取单个 API 密钥。

```bash
curl 'https://app.daytona.io/api/api-keys/my-api-key' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## 删除 API 密钥 {#delete-api-key}

删除 API 密钥。

密钥会立即被撤销且无法恢复。

1. 前往 [Daytona 仪表盘 ↗](https://app.daytona.io/dashboard/keys)
2. 点击你想删除的 API 密钥旁边的 <Button>Revoke</Button>
3. 确认撤销

```bash
curl 'https://app.daytona.io/api/api-keys/my-api-key' \
  --request DELETE \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## 为用户删除 API 密钥 {#delete-api-key-for-user}

为特定用户删除 API 密钥。

此端点需要 JWT 认证，并且对密钥或组织所有者可用。

```bash
curl 'https://app.daytona.io/api/api-keys/{userId}/my-api-key' \
  --request DELETE \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## 托管 API 密钥 {#managed-api-keys}

**请联系 Daytona 为你的组织启用此功能。**

Daytona 提供托管 API 密钥以程序化地创建和管理 API 密钥。托管 API 密钥允许管理器密钥在没有 JWT 会话的情况下铸造、列出和删除子 API 密钥。

管理器密钥是具有 **`manage:api_keys`** 权限的 API 密钥。当你的应用程序或服务需要在运行时向租户或工作负载颁发范围密钥时使用此功能。

当使用管理器密钥认证时：

- 子密钥的权限必须是管理器密钥权限的子集
- 管理器密钥只能列出和删除它创建的密钥；它不能访问其他密钥
- 子密钥不能管理其他密钥，除非你明确授予它们 **`manage:api_keys`**

### 创建管理器密钥 {#create-a-manager-key}

创建管理器密钥。

1. 前往 [Daytona 仪表盘 ↗](https://app.daytona.io/dashboard/keys)
2. 点击 <Button>Create Key</Button>
3. 输入密钥名称，设置过期日期，并启用 **Manage API keys**
4. 选择子密钥可以使用的资源范围
5. 点击 <Button>Create</Button>
6. 将 API 密钥复制到剪贴板

```bash
curl 'https://app.daytona.io/api/api-keys' \
  --request POST \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN' \
  --data '{
  "name": "Manager Key",
  "permissions": ["manage:api_keys", "write:sandboxes", "delete:sandboxes"]
}'
```

### 创建子密钥 {#create-a-child-key}

创建子密钥。

```bash
curl 'https://app.daytona.io/api/api-keys' \
  --request POST \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_MANAGER_API_KEY' \
  --data '{
  "name": "tenant-a-key",
  "permissions": ["write:sandboxes", "delete:sandboxes"]
}'
```

响应包含完整的子密钥值。请立即存储它。创建后，在列出密钥时只有掩码值可用。

### 列出子密钥 {#list-child-keys}

列出子密钥。

```bash
curl 'https://app.daytona.io/api/api-keys' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_MANAGER_API_KEY'
```

### 删除子密钥 {#delete-a-child-key}

删除子密钥。

1. 使用管理器密钥进行认证
2. 向 `/api-keys/{name}` 发送 `DELETE` 请求

    管理器密钥只能删除它创建的密钥

```bash
curl 'https://app.daytona.io/api/api-keys/tenant-a-key' \
  --request DELETE \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_MANAGER_API_KEY'
```

> 英文原文：https://www.daytona.io/docs/en/api-keys
> 本站位置：`/docs/api-keys`
