---
title: "1\\. Set up Yarn Configuration"
product: "stackgen"
sourcePath: "/docs/integrations/backstage-plugin"
sourceUrl: "https://docs.stackgen.com/docs/integrations/backstage-plugin"
status: "ok"
---

note

The instructions in this guide apply to both legacy and new Backstage backend systems. If you are using the new backend system, additional registration steps are required.

This guide walks Backstage administrators through the steps required to install and configure StackGen plugins within a Backstage application. It covers setting up the necessary `yarn` registry configuration, installing frontend and backend StackGen plugins, and applying essential configuration changes. It outlines the required frontend code updates and explains how to manage StackGen mappings that allow users to interact with appStacks effectively.

Recent updates

**v2026.7.11** shipped reliability and behavior fixes for the StackGen Backstage plugin based on customer-reported issues. Upgrade your `@stackgenhq/backstage-plugin-stackgen` and `@stackgenhq/backstage-plugin-stackgen-backend` packages to pick up those fixes. See [Backstage Plugin Reliability](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#backstage-plugin-reliability).

For self-service templates that scaffold code and provision infrastructure, see [Backstage Self-Service](/docs/stackgen/integrations/selfserve).

### 1\. Set up Yarn Configuration

First, the admin needs to set up the `yarn` configuration in the Backstage app to install the plugins.

The scope for the `stackgenhq` npm registry needs to be set in the Backstage app's `yarnrc.yml` file.

To configure the `REGISTRY_AUTH_TOKEN`, generate a classic **GitHub PAT token** with `read package` permission.

- GitHub requires an [access token to read public packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

`npmScopes` in your `yarnrc.yml`:

```bash
  stackgenhq:

    npmAuthToken: "${REGISTRY_AUTH_TOKEN}"

    npmRegistryServer: "https://npm.pkg.github.com"
```

### 2\. Install StackGen Plugins

After setting up the registry, the plugins can be installed using the following commands:

- Install the frontend plugin:





```bash
yarn --cwd packages/app add @stackgenhq/backstage-plugin-stackgen
```

- Install the backend plugin:





```bash
yarn --cwd packages/backend add @stackgenhq/backstage-plugin-stackgen-backend
```


### 3\. Configure Your Backend Plugin

#### 3.1 Register the StackGen backend plugin (New Backstage backend system) [](/docs/stackgen/integrations/backstage-plugin#31-register-the-stackgen-backend-plugin-new-backstage-backend-system%20%22Direct%20link%20to%203.1%20Register%20the%20StackGen%20backend%20plugin%20(New%20Backstage%20backend%20system)")

If your Backstage application uses the new backend system, you must explicitly register the StackGen backend plugin.

In your Backstage backend entry file: `packages/backend/src/index.ts` add this:

```yaml
// StackGen

backend.add(import('@stackgenhq/backstage-plugin-stackgen-backend'));
```

Without this registration, the StackGen backend plugin will not be loaded when using the new Backstage backend architecture.

#### 3.2 For the backend plugin, you need to add the following configuration:

```yaml
stackGen:

baseUrl: "${BACKSTAGE_ADAPTER_URL}"

apiToken: "${STACKGEN_PAT}"

allowedTeams: ""
```

- The `STACKGEN_PAT` can be retrieved from the [StackGen portal](/docs/stackgen/setup/pat).
- The `BACKSTAGE_ADAPTER_URL` will be provided by the StackGen team.
- `allowedTeams` is optional so by default, all the teams the `STACKGEN_PAT` has access will be available. Access can be restricted to a few teams by adding the team **UUIDs** to the `allowedTeams` list to restrict access to specific teams.

**Example** configuration for allowed teams

```bash
stackGen:

  baseUrl: "${BACKSTAGE_ADAPTER_URL}"

  apiToken: "${STACKGEN_PAT}"

  allowedTeams: "20f0e210-15ce-4d2c-9e29-0555bffee7bc,20f0e211-15ce-4d2c-9e29-0555bffee7bd"


```

### 4\. Modify Frontend Files

Once you’re done with the configuration, you’ll need to modify the following files in the backstage frontend app:

In the `/packages/app/src/App.tsx` file:

- Add the following to your imports:





```bash
import { StackGenPage } from '@stackgenhq/backstage-plugin-stackgen';
```

- Add the following in the routes:





```bash
<Route path="/stackgen" element={<StackGenPage />} />
```


In the `/packages/app/src/components/Root/Root.tsx` file:

- Add this to the file:





```bash
import { StackGenIcon } from '@stackgenhq/backstage-plugin-stackgen';
```

- Add the StackGen sidebar item:





```bash
<SidebarItem icon={StackGenIcon} to="stackgen" text="StackGen"/>
```


### 5\. Start the Backstage App

You can now start the Backstage app and configure the mappings so your teams can start using it. Mappings have type associations that map the Backstage component and the resource’s `spec.type` field with the StackGen resource type.

![Mapping](https://docs.stackgen.com/assets/images/mapping-backstage-4b0038bf41ad8fd89fccae2673e1c606.png)

![Create Mapping](https://docs.stackgen.com/assets/images/createbackstagemapping-7b7bf4049ca7845007adc1a518f25b52.png)

## Important Considerations

- **Default Mappings**: for cloud providers supported by StackGen will be available. These mappings can be edited, and you can add more type associations.

  - You cannot delete default mappings.
- **User-Generated Mappings**:

  - You can create additional mappings as required.
  - Your Backstage users can choose mappings while creating and updating an appStack. These mappings will be stored in the database that Backstage creates for each plugin.
  - Backstage users can also edit the mappings as required.
- If the Backstage app is using an in-memory database, the mappings will not persist across restarts.
