// Runs in GitHub Actions — fetches the Microsoft Forms Excel from OneDrive
// via Microsoft Graph API and writes public/data.json for the dashboard.
//
// Needs env vars: MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SHARE_URL

import * as XLSX from 'xlsx'
import { writeFileSync } from 'fs'

async function getToken() {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET } = process.env
  const res = await fetch(
    `https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: MS_CLIENT_ID,
        client_secret: MS_CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
      }),
    }
  )
  const json = await res.json()
  if (!json.access_token) throw new Error(`Token error: ${JSON.stringify(json)}`)
  return json.access_token
}

function encodeShareUrl(url) {
  const b64 = Buffer.from(url).toString('base64')
  return 'u!' + b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

async function main() {
  const { MS_SHARE_URL } = process.env
  if (!MS_SHARE_URL) throw new Error('MS_SHARE_URL not set')

  console.log('Fetching token...')
  const token = await getToken()

  console.log('Fetching Excel file from OneDrive...')
  const encoded = encodeShareUrl(MS_SHARE_URL)
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/shares/${encoded}/driveItem/content`,
    { headers: { Authorization: `Bearer ${token}` }, redirect: 'follow' }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Graph API error ${res.status}: ${text}`)
  }

  const buffer = await res.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array' })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

  const output = { rows, updatedAt: new Date().toISOString() }
  writeFileSync('public/data.json', JSON.stringify(output, null, 2))
  console.log(`Written ${rows.length} rows to public/data.json`)
}

main().catch(err => { console.error(err); process.exit(1) })
