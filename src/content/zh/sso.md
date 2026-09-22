# 组织 SSO {#sso}

OIDC、SCIM 与主流身份提供商。

Organization SSO (Single Sign-On) lets collaborative organizations sign members in through an OpenID Connect 身份提供商. Members authenticate with that provider, and Daytona creates or links their account and joins them to the organization with the roles you configure.

You register the provider once, share an organization SSO link with members, and Daytona handles provisioning, membership, and confirmation. Supported 身份提供商s include **Google Workspace**, **Microsoft Entra ID**, **Okta**, **Auth0**, **Keycloak**, **OneLogin**, and any custom OIDC-compliant 身份提供商. Existing Daytona logins continue to work alongside the organization SSO.

Managing 身份提供商s requires the **`manage:sso`** permission. Organization owners and members with the **SSO Admin** assignment can open the SSO page. See [roles](/docs/organizations#roles).

> SSO is available on the Enterprise plan for collaborative organizations.

## 在管理门户配置 SSO {#configure-sso-in-the-admin-portal}

Set up an 身份提供商 through the WorkOS Admin Portal instead of registering it by hand. Daytona generates a setup link and opens the portal in a new tab, where the portal walks you through the steps for your 身份提供商.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
2. Click Configure SSO in WorkOS
3. Select your 身份提供商 and follow the setup instructions in the portal
4. Complete the setup to return to the SSO page

The link is generated on click and expires five minutes after issuance. Click the button again to generate a new one. The button is shown to organization owners and members with the **`manage:sso`** permission, and only when the organization's plan includes SSO. An organization that has just been entitled to SSO can take a few seconds before a link can be generated.

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers/workos-admin-portal-link' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "intent": "sso"
}'
```

## 配置 SCIM 目录同步 {#configure-scim-directory-sync}

Connect your 身份提供商's directory over SCIM, so membership changes in the directory reach the organization. Setup uses the same Admin Portal link with the directory sync flow instead of the SSO flow.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
2. Click Configure directory sync
3. Select your directory provider and follow the setup instructions in the portal
4. Complete the setup to return to the SSO page

Once a directory is connected, it owns organization membership. Deprovisioning a member in the directory, or deactivating their membership, removes the membership in Daytona. The **Owner** or **Member** role the directory assigns overrides the role set in Daytona, including demoting an owner.

The organization's last owner is exempt. A directory change that would remove the only remaining owner, or demote them to **Member**, is refused, so directory sync cannot leave an organization without an owner. That member keeps the role Daytona holds, and the directory and Daytona stay out of sync for them until an owner resolves the difference.

Directory sync follows its own entitlement. The button is shown only when the organization's plan includes directory sync, and it requires the same **`manage:sso`** permission as the SSO flow.

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers/workos-admin-portal-link' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "intent": "dsync"
}'
```

## 配置身份提供商 {#configure-an-identity-provider}

Configure an OIDC 身份提供商 for your organization. Select an 身份提供商 template:

