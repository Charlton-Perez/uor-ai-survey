import React, { useState, useCallback } from 'react'
import Papa from 'papaparse'
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
// MS Forms exports with the full question text as column header.
// We match by substring so minor wording differences don't break things.

function findCol(headers, ...terms) {
  return headers.find(h => terms.some(t => h.toLowerCase().includes(t.toLowerCase()))) || null
}

function parseMulti(val) {
  if (!val) return []
  return val.split(';').map(s => s.trim()).filter(Boolean)
}

function countValues(rows, col) {
  const counts = {}
  rows.forEach(r => {
    const vals = parseMulti(r[col])
    vals.forEach(v => { counts[v] = (counts[v] || 0) + 1 })
  })
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

function countSingle(rows, col) {
  const counts = {}
  rows.forEach(r => {
    const v = (r[col] || '').trim()
    if (v) counts[v] = (counts[v] || 0) + 1
  })
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

// ── Chart components ──────────────────────────────────────────────────────────

function HBar({ data, color = TEAL, total }) {
  if (!data.length) return <Empty />
  return (
    <ResponsiveContainer width="100%" height={Math.max(data.length * 36, 80)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 40, top: 4, bottom: 4 }}>
        <XAxis type="number" domain={[0, total || 'auto']} tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="name" width={220} tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => [`${v} response${v !== 1 ? 's' : ''}`, '']} />
        <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]}>
          {data.map((_, i) => <Cell key={i} fill={BLUES[i % BLUES.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

function Donut({ data }) {
  if (!data.length) return <Empty />
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="40%" cy="50%"
          innerRadius={55} outerRadius={95} paddingAngle={2} label={false}>
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
      padding: '1.25rem 1.5rem', textAlign: 'center', flex: 1, minWidth: 120,
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
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: NAVY, marginBottom: '0.5rem' }}>{label}</div>
      {children}
    </div>
  )
}

function Empty() {
  return <p style={{ color: '#aaa', fontSize: '0.85rem', fontStyle: 'italic' }}>No data for this question.</p>
}

// ── Upload screen ─────────────────────────────────────────────────────────────

function Uploader({ onData }) {
  const [dragging, setDragging] = useState(false)

  function handleFile(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => onData(result.data, result.meta.fields),
    })
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function onChange(e) {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }

  return (
    <div style={card}>
      <h1 style={{ fontSize: '1.4rem', color: NAVY, marginBottom: '0.5rem' }}>
        MPCS AI Survey — Response Dashboard
      </h1>
      <p style={{ color: '#4a5568', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Export responses from Microsoft Forms: <strong>Responses tab → Open in Excel → File → Save As → CSV</strong>.
        Then upload the CSV here.
      </p>

      <label
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          border: `2px dashed ${dragging ? TEAL : '#b0c4d8'}`,
          borderRadius: 8, padding: '3rem 2rem', cursor: 'pointer',
          background: dragging ? '#eef9fb' : '#f8fafc', transition: 'all 0.2s',
        }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
        <div style={{ fontWeight: 600, color: NAVY, marginBottom: '0.25rem' }}>
          Drop CSV file here or click to browse
        </div>
        <div style={{ fontSize: '0.8rem', color: '#718096' }}>Microsoft Forms CSV export</div>
        <input type="file" accept=".csv" onChange={onChange} style={{ display: 'none' }} />
      </label>
    </div>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [rows, setRows] = useState(null)
  const [headers, setHeaders] = useState([])

  function onData(data, fields) {
    setRows(data)
    setHeaders(fields || [])
  }

  if (!rows) return <Uploader onData={onData} />

  // Detect columns
  const colRole        = findCol(headers, 'role at UoR', 'describes your role')
  const colDept        = findCol(headers, 'Department', 'department')
  const colTools       = findCol(headers, 'tools do you currently use', 'AI or LLM tools')
  const colFreq        = findCol(headers, 'How often do you use')
  const colResearch    = findCol(headers, 'research uses', 'interested in or already doing')
  const colDisclosure  = findCol(headers, 'disclosure', 'confident are you')
  const colDataConcern = findCol(headers, 'data privacy', 'research data')
  const colTeachUses   = findCol(headers, 'teaching tasks')
  const colAssessment  = findCol(headers, 'assessment categories')
  const colAdmin       = findCol(headers, 'administrative tasks', 'admin')
  const colPrefTool    = findCol(headers, 'procure one additional', 'most valuable to you')
  const colFeatures    = findCol(headers, 'features matter', 'matter most')
  const colUrgency     = findCol(headers, 'urgently', 'urgency')
  const colConcerns    = findCol(headers, 'concerns do you have')
  const colTraining    = findCol(headers, 'training or support', 'Training')
  const colFreeText    = findCol(headers, 'anything else', 'free text', 'other comments')

  const n = rows.length
  const roleData  = countSingle(rows, colRole)
  const deptData  = countSingle(rows, colDept)
  const toolsData = countValues(rows, colTools)
  const freqData  = countSingle(rows, colFreq)

  const copilotUsers = rows.filter(r => (r[colTools] || '').includes('Copilot')).length
  const nonUsers     = rows.filter(r => (r[colTools] || '').toLowerCase().includes('none')).length

  const freeTexts = rows
    .map(r => (r[colFreeText] || '').trim())
    .filter(Boolean)

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: NAVY, marginBottom: '0.1rem' }}>MPCS AI Survey — Response Dashboard</h1>
          <p style={{ color: '#718096', fontSize: '0.85rem' }}>{n} response{n !== 1 ? 's' : ''} loaded</p>
        </div>
        <button onClick={() => setRows(null)} style={{
          background: 'transparent', border: `1px solid ${NAVY}`, color: NAVY,
          borderRadius: 6, padding: '0.4rem 1rem', fontSize: '0.85rem', cursor: 'pointer',
        }}>Upload new CSV</button>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <StatCard label="Total responses" value={n} />
        <StatCard label="Use Microsoft Copilot" value={copilotUsers} sub={n ? `${Math.round(copilotUsers/n*100)}% of respondents` : ''} />
        <StatCard label="Don't use AI tools" value={nonUsers} sub={n ? `${Math.round(nonUsers/n*100)}% of respondents` : ''} />
        <StatCard label="Departments" value={deptData.length} sub="represented" />
      </div>

      {/* About respondents */}
      <Section title="About Respondents">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <ChartBlock label="Role">
            <Donut data={roleData} />
          </ChartBlock>
          <ChartBlock label="Department">
            <Donut data={deptData} />
          </ChartBlock>
        </div>
      </Section>

      {/* Current AI use */}
      <Section title="Current AI / LLM Use">
        <ChartBlock label="Tools currently used (multiple selections allowed)">
          <HBar data={toolsData} total={n} />
        </ChartBlock>
        <ChartBlock label="Frequency of use">
          <HBar data={freqData} total={n} color={TEAL} />
        </ChartBlock>
      </Section>

      {/* Research */}
      {colResearch && (
        <Section title="Research Uses">
          <ChartBlock label="Research tasks of interest (multiple selections allowed)">
            <HBar data={countValues(rows, colResearch)} total={n} />
          </ChartBlock>
          {colDisclosure && (
            <ChartBlock label="Confidence about AI disclosure requirements">
              <HBar data={countSingle(rows, colDisclosure)} total={n} color={TEAL} />
            </ChartBlock>
          )}
          {colDataConcern && (
            <ChartBlock label="Concern about data privacy with research data (1–5 scale)">
              <HBar data={countSingle(rows, colDataConcern)} total={n} />
            </ChartBlock>
          )}
        </Section>
      )}

      {/* Teaching */}
      {colTeachUses && (
        <Section title="Teaching Uses">
          <ChartBlock label="Teaching tasks of interest (multiple selections allowed)">
            <HBar data={countValues(rows, colTeachUses)} total={n} />
          </ChartBlock>
          {colAssessment && (
            <ChartBlock label="Assessment categories currently used (multiple selections allowed)">
              <HBar data={countValues(rows, colAssessment)} total={n} color={TEAL} />
            </ChartBlock>
          )}
        </Section>
      )}

      {/* Admin */}
      {colAdmin && (
        <Section title="Professional & Administrative Tasks">
          <ChartBlock label="Admin tasks wanted (multiple selections allowed)">
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
          <ChartBlock label="Most important features (multiple selections allowed)">
            <HBar data={countValues(rows, colFeatures)} total={n} color={TEAL} />
          </ChartBlock>
        )}
        {colUrgency && (
          <ChartBlock label="Procurement urgency">
            <HBar data={countSingle(rows, colUrgency)} total={n} />
          </ChartBlock>
        )}
      </Section>

      {/* Concerns & support */}
      <Section title="Concerns & Support Needs">
        {colConcerns && (
          <ChartBlock label="Concerns about LLM use (multiple selections allowed)">
            <HBar data={countValues(rows, colConcerns)} total={n} />
          </ChartBlock>
        )}
        {colTraining && (
          <ChartBlock label="Training and support needs (multiple selections allowed)">
            <HBar data={countValues(rows, colTraining)} total={n} color={TEAL} />
          </ChartBlock>
        )}
      </Section>

      {/* Free text */}
      {freeTexts.length > 0 && (
        <Section title={`Open Comments (${freeTexts.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {freeTexts.map((t, i) => (
              <div key={i} style={{
                background: '#f0f4f8', borderLeft: `4px solid ${GOLD}`,
                borderRadius: '0 6px 6px 0', padding: '0.6rem 1rem',
                fontSize: '0.88rem', color: '#2d3748',
              }}>
                {t}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
