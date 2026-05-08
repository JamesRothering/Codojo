# Deploy the marketing site (`site/`) to Azure Static Web Apps

The HTML site and the `/api/notify` Azure Function live under **`site/`**. GitHub Actions must use **`app_location: site`** and **`api_location: site/api`**.

Your repo default branch may be **`master`** or **`main`** — pick the one you actually use in the Azure wizard (this repo’s workflow runs on **both**).

---

## Path A — Recommended: create the Static Web App in Azure Portal (GitHub deploy)

Do these once, in order.

### 1. Azure Portal

1. Open [Azure Portal](https://portal.azure.com) → **Create a resource**.
2. Search **Static Web App** → **Create**.
3. **Basics**
   - **Subscription** and **Resource group** (e.g. new group `codojo-rg`).
   - **Name** e.g. `codojo-web`.
   - **Plan type:** **Free** is enough to start.
   - **Region** e.g. **West US 2**.
4. **Deployment details**
   - **Source:** **GitHub**.
   - **Sign in** with GitHub and authorize Azure (install the Azure GitHub App if prompted).
   - **Organization:** your GitHub user (e.g. `JamesRothering`).
   - **Repository:** **Codojo**.
   - **Branch:** **`master`** (or **`main`** if that is your default).

### 2. Build configuration (critical)

Choose **Custom** (not a framework preset) and set:

| Field | Value |
|--------|--------|
| **App location** | `site` |
| **Api location** | `site/api` |
| **Output location** | *(leave **empty**)* |

### 3. Finish creation

**Review + create** → **Create**. Wait until deployment finishes.

### 4. GitHub: workflow + secret (pick one approach)

**What Azure usually does:** it commits a **new** workflow under `.github/workflows/` and adds a repo secret whose name looks like `AZURE_STATIC_WEB_APPS_API_TOKEN_<random>`.

**Option 1 — Easiest:** use **whatever workflow and secret Azure created**.  
- Go to **GitHub → Actions** and confirm a run starts and turns **green**.  
- Your site URL is on the Static Web App **Overview** in Azure (ends with `.azurestaticapps.net`).

**Option 2 — Use this repo’s workflow:** [`.github/workflows/azure-static-web-app.yml`](../.github/workflows/azure-static-web-app.yml) must reference the **same** repository secret name that exists under **Settings → Secrets → Actions**. For the current Codojo Static Web App integration that name is:

`AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_BUSH_05288E01E`

If you recreate the app or reconnect GitHub, Azure may create a **new** suffixed name — copy it from GitHub’s secrets list and update the workflow `secrets.*` references to match.

1. Azure Portal → your Static Web App → **Manage deployment token** → copy the token.
2. GitHub → **Codojo** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** (or edit the existing one).
   - Name: **`AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_BUSH_05288E01E`** (must match the workflow file)
   - Value: paste the token.
3. If Azure added a **second** workflow file that duplicates deploy logic, you can disable one of the workflows in GitHub (**Actions** → workflow → **…** → disable) to avoid double deploys, or delete the extra workflow in a follow-up PR.

### 5. Trigger or verify deploy

- **GitHub → Actions** → open **Azure Static Web Apps CI/CD** (or the workflow Azure added) → latest run should be **success**.
- Open the **URL** from Azure Overview; test `/`, `/assess/`, `/contact/`.

### 6. Assessment links (after Next.js is hosted)

When the **`assess/`** app has a public URL, set it in [`site/assess/assessment-app-config.js`](../site/assess/assessment-app-config.js) (no trailing slash), commit, and push — the Static Web App will redeploy.

Full Next.js deploy notes: [`assess/docs/DEPLOY-AZURE.md`](../assess/docs/DEPLOY-AZURE.md).

---

## Custom domain

See [`site/DEPLOY.md`](../site/DEPLOY.md) (DNS, SSL, `codojo.me`).

---

## Troubleshooting

- **Action fails on “deployment_token was not provided” / secret missing:** the Actions secret name must match `secrets.*` in [`.github/workflows/azure-static-web-app.yml`](../.github/workflows/azure-static-web-app.yml) (currently `AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_BUSH_05288E01E`). Fork PRs also see an empty token — deploy from a branch on this repo or use `workflow_dispatch`.
- **Wrong site root (404 or old layout):** in Azure → **Configuration** (or redeploy wizard), confirm **app location** is **`site`**, not `/` or `.`.
- **`/api/notify` 404:** confirm **api location** is **`site/api`** and the workflow’s `api_location` matches.
