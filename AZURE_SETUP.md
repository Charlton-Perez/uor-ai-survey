# Connecting the Dashboard to Microsoft Forms (Live Data)

This is a one-time setup. Once done, the dashboard at `/#dashboard` will always show live responses — just hit Refresh.

---

## Step 1 — Register an Azure app (15 minutes)

1. Go to https://portal.azure.com and sign in with your UoR account
2. Search for **"App registrations"** and click **New registration**
3. Name: `MPCS AI Survey Dashboard`
4. Supported account types: **Accounts in this organizational directory only**
5. Click **Register**
6. Copy and save the **Application (client) ID** → this is `MS_CLIENT_ID`
7. Copy and save the **Directory (tenant) ID** → this is `MS_TENANT_ID`

---

## Step 2 — Create a client secret

1. In your new app, go to **Certificates & secrets → Client secrets → New client secret**
2. Description: `dashboard`, Expires: **24 months**
3. Click **Add**
4. Copy the **Value** immediately (it disappears after you leave the page) → this is `MS_CLIENT_SECRET`

---

## Step 3 — Grant API permissions

1. Go to **API permissions → Add a permission → Microsoft Graph → Application permissions**
2. Search for and add: **`Files.Read.All`**
3. Click **Grant admin consent for University of Reading** (needs admin approval — if you can't do this, ask IT Services to grant consent for the app)

---

## Step 4 — Get the share URL for your Forms Excel file

1. Go to Microsoft Forms → your survey → **Responses** tab → **Open in Excel**
2. The Excel file opens in Excel Online — copy the URL from the browser address bar. It will look like:
   `https://universityofreading.sharepoint.com/:x:/r/personal/...`
3. Alternatively, find the file in **OneDrive** → right-click → **Share → Copy link** (set to "Anyone with link can view")
4. Either URL works → this is `MS_SHARE_URL`

---

## Step 5 — Add environment variables to Vercel

```bash
cd ~/Library/CloudStorage/OneDrive-UniversityofReading/dashboards/uor-ai-survey
vercel env add MS_TENANT_ID
vercel env add MS_CLIENT_ID
vercel env add MS_CLIENT_SECRET
vercel env add MS_SHARE_URL
```

Select **Production** for each when prompted.

Then redeploy:
```bash
vercel --prod
```

---

## Step 6 — Test it

Go to `https://your-dashboard.vercel.app/#dashboard` — you should see your live responses with a Refresh button.

---

## Note on admin consent

If your UoR account doesn't have Azure admin rights, you'll need to ask IT Services to grant admin consent for the `Files.Read.All` permission on the `MPCS AI Survey Dashboard` app. This is a read-only permission on a single file.
