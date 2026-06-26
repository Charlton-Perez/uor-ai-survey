// Vercel serverless function — receives survey POST and appends a row to Google Sheets
// via a Google Apps Script web app acting as a webhook.
//
// Required environment variable: GOOGLE_SHEET_WEBHOOK_URL
// Set this in your Vercel project settings (Settings → Environment Variables).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('GOOGLE_SHEET_WEBHOOK_URL not configured')
    return res.status(500).json({ error: 'Survey backend not configured' })
  }

  try {
    const body = req.body

    // Flatten arrays to semicolon-separated strings for Google Sheets columns
    const flat = {
      submittedAt: body.submittedAt || new Date().toISOString(),
      role: body.role || '',
      school: body.school || '',
      currentTools: (body.currentTools || []).join('; '),
      frequency: body.frequency || '',
      researchUses: (body.researchUses || []).join('; '),
      researchDisclosure: body.researchDisclosure || '',
      researchDataConcern: body.researchDataConcern || '',
      teachingUses: (body.teachingUses || []).join('; '),
      teachingCategory: Array.isArray(body.teachingCategory) ? body.teachingCategory.join('; ') : (body.teachingCategory || ''),
      adminUses: (body.adminUses || []).join('; '),
      preferredTool: body.preferredTool || '',
      importantFeatures: (body.importantFeatures || []).join('; '),
      procurementUrgency: body.procurementUrgency || '',
      concerns: (body.concerns || []).join('; '),
      trainingNeeds: (body.trainingNeeds || []).join('; '),
      privacyConcernScale: body.privacyConcernScale || '',
      freeText: body.freeText || '',
    }

    // Send as GET with payload param — avoids Apps Script POST redirect issues
    const url = `${webhookUrl}?payload=${encodeURIComponent(JSON.stringify(flat))}`
    const upstream = await fetch(url, { method: 'GET' })

    if (!upstream.ok) {
      const text = await upstream.text()
      console.error('Webhook error:', upstream.status, text)
      return res.status(502).json({ error: 'Failed to store response' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('submit handler error:', err)
    return res.status(500).json({ error: 'Internal error' })
  }
}
