# 认证 {#api-keys}

API 密钥、JWT、权限范围与托管密钥。

Daytona API keys authenticate requests to the Daytona API. They are used by the Daytona SDKs and CLI to access and manage resources in your organization.

## 创建 API 密钥 {#create-an-api-key}

Create API keys to authenticate Daytona SDKs, API, and CLI requests.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/keys)
2. Click Create Key
3. Enter the name of the API key, set the expiration date, and [select permissions](#permissions--scopes)
4. Click Create
5. Copy the API key to your clipboard and use it to authenticate requests

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

Daytona supports multiple configuration methods, in order of precedence:

1. Configuration in code
2. Environment variables
3. **`.env`** file
4. Default values

| **Variable** | **Description** |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| **`DAYTONA_API_KEY`** | Your Daytona API key   Required |
| **`DAYTONA_API_URL`** | URL of the Daytona API   Default: **`https://app.daytona.io/api`** |
| **`DAYTONA_TARGET`** | Target region for sandboxes   区域: **`us`**, **`eu`** |
| **`DAYTONA_ORGANIZATION_ID`** | Your organization ID  Required when authenticating with a JWT token |
| **`DAYTONA_JWT_TOKEN`** | JWT token from **`daytona login`**   Used for programmatic account-level operations |

#### **`.env`** file {#env-file}

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

JWT tokens are used to authenticate account-level operations with the Daytona API. 

Every JWT-authenticated request must include the `X-Daytona-Organization-ID` header set to your organization ID. JWT tokens expire after a short period.

1. Run [**`daytona login`**](/docs/tools/cli#daytona-login)
2. Select Login with Browser
3. Complete the sign-in in your browser
4. The CLI saves the access token to `config.json` in the Daytona config directory

Daytona resolves the config directory from the `$DAYTONA_CONFIG_DIR` environment variable. If the variable is not set, Daytona uses the `daytona` folder inside your OS user config directory: `~/.config/daytona` on Linux and `~/Library/Application Support/daytona` on macOS. The active profile stores the token in the `api.token.accessToken` field.

## 权限与范围 {#permissions-scopes}

Permissions govern the resources in your organization — creating, modifying and deleting sandboxes, snapshots, registries, volumes, regions, runners and keys. Read access to sandboxes, snapshots, registries and regions is always granted and cannot be withheld.

Sandbox runtime access is not a grantable scope. Any API key valid for an organization can address that organization's running sandboxes through the toolbox — running processes, reading and writing files, opening preview URLs and using the terminal — regardless of the permissions selected for the key, including a key created with none. The organization is the trust boundary for sandbox compute; the scopes below control the resources themselves, not what runs inside them.

Organization usage and spend data is a partial exception. The endpoints that serve usage and cost accept `read:billing`, and also accept `write:sandboxes` for compatibility with keys provisioned before `read:billing` existed. A key that can create sandboxes can therefore also read what those sandboxes cost. Interactive sessions are unaffected — a member's role must grant `read:billing` to view spending in the dashboard.

A sandbox's deletion schedule is a modification rather than a deletion. Setting the auto-delete interval or the time-to-live on an existing sandbox requires `write:sandboxes`, and both values are also accepted when a sandbox is created. When either schedule elapses the sandbox is destroyed and its local filesystem is not recoverable, so a key holding `write:sandboxes` alone can cause sandboxes to be deleted on a schedule. `delete:sandboxes` governs the explicit delete request.

| **Resource** | **Scope** | **Description** |
| ------------ | ----------------------- | ------------------------ |
| Sandboxes | **`write:sandboxes`** | Create/modify sandboxes, including the deletion schedule |
|  | **`delete:sandboxes`** | 删除沙箱es |
| 快照 | **`write:snapshots`** | Create/modify snapshots |
|  | **`delete:snapshots`** | Delete snapshots |
| Registries | **`write:registries`** | Create/modify registries |
|  | **`delete:registries`** | Delete registries |
| 卷 | **`read:volumes`** | View volumes |
|  | **`write:volumes`** | Create/modify volumes |
|  | **`delete:volumes`** | Delete volumes |
| Audit | **`read:audit_logs`** | View audit logs |
| 区域 | **`write:regions`** | Create/modify regions |
|  | **`delete:regions`** | Delete regions |
| Runners | **`read:runners`** | View runners |
|  | **`write:runners`** | Create/modify runners |
|  | **`delete:runners`** | Delete runners |
| API Keys | **`manage:api_keys`** | Create, list, and delete API keys using an API key |
| 密钥 | **`manage:secrets`** | Create, update, and delete [secrets](/docs/secrets) |
| SSO | **`manage:sso`** | Create, update, and delete [organization SSO](/docs/sso) 身份提供商s |
| 限额 | **`read:limits`** | View organization limits and quota usage |
| 计费 | **`read:billing`** | View organization usage, spend, wallet, and invoices |
|  | **`manage:billing`** | Manage billing settings and payment methods |

## 列出 API 密钥 {#list-api-keys}

List API keys for the current user or organization. 

When authenticated with a JWT, organization owners see all keys in the organization and other users see only their own keys. When authenticated with a manager API key, the response is limited to keys that manager key created. See [Managed API keys](#managed-api-keys).

```bash
curl 'https://app.daytona.io/api/api-keys' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## 获取当前 API 密钥 {#get-current-api-key}

Get details of the API key used to authenticate the current request.

```bash
curl 'https://app.daytona.io/api/api-keys/current' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

## 获取 API 密钥 {#get-api-key}

Get a single API key by name.

```bash
curl 'https://app.daytona.io/api/api-keys/my-api-key' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Delete API key {#delete-api-key}

Delete an API key. 

The key is revoked immediately and cannot be recovered.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/keys)
2. Click Revoke next to the API key you want to delete
3. Confirm the revocation

```bash
curl 'https://app.daytona.io/api/api-keys/my-api-key' \
  --request DELETE \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Delete API key for user {#delete-api-key-for-user}

Delete an API key for a specific user.

This endpoint requires JWT authentication and is available to the key or organization owner.

```bash
curl 'https://app.daytona.io/api/api-keys/{userId}/my-api-key' \
  --request DELETE \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Managed API keys {#managed-api-keys}

**Contact Daytona to enable this feature for your organization.**

Daytona provides Managed API keys to create and manage API keys programmatically. Managed API keys let a manager key mint, list, and delete child API keys without a JWT session.

A manager key is an API key with the **`manage:api_keys`** permission. Use this when an application or service needs to issue scoped keys to tenants or workloads at runtime.

When authenticated with a manager key:

- child key permissions must be a subset of the manager key's permissions
- a manager key can only list and delete keys it created; it cannot access other keys
- child keys cannot manage other keys unless you explicitly grant them **`manage:api_keys`**

### Create a manager key {#create-a-manager-key}

Create a manager key.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/keys)
2. Click Create Key
3. Enter the key name, set the expiration date, and enable **Manage API keys**
4. Select the resource scopes child keys may use
5. Click Create
6. Copy the API key to your clipboard

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

### Create a child key {#create-a-child-key}

Create a child key.

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

The response includes the full child key value. Store it immediately. After creation, only a masked value is available when listing keys.

### List child keys {#list-child-keys}

List child keys.

```bash
curl 'https://app.daytona.io/api/api-keys' \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_MANAGER_API_KEY'
```

### Delete a child key {#delete-a-child-key}

Delete a child key.

1. Authenticate with the manager key
2. Send a `DELETE` request to `/api-keys/{name}`

    A manager key can only delete keys it created

```bash
curl 'https://app.daytona.io/api/api-keys/tenant-a-key' \
  --request DELETE \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Authorization: Bearer YOUR_MANAGER_API_KEY'
```

> 英文原文：https://www.daytona.io/docs/en/api-keys
> 本站位置：`/docs/api-keys`
