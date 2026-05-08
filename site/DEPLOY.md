# Codojo Site — Deployment Guide for Cursor / Azure

This folder is **`site/`** inside the monorepo. The GitHub/Azure root is one level up; Static Web Apps **`app_location`** must be **`site`** (see repo [`docs/DEPLOY-AZURE.md`](../docs/DEPLOY-AZURE.md)).

## Directory Structure

```
site/                   ← this folder (deploy this path to Azure SWA)
├── staticwebapp.config.json
├── index.html          ← Homepage
├── work/
│   └── index.html      ← Case Studies
├── about/
│   └── index.html      ← About James
├── contact/
│   └── index.html      ← Contact
├── assess/
│   └── index.html      ← Assessment Tools splash
└── api/
    └── notify/
        ├── index.js    ← Azure Function stub (notify email capture)
        └── function.json
```

## Deploy to Azure Static Web Apps

### Option A — GitHub Actions (recommended)
1. Push this folder to a GitHub repo (e.g. `codojo-site`)
2. In Azure Portal → Create → Static Web App
3. Connect to your GitHub repo, branch: `main`
4. App location: `/`  |  API location: `api`  |  Output: leave blank
5. Azure auto-generates a GitHub Actions workflow — done.
6. Point `codojo.me` DNS → the Azure-provided URL (CNAME record)

### Option B — Azure CLI direct deploy
```bash
az staticwebapp create \
  --name codojo \
  --resource-group codojo-rg \
  --source . \
  --location "westus2" \
  --branch main \
  --login-with-github
```

## Activate the /api/notify Email Capture

The assess page POSTs to `/api/notify`. The stub returns 200 immediately.
To wire it to a real list:

### Quickest path — Azure Table Storage
```bash
# 1. Create a storage account
az storage account create --name codojonotify --resource-group codojo-rg --sku Standard_LRS

# 2. Add connection string to Function App settings
az functionapp config appsettings set \
  --name codojo \
  --resource-group codojo-rg \
  --settings "STORAGE_CONNECTION=<your-connection-string>"

# 3. In api/notify/index.js, replace the TODO with:
#    const { TableClient } = require("@azure/data-tables");
#    const client = TableClient.fromConnectionString(process.env.STORAGE_CONNECTION, "notifysignups");
#    await client.createEntity({ partitionKey: "signups", rowKey: Date.now().toString(), email });
```

### Alternative — SendGrid
```bash
# Set key
az functionapp config appsettings set \
  --name codojo --resource-group codojo-rg \
  --settings "SENDGRID_API_KEY=<your-key>"

# In api/notify/index.js replace TODO with:
#    const sgMail = require('@sendgrid/mail');
#    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
#    await sgMail.send({ to: 'james.rothering.codojo@gmail.com', from: 'notify@codojo.me', subject: 'New assessment signup', text: email });
```

## Custom Domain (codojo.me)
1. Azure Portal → your Static Web App → Custom Domains → Add
2. Add both `codojo.me` and `www.codojo.me`
3. Azure gives you a TXT record to verify ownership → add to your DNS
4. Azure provisions the SSL cert automatically

## Notes
- All HTML files are self-contained (logo is base64-embedded, no external image deps)
- Google Fonts load from CDN — works offline via browser cache after first load
- Nav links use explicit paths (`/work/index.html`, etc.). `staticwebapp.config.json` sets API runtime and headers only — no SPA-style 404→home rewrite (that made every miss look like one page).
