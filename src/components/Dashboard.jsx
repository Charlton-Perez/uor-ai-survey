import React, { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts'
import { card, sectionTitle } from '../styles.js'

const NAVY  = '#003366'
const TEAL  = '#006e7f'
const GOLD  = '#c9a84c'
const BLUES = ['#003366','#1a5276','#006e7f','#148f77','#1a7f5a','#1d8348','#2e86c1','#2874a6','#7fb3d3','#a9cce3']

// ── Column detection ──────────────────────────────────────────────────────────

function findCol(headers, ...terms) {
  return headers.find(h => terms.some(t => h.toLowerCase().includes(t.toLowerCase()))) || null
}

function parseMulti(val) {
  if (!val) return []
  return String(val).split(';').map(s => s.trim()).filter(Boolean)
}

function countValues(rows, col) {
  if (!col) return []
  const counts = {}
  rows.forEach(r => {
    parseMulti(r[col]).forEach(v => { counts[v] = (counts[v] || 0) + 1 })
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

function countSingle(rows, col) {
  if (!col) return []
  const counts = {}
  rows.forEach(r => {
    const v = String(r[col] || '').trim()
    if (v) counts[v] = (counts[v] || 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

// ── Charts ────────────────────────────────────────────────────────────────────

function HBar({ data, total }) {
  if (!data || !data.length) return <Empty />
  return (
    <ResponsiveContainer width="100%" height={Math.max(data.length * 38, 80)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 48, top: 4, bottom: 4 }}>
        <XAxis type="number" domain={[0, total || 'auto']} tick={{ fontSize: 11 }} allowDecimals={false} />
        <YAxis type="category" dataKey="name" width={230} tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => [`${v} response${v !== 1 ? 's' : ''}`, '']} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: 'right', fontSize: 11 }}>
          {data.map((_, i) => <Cell key={i} fill={BLUES[i % BLUES.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

function Donut({ data }) {
  if (!data || !data.length) return <Empty />
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="40%" cy="50%"
          innerRadius={50} outerRadius={90} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={BLUES[i % BLUES.length]} />)}
        </Pie>
        <Legend layout="vertical" align="right" verticalAlign="middle"
          formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>} />
        <Tooltip formatter={(v) => [`${v} response${v !== 1 ? 's' : ''}`, '']} />
      </PieChart>
    </ResponsiveContainer>
  )
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{
      background: NAVY, color: '#fff', borderRadius: 8,
      padding: '1.25rem 1.5rem', textAlign: 'center', flex: 1, minWidth: 130,
    }}>
      <div style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.85rem', marginTop: 4, opacity: 0.85 }}>{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', marginTop: 2, opacity: 0.6 }}>{sub}</div>}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ ...card, marginBottom: '1.5rem' }}>
      <h2 style={{ ...sectionTitle, marginBottom: '1.25rem', borderBottom: `3px solid ${GOLD}`, paddingBottom: '0.5rem' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function ChartBlock({ label, children }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: NAVY, marginBottom: '0.5rem' }}>{label}</div>
      {children}
    </div>
  )
}

