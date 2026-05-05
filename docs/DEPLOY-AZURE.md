# Deploy the marketing site (`site/`) to Azure Static Web Apps

The HTML site and the `/api/notify` Azure Function live under **`site/`**. In this monorepo, GitHub Actions must use **`app_location: site`** and **`api_location: site/api`**.

## One-time: create the Static Web App

1. Azure Portal → **Create a resource** → **Static Web App**.
2. **Deployment source:** GitHub → pick this repository and branch `main`.
3. **Build presets:** Custom
   - **App location:** `site`
   - **Api location:** `site/api`
   - **Output location:** *(leave empty)*

Azure will add a workflow file to the repo (or merge with [`.github/workflows/azure-static-web-app.yml`](../.github/workflows/azure-static-web-app.yml)).

## GitHub secret

In the Static Web App → **Manage deployment token** → copy the token.

In GitHub: **Repo → Settings → Secrets and variables → Actions** → add:

- `AZURE_STATIC_WEB_APPS_API_TOKEN` — paste the deployment token.

If Azure generated its own workflow, it may use a secret name like `AZURE_STATIC_WEB_APPS_API_TOKEN_<RANDOM>`. Either rename to match the workflow or update the workflow to use your secret name.

## Custom domain

See the original notes in [`site/DEPLOY.md`](../site/DEPLOY.md) (DNS, SSL, `codojo.me`).

## Assessment app URL

After the Next.js app is deployed (see [`assess/docs/DEPLOY-AZURE.md`](../assess/docs/DEPLOY-AZURE.md)), set `window.CODOJO_ASSESS_APP_URL` in [`site/assess/assessment-app-config.js`](../site/assess/assessment-app-config.js) so the **Start the live assessment** links resolve to that host.
