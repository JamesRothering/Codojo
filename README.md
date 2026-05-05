# Codojo — marketing site + assessment app

Monorepo layout:

| Path | What it is |
|------|------------|
| `site/` | Static marketing site for **Azure Static Web Apps** (HTML + `api/` Functions) |
| `assess/` | **Next.js 15** interactive assessment (`/assessment`, `/api/lead`) — deploy separately (Azure App Service, Container Apps, etc.) |

## Local development

**Marketing site:** open `site/index.html` in a browser, or serve the folder:

```bash
cd site && python3 -m http.server 8080
```

**Assessment app:**

```bash
cd assess
npm install
npm run dev
# http://localhost:3000/assessment
```

## Linking the static “Assess” page to the Next.js app

After you deploy `assess/`, set the public base URL of that app.

1. Edit [`site/assess/assessment-app-config.js`](site/assess/assessment-app-config.js) and set the default:

   ```js
   window.CODOJO_ASSESS_APP_URL = window.CODOJO_ASSESS_APP_URL || "https://YOUR-ASSESS-APP.azurewebsites.net";
   ```

2. Or inject it only in production by adding **before** the config script in `site/assess/index.html`:

   ```html
   <script>window.CODOJO_ASSESS_APP_URL = "https://YOUR-ASSESS-APP.azurewebsites.net";</script>
   <script src="/assess/assessment-app-config.js"></script>
   ```

All elements with `data-codojo-assess-app` receive `href` → `{base}/assessment`.

## Deploy to Azure

- **Static site:** see [`docs/DEPLOY-AZURE.md`](docs/DEPLOY-AZURE.md) and [`.github/workflows/azure-static-web-app.yml`](.github/workflows/azure-static-web-app.yml).
- **Next.js app:** see [`assess/docs/DEPLOY-AZURE.md`](assess/docs/DEPLOY-AZURE.md).

You need **two** Azure resources (typical): one Static Web App for `site/`, one App Service (or container host) for `assess/`.

## GitHub

This folder is intended to be the **repository root** pushed to GitHub. Initialize and push:

```bash
cd /path/to/this/repo
git init
git add .
git commit -m "Initial import: Codojo site + assessment app"
git branch -M main
git remote add origin https://github.com/YOU/YOUR-REPO.git
git push -u origin main
```

After the Static Web App is created in Azure and connected to the repo, add the deployment token as `AZURE_STATIC_WEB_APPS_API_TOKEN` (see deploy doc).