function Empty() {
  return <p style={{ color: '#aaa', fontSize: '0.85rem', fontStyle: 'italic' }}>No data yet.</p>
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [rows, setRows]           = useState(null)
  const [headers, setHeaders]     = useState([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/data')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || `Server error ${res.status}`)
      setRows(json.rows)
      setHeaders(json.rows.length ? Object.keys(json.rows[0]) : [])
      setUpdatedAt(json.updatedAt)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  // ── Loading / error states ───────────────────────────────────────────────

  if (loading && !rows) {
    return (
      <div style={{ ...card, textAlign: 'center', padding: '4rem' }}>
        <div style={{ fontSize: '1.5rem', color: NAVY, marginBottom: '0.5rem' }}>Loading responses…</div>
        <div style={{ color: '#718096', fontSize: '0.9rem' }}>Fetching live data from Microsoft Forms</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={card}>
        <h2 style={{ color: '#c62828', marginBottom: '0.5rem' }}>Could not load data</h2>
        <p style={{ color: '#4a5568', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>
        <p style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Make sure the four Microsoft Graph environment variables are set in Vercel:
          <code style={{ display: 'block', background: '#f0f4f8', padding: '0.5rem 0.75rem', borderRadius: 4, marginTop: '0.5rem', fontSize: '0.82rem' }}>
            MS_TENANT_ID · MS_CLIENT_ID · MS_CLIENT_SECRET · MS_SHARE_URL
          </code>
        </p>
        <button onClick={fetchData} style={{
          background: NAVY, color: '#fff', border: 'none',
          borderRadius: 6, padding: '0.5rem 1.25rem', cursor: 'pointer', fontSize: '0.9rem',
        }}>Try again</button>
      </div>
    )
  }

  if (!rows) return null

  // ── Column detection ─────────────────────────────────────────────────────

  const colRole        = findCol(headers, 'describes your role', 'role at UoR')
  const colDept        = findCol(headers, 'Department', 'department')
  const colTools       = findCol(headers, 'tools do you currently use', 'AI or LLM tools')
  const colFreq        = findCol(headers, 'How often do you use')
  const colResearch    = findCol(headers, 'research uses', 'already doing')
  const colDisclosure  = findCol(headers, 'disclosure', 'confident are you')
  const colDataConcern = findCol(headers, 'data privacy', 'research data')
  const colTeachUses   = findCol(headers, 'teaching tasks')
  const colAssessment  = findCol(headers, 'assessment categories')
  const colAdmin       = findCol(headers, 'administrative tasks', 'admin tasks')
  const colPrefTool    = findCol(headers, 'procure one additional', 'most valuable to you')
  const colFeatures    = findCol(headers, 'features matter', 'matter most')
  const colUrgency     = findCol(headers, 'urgently', 'urgency')
  const colConcerns    = findCol(headers, 'concerns do you have')
  const colTraining    = findCol(headers, 'training or support', 'Training')
  const colFreeText    = findCol(headers, 'anything else', 'other comments')

  const n            = rows.length
  const copilotCount = rows.filter(r => String(r[colTools] || '').includes('Copilot')).length
  const nonUserCount = rows.filter(r => String(r[colTools] || '').toLowerCase().includes('none')).length
  const freeTexts    = rows.map(r => String(r[colFreeText] || '').trim()).filter(Boolean)

  return (
    <div>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', color: NAVY, marginBottom: '0.2rem' }}>MPCS AI Survey — Live Dashboard</h1>
          <p style={{ color: '#718096', fontSize: '0.82rem' }}>
            {n} response{n !== 1 ? 's' : ''} · Last refreshed {updatedAt ? new Date(updatedAt).toLocaleTimeString('en-GB') : '—'}
          </p>
        </div>
        <button onClick={fetchData} disabled={loading} style={{
          background: loading ? '#a0aec0' : NAVY, color: '#fff', border: 'none',
          borderRadius: 6, padding: '0.5rem 1.25rem', cursor: loading ? 'default' : 'pointer', fontSize: '0.88rem',
        }}>
          {loading ? 'Refreshing…' : '↻ Refresh'}
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <StatCard label="Total responses" value={n} />
        <StatCard label="Use Microsoft Copilot" value={copilotCount}
          sub={n ? `${Math.round(copilotCount / n * 100)}% of respondents` : ''} />
        <StatCard label="Don't use AI tools" value={nonUserCount}
          sub={n ? `${Math.round(nonUserCount / n * 100)}% of respondents` : ''} />
        <StatCard label="Open comments" value={freeTexts.length} />
      </div>

      {/* About respondents */}
      <Section title="About Respondents">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <ChartBlock label="Role"><Donut data={countSingle(rows, colRole)} /></ChartBlock>
          <ChartBlock label="Department"><Donut data={countSingle(rows, colDept)} /></ChartBlock>
        </div>
      </Section>

      {/* Current use */}
      <Section title="Current AI / LLM Use">
        <ChartBlock label="Tools currently used (multiple selections allowed)">
          <HBar data={countValues(rows, colTools)} total={n} />
        </ChartBlock>
        <ChartBlock label="Frequency of use">
          <HBar data={countSingle(rows, colFreq)} total={n} />
        </ChartBlock>
      </Section>

      {/* Research */}
      {colResearch && (
        <Section title="Research Uses">
          <ChartBlock label="Research tasks of interest">
            <HBar data={countValues(rows, colResearch)} total={n} />
          </ChartBlock>
          {colDisclosure && (
            <ChartBlock label="Confidence about disclosure requirements">
              <HBar data={countSingle(rows, colDisclosure)} total={n} />
            </ChartBlock>
          )}
          {colDataConcern && (
            <ChartBlock label="Concern about data privacy with research data (1–5)">
              <HBar data={countSingle(rows, colDataConcern)} total={n} />
            </ChartBlock>
          )}
        </Section>
      )}

      {/* Teaching */}
      {colTeachUses && (
        <Section title="Teaching Uses">
          <ChartBlock label="Teaching tasks of interest">
            <HBar data={countValues(rows, colTeachUses)} total={n} />
          </ChartBlock>
          {colAssessment && (
            <ChartBlock label="Assessment categories currently used">
              <HBar data={countValues(rows, colAssessment)} total={n} />
            </ChartBlock>
          )}
        </Section>
      )}

      {/* Admin */}
      {colAdmin && (
        <Section title="Professional & Administrative Tasks">
          <ChartBlock label="Admin tasks wanted">
            <HBar data={countValues(rows, colAdmin)} total={n} />
          </ChartBlock>
        </Section>
      )}

      {/* LLM preferences */}
      <Section title="LLM Service Preferences">
        {colPrefTool && (
          <ChartBlock label="Preferred tool to procure">
            <HBar data={countSingle(rows, colPrefTool)} total={n} />
          </ChartBlock>
        )}
        {colFeatures && (
          <ChartBlock label="Most important features (up to 4 selections)">
            <HBar data={countValues(rows, colFeatures)} total={n} />
          </ChartBlock>
        )}
        {colUrgency && (
          <ChartBlock label="Procurement urgency">
            <HBar data={countSingle(rows, colUrgency)} total={n} />
          </ChartBlock>
        )}
      </Section>

      {/* Concerns */}
      <Section title="Concerns & Support Needs">
        {colConcerns && (
          <ChartBlock label="Concerns about LLM use">
            <HBar data={countValues(rows, colConcerns)} total={n} />
          </ChartBlock>
        )}
        {colTraining && (
          <ChartBlock label="Training and support needs">
            <HBar data={countValues(rows, colTraining)} total={n} />
          </ChartBlock>
        )}
      </Section>

      {/* Free text */}
      {freeTexts.length > 0 && (
        <Section title={`Open Comments (${freeTexts.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {freeTexts.map((t, i) => (
              <div key={i} style={{
                background: '#f0f4f8', borderLeft: `4px solid ${GOLD}`,
                borderRadius: '0 6px 6px 0', padding: '0.6rem 1rem',
                fontSize: '0.88rem', color: '#2d3748',
              }}>{t}</div>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