- [Google Workspace](#google-workspace)
- [Microsoft Entra ID](#microsoft-entra-id)
- [Okta](#okta)
- [Auth0](#auth0)
- [Keycloak](#keycloak)
- [OneLogin](#onelogin)
- [Custom OIDC](#custom-oidc)

### 配置选项 {#configuration-options}

| **Option** | **Description** |
| ---------- | --------------- |
| **`name`** | 显示 name for the 身份提供商 |
| **`oidcConfig.issuerUrl`** | OIDC issuer URL. Daytona fetches **`{issuerUrl}/.well-known/openid-configuration`** for discovery |
| **`oidcConfig.clientId`** | OAuth client ID from your 身份提供商 |
| **`oidcConfig.clientSecret`** | OAuth client secret from your 身份提供商 |
| **`oidcConfig.scope`** | OAuth scopes. Default: **`openid email profile`** |
| **`emailDomains`** | Domains allowed for this 身份提供商. Required unless **`allowAnyDomain`** is **`true`**. Each domain must be owned by a first-party verified organization member |
| **`allowAnyDomain`** | When **`true`**, accepts any email domain returned by the 身份提供商. Use only for trusted 身份提供商s that strictly control who can authenticate. Default: **`false`** |
| **`trustEmailVerified`** | When **`true`**, skips the **`email_verified`** claim check (**Skip email verification check** in the dashboard). Required for providers such as **Microsoft Entra ID** that do not return **`email_verified`**. Default: **`false`** |
| **`defaultAssignedRoleIds`** | Organization role IDs assigned when a user joins via SSO (**Default role assignments** in the dashboard). Empty grants membership with no resource permissions, which still includes running processes in the organization's sandboxes and reading and writing files inside them. Default: **`[]`** |
| **`enabled`** | Whether the 身份提供商 accepts sign-ins. Default: **`true`** |

A domain can be claimed by at most one 身份提供商 across Daytona. Claiming a domain requires at least one organization member with a first-party verified email on that domain. Email addresses verified only through SSO do not satisfy domain ownership.

### Google Workspace {#google-workspace}

Configure Google Workspace as an OIDC 身份提供商 for your organization.

1. **Prerequisite**: 

    OAuth client in Google Cloud Console with the Authorization Code grant
2. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
3. Click Create Provider
4. Select Google Workspace
5. Copy the **Callback URI** and add it to the OAuth client's authorized redirect URIs. The URI must match exactly: **`https://app.daytona.io/api/auth/sso/callback`**
6. Enter the [configuration](#configuration-options)
7. Optionally click Test next to **Issuer URL** to verify OIDC discovery
8. Click Create

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "Google Workspace",
  "oidcConfig": {
    "issuerUrl": "https://accounts.google.com",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "scope": "openid email profile"
  },
  "emailDomains": ["company.com"],
  "allowAnyDomain": false,
  "trustEmailVerified": false,
  "defaultAssignedRoleIds": ["00000000-0000-0000-0000-000000000001"],
  "enabled": true
}'
```

### Microsoft Entra ID {#microsoft-entra-id}

Configure Microsoft Entra ID as an OIDC 身份提供商 for your organization.

1. **Prerequisite**: 

    Web application in Microsoft Entra ID with the Authorization Code grant and a client secret. Add **`email`** as an optional claim for the ID token and UserInfo response, and ensure each user has a populated mail attribute. Enable **Skip email verification check** (**`trustEmailVerified: true`**) because Entra ID does not normally return **`email_verified`**. Use the tenant-specific v2.0 issuer **`https://login.microsoftonline.com/{tenant-id}/v2.0`** instead of the multi-tenant **`common`** or **`organizations`** issuer
2. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
3. Click Create Provider
4. Select Microsoft Entra ID
5. Copy the **Callback URI** and add it to the application's redirect URIs. The URI must match exactly: **`https://app.daytona.io/api/auth/sso/callback`**
6. Enter the [configuration](#configuration-options)
7. Optionally click Test next to **Issuer URL** to verify OIDC discovery
8. Click Create

> Daytona reads the standard **`email`** claim only. There is no fallback to **`preferred_username`** or **`upn`**, so a tenant that does not return **`email`** fails with **`missing_email`**.

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "Microsoft Entra ID",
  "oidcConfig": {
    "issuerUrl": "https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "scope": "openid email profile"
  },
  "emailDomains": ["company.com"],
  "allowAnyDomain": false,
  "trustEmailVerified": true,
  "defaultAssignedRoleIds": ["00000000-0000-0000-0000-000000000001"],
  "enabled": true
}'
```

### Okta {#okta}

Configure Okta as an OIDC 身份提供商 for your organization.

1. **Prerequisite**: 

    OpenID Connect web application in Okta with the Authorization Code grant and client secret authentication. Map the user's email address to the standard OIDC **`email`** claim
2. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
3. Click Create Provider
4. Select Okta
5. Copy the **Callback URI** and add it to Sign-in redirect URIs. The URI must match exactly: **`https://app.daytona.io/api/auth/sso/callback`**
6. Enter the [configuration](#configuration-options)
7. Optionally click Test next to **Issuer URL** to verify OIDC discovery
8. Click Create

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "Okta",
  "oidcConfig": {
    "issuerUrl": "https://your-domain.okta.com",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "scope": "openid email profile"
  },
  "emailDomains": ["company.com"],
  "allowAnyDomain": false,
  "trustEmailVerified": false,
  "defaultAssignedRoleIds": ["00000000-0000-0000-0000-000000000001"],
  "enabled": true
}'
```

### Auth0 {#auth0}

Configure Auth0 as an OIDC 身份提供商 for your organization.

1. **Prerequisite**: 

    Regular Web Application in Auth0 with the Authorization Code grant
2. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
3. Click Create Provider
4. Select Auth0
5. Copy the **Callback URI** and add it to Allowed Callback URLs. The URI must match exactly: **`https://app.daytona.io/api/auth/sso/callback`**
6. Enter the [configuration](#configuration-options)
7. Optionally click Test next to **Issuer URL** to verify OIDC discovery
8. Click Create

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "Auth0",
  "oidcConfig": {
    "issuerUrl": "https://your-tenant.auth0.com",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "scope": "openid email profile"
  },
  "emailDomains": ["company.com"],
  "allowAnyDomain": false,
  "trustEmailVerified": false,
  "defaultAssignedRoleIds": ["00000000-0000-0000-0000-000000000001"],
  "enabled": true
}'
```

### Keycloak {#keycloak}

Configure Keycloak as an OIDC 身份提供商 for your organization.

1. **Prerequisite**: 

    OpenID Connect client in Keycloak with the Authorization Code flow and client authentication (client secret)
2. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
3. Click Create Provider
4. Select Keycloak
5. Copy the **Callback URI** and add it to Valid redirect URIs. The URI must match exactly: **`https://app.daytona.io/api/auth/sso/callback`**
6. Enter the [configuration](#configuration-options)
7. Optionally click Test next to **Issuer URL** to verify OIDC discovery
8. Click Create

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "Keycloak",
  "oidcConfig": {
    "issuerUrl": "https://keycloak.example.com/realms/your-realm",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "scope": "openid email profile"
  },
  "emailDomains": ["company.com"],
  "allowAnyDomain": false,
  "trustEmailVerified": false,
  "defaultAssignedRoleIds": ["00000000-0000-0000-0000-000000000001"],
  "enabled": true
}'
```

### OneLogin {#onelogin}

Configure OneLogin as an OIDC 身份提供商 for your organization.

1. **Prerequisite**: 

    OpenID Connect application in OneLogin with the Authorization Code grant and client secret authentication
2. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
3. Click Create Provider
4. Select OneLogin
5. Copy the **Callback URI** and add it to Redirect URIs. The URI must match exactly: **`https://app.daytona.io/api/auth/sso/callback`**
6. Enter the [configuration](#configuration-options)
7. Optionally click Test next to **Issuer URL** to verify OIDC discovery
8. Click Create

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "OneLogin",
  "oidcConfig": {
    "issuerUrl": "https://your-domain.onelogin.com/oidc/2",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "scope": "openid email profile"
  },
  "emailDomains": ["company.com"],
  "allowAnyDomain": false,
  "trustEmailVerified": false,
  "defaultAssignedRoleIds": ["00000000-0000-0000-0000-000000000001"],
  "enabled": true
}'
```

### 自定义 OIDC {#custom-oidc}

Configure any OIDC-compliant 身份提供商 that is not covered by the templates above.

1. **Prerequisite**: 

    OpenID Connect web application in your 身份提供商 with the Authorization Code grant and client secret authentication. Discovery must be available at **`{issuer-url}/.well-known/openid-configuration`**
2. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
3. Click Create Provider
4. Select Custom OIDC
5. Copy the **Callback URI** and add it to the 身份提供商's allowed redirect URLs. The URI must match exactly: **`https://app.daytona.io/api/auth/sso/callback`**
6. Enter the [configuration](#configuration-options)
7. Optionally click Test next to **Issuer URL** to verify OIDC discovery
8. Click Create

Missing **`email`** fails with **`missing_email`**. Missing or false **`email_verified`** (when **Skip email verification check** is off) fails with **`email_not_verified`**.

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "Custom OIDC",
  "oidcConfig": {
    "issuerUrl": "https://your-idp.example.com",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "scope": "openid email profile"
  },
  "emailDomains": ["company.com"],
  "allowAnyDomain": false,
  "trustEmailVerified": false,
  "defaultAssignedRoleIds": ["00000000-0000-0000-0000-000000000001"],
  "enabled": true
}'
```

## Sign in with SSO {#sign-in-with-sso}

Share the organization SSO login URL with members. The URL is shown on the SSO page for each configured provider: **`https://app.daytona.io/api/auth/sso/org/ORGANIZATION_ID`**

When a user signs in through the organization's 身份提供商 for the first time:

- If no Daytona account exists for that email, Daytona creates the account and joins the user to the organization with the 身份提供商's **`defaultAssignedRoleIds`** (JIT provisioning)
- If a Daytona account already exists for that email, Daytona does not auto-link the SSO identity. The account owner must [confirm the link](#link-an-existing-account) from account settings

Subsequent sign-ins through a linked SSO identity also ensure organization membership.

## Link an existing account {#link-an-existing-account}

When SSO sign-in matches an existing Daytona account that is not yet linked to that IdP, Daytona creates a pending link request and redirects the user to account settings. The account owner must sign in with an existing method and confirm the request.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/user/account-settings)
2. Under **Single sign-on link requests**, review the pending request
3. Click Link this SSO to allow future sign-ins through that IdP, or Dismiss to reject it

Pending SSO link requests are separate from [linked accounts](/docs/linked-accounts) (Google and GitHub).

## List identity providers {#list-identity-providers}

List 身份提供商s for an organization.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

## Get identity provider {#get-identity-provider}

Get an 身份提供商 by ID.

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers/IDENTITY_PROVIDER_ID' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

## Update an identity provider {#update-an-identity-provider}

Update an 身份提供商's configuration.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
2. Open the actions menu on the provider row
3. Click Edit
4. Update the configuration and click Save Changes

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers/IDENTITY_PROVIDER_ID' \
  --request PATCH \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "Company Okta",
  "emailDomains": ["company.com"],
  "trustEmailVerified": false,
  "enabled": true
}'
```

## Delete an identity provider {#delete-an-identity-provider}

Delete an 身份提供商. Existing Daytona accounts remain, but users can no longer sign in through that IdP until it is reconfigured and linked again.

1. Go to [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sso)
2. Open the actions menu on the provider row
3. Click Delete
4. Confirm the deletion

```bash
curl 'https://app.daytona.io/api/organizations/ORGANIZATION_ID/identity-providers/IDENTITY_PROVIDER_ID' \
  --request DELETE \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

> 英文原文：https://www.daytona.io/docs/en/sso
> 本站位置：`/docs/sso`
