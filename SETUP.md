# Survey Setup Guide

## Step 1 — Create the Google Sheet webhook (5 minutes)

This stores every survey response as a row in a Google Sheet you own.

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet called **"UoR AI Survey Responses"**.
2. Open **Extensions → Apps Script**.
3. Replace the default code with the script below, then click **Save** (Ctrl/Cmd + S).
4. Click **Deploy → New deployment**. Set type to **Web app**, execute as **Me**, allow access to **Anyone**. Click **Deploy**.
5. Copy the **Web app URL** — you'll need it in Step 2.

### Apps Script code

```javascript
const SHEET_NAME = 'Responses';

const COLUMNS = [
  'Submitted At', 'Role', 'Department',
  'Current Tools', 'Frequency',
  'Research Uses', 'Disclosure Confidence', 'Research Data Concern (1–5)',
  'Teaching Uses', 'Assessment Categories',
  'Admin Uses',
  'Preferred Tool', 'Important Features', 'Procurement Urgency',
  'Concerns', 'Training Needs', 'Privacy Concern Scale',
  'Free Text Comments'
];

function doGet(e) {
  try {
    const data = JSON.parse(decodeURIComponent(e.parameter.payload));
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(COLUMNS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      data.submittedAt, data.role, data.school,
      data.currentTools, data.frequency,
      data.researchUses, data.researchDisclosure, data.researchDataConcern,
      data.teachingUses, data.teachingCategory,
      data.adminUses,
      data.preferredTool, data.importantFeatures, data.procurementUrgency,
      data.concerns, data.trainingNeeds, data.privacyConcernScale,
      data.freeText
    ]);
    return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
  } catch(err) {
    return ContentService.createTextOutput('error: ' + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

---

## Step 2 — Deploy the survey to Vercel

```bash
cd survey
npm install
npx vercel --prod
```

When Vercel prompts you, set up a new project. After deploy:

1. Go to your Vercel project dashboard → **Settings → Environment Variables**.
2. Add a variable:
   - **Name:** `GOOGLE_SHEET_WEBHOOK_URL`
   - **Value:** the Apps Script Web app URL from Step 1
3. Redeploy once (or push a commit) so the environment variable takes effect.

---

## Step 3 — Share the survey

Send staff the Vercel URL (e.g. `https://uor-ai-survey.vercel.app`).

---

## Reviewing responses

Open your Google Sheet. Each row is one submission. You can:
- Use **Data → Pivot table** for quick summaries.
- Download as `.xlsx` for a more detailed analysis.
- Use Google Sheets charts to visualise distributions for your report.
