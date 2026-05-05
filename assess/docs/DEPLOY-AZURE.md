# Deploy the Next.js assessment app (`assess/`) to Azure

This app serves **`/assessment`** and **`POST /api/lead`**. It must run as a **Node** workload (Azure App Service, Container Apps, or a VM)—not as a Static Web App alone.

## Option A — Azure App Service (GitHub, recommended for a quick test)

1. Azure Portal → **Create** → **Web App**.
2. **Runtime stack:** Node **20 LTS** (or 22 if available in your region).
3. **Deployment Center** → **GitHub** → this repo, branch `main`.
4. Set **Application settings** (Configuration):
   - `WEBSITE_NODE_DEFAULT_VERSION` = `~20` (or the stack you chose)
5. **Project path / repository settings:** set the application root to **`assess`** (wording varies: “Project path”, “Startup command directory”, or use **Deployment Center → Application path** = `assess`).

   If your UI only offers a startup command, use:

   ```bash
   cd assess && npm install && npm run build && npm start
   ```

   Prefer **Oryx** / **GitHub Actions** builds so `node_modules` is produced on the build agent.

6. **Startup Command** (if required):

   ```bash
   cd assess && npm start
   ```

7. After deploy, open:

   `https://<your-webapp>.azurewebsites.net/assessment`

8. Copy that origin (no trailing slash) into [`site/assess/assessment-app-config.js`](../../site/assess/assessment-app-config.js) as `CODOJO_ASSESS_APP_URL` so the static marketing site links to this app.

## Option B — GitHub Actions + publish profile

Add secrets to the repo:

- `AZURE_WEBAPP_NAME` — Web App name  
- `AZURE_WEBAPP_PUBLISH_PROFILE` — contents of the downloaded `.PublishSettings` file  

Use or extend [`.github/workflows/assess-azure-webapp.yml`](../../.github/workflows/assess-azure-webapp.yml) (enable it after secrets exist).

## Local production check

```bash
cd assess
npm ci
npm run build
npm start
```

Visit `http://localhost:3000/assessment`.

## Note on `output: "standalone"`

[`next.config.ts`](../next.config.ts) enables **`standalone`** output for smaller container images. **`npm start`** / **`next start`** still work for App Service builds that use the standard `.next` output.
