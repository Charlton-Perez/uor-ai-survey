// Fetches the Microsoft Forms response Excel file from OneDrive via Microsoft Graph API
// and returns rows as JSON.
//
// Required Vercel environment variables:
//   MS_TENANT_ID      — your University Azure tenant ID
//   MS_CLIENT_ID      — Azure app client ID
//   MS_CLIENT_SECRET  — Azure app client secret
//   MS_SHARE_URL      — OneDrive "Anyone with link" share URL for the Forms Excel file

import * as XLSX from 'xlsx'

async function getToken(tenantId, clientId, clientSecret) {
  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
      }),
    }
  )
  const json = await res.json()
  if (!json.access_token) throw new Error(`Token error: ${JSON.stringify(json)}`)
  return json.access_token
}

function encodeShareUrl(url) {
  // Graph API expects u! + base64url(url)
  const b64 = Buffer.from(url).toString('base64')
  return 'u!' + b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export default async function handler(req, res) {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SHARE_URL } = process.env

  if (!MS_TENANT_ID || !MS_CLIENT_ID || !MS_CLIENT_SECRET || !MS_SHARE_URL) {
    console.error('Missing Microsoft Graph env vars')
    return res.status(500).json({ error: 'Microsoft Graph not configured — check Vercel env vars' })
  }

  try {
    const token = await getToken(MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET)

    const encoded = encodeShareUrl(MS_SHARE_URL)
    const fileRes = await fetch(
      `https://graph.microsoft.com/v1.0/shares/${encoded}/driveItem/content`,
      { headers: { Authorization: `Bearer ${token}` }, redirect: 'follow' }
    )

    if (!fileRes.ok) {
      const text = await fileRes.text()
      console.error('Graph API file fetch error:', fileRes.status, text)
      return res.status(502).json({ error: `Graph API error ${fileRes.status}` })
    }

    const buffer = await fileRes.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

    // Cache for 60s so repeated dashboard opens don't hammer Graph API
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({ rows, updatedAt: new Date().toISOString() })
  } catch (err) {
    console.error('data handler error:', err)
    return res.status(500).json({ error: err.message })
  }
}
