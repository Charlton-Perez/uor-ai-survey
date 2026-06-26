import React, { useState } from 'react'
import { card, btn, btnSecondary, fieldset, legend, hint, label, input, textarea, sectionTitle, sectionSubtitle } from '../styles.js'

const SECTIONS = ['About You', 'Current AI Use', 'Research', 'Teaching', 'Professional Tasks', 'LLM Services', 'Support & Concerns']

const SCHOOLS = [
  'Agriculture, Policy and Development',
  'Archaeology, Geography and Environmental Science',
  'Arts and Communication Design',
  'Biological Sciences',
  'Built Environment',
  'Business',
  'Chemistry, Food and Pharmacy',
  'Construction Management and Engineering',
  'Education',
  'English Language and Applied Linguistics',
  'Film, Theatre and Television',
  'Health Sciences',
  'History, Philosophy and Social Sciences (SHLCS)',
  'Institute of Education',
  'Law',
  'Literature and Languages',
  'Mathematics and Statistics',
  'Meteorology',
  'Politics, Economics and International Relations',
  'Psychology and Clinical Language Sciences',
  'Systems Engineering',
  'Typography and Graphic Communication',
  'Professional Services',
  'Library',
  'Other / Prefer not to say',
]

const LLM_TOOLS = [
  'Microsoft Copilot Chat (University-approved)',
  'ChatGPT (personal/free account)',
  'ChatGPT Plus/Team/Enterprise',
  'Claude (Anthropic)',
  'Google Gemini',
  'GitHub Copilot (coding)',
  'Grammarly or similar writing tools',
  'Domain-specific AI tools (e.g. Elicit, Research Rabbit, SciSpace)',
  'Other',
  'None — I do not currently use AI/LLM tools',
]

const RESEARCH_USES = [
  { id: 'lit_review', label: 'Literature searching and summarisation' },
  { id: 'writing', label: 'Drafting or improving research writing (papers, grant bids, reports)' },
  { id: 'data_analysis', label: 'Data analysis, interpretation or visualisation' },
  { id: 'code_gen', label: 'Code generation or debugging' },
  { id: 'ideation', label: 'Research ideation, brainstorming or hypothesis generation' },
  { id: 'peer_review', label: 'Reviewing manuscripts or grant applications' },
  { id: 'translation', label: 'Translation or language editing' },
  { id: 'ai_as_method', label: 'AI as a core research method or component (e.g. NLP, computer vision, AI models in analysis)' },
  { id: 'other_research', label: 'Other research use' },
]

const TEACHING_USES = [
  { id: 'lesson_plan', label: 'Lesson planning and curriculum design' },
  { id: 'content_creation', label: 'Creating teaching materials, slides or handouts' },
  { id: 'feedback', label: 'Drafting or personalising student feedback' },
  { id: 'marking_support', label: 'Supporting marking (e.g. rubric application, consistency checking)' },
  { id: 'accessibility', label: 'Accessibility (e.g. generating transcripts, alternative formats)' },
  { id: 'ai_literacy', label: 'Teaching students about AI literacy and responsible use' },
  { id: 'module_design', label: 'Module design including AI-based assessments (Category 3)' },
  { id: 'other_teaching', label: 'Other teaching use' },
]

const ADMIN_USES = [
  { id: 'email_drafting', label: 'Drafting emails and correspondence' },
  { id: 'doc_summary', label: 'Summarising documents, papers or reports' },
  { id: 'meeting_notes', label: 'Meeting notes and minutes' },
  { id: 'policy_drafting', label: 'Policy, procedure or report writing' },
  { id: 'data_admin', label: 'Data management, spreadsheet analysis or dashboards' },
  { id: 'project_mgmt', label: 'Project planning or task management' },
  { id: 'presentations', label: 'Creating presentations' },
  { id: 'other_admin', label: 'Other administrative use' },
]

const PREFERRED_TOOLS = [
  'Microsoft Copilot (integrated into M365 — Teams, Word, Outlook, etc.)',
  'ChatGPT Enterprise (OpenAI)',
  'Claude for Work / Enterprise (Anthropic)',
  'Google Gemini for Workspace',
  'GitHub Copilot (coding/development)',
  'A specialised research AI tool (e.g. Elicit, Consensus)',
  'A University-developed or self-hosted solution',
  'No preference — any approved tool',
  'I do not want LLM tools procured',
]

const IMPORTANT_FEATURES = [
  'Data privacy and GDPR compliance',
  'Integration with Microsoft 365 (Outlook, Word, Teams, SharePoint)',
  'High-quality outputs for academic/research writing',
  'Coding / programming support',
  'Ability to process large documents',
  'Web search / up-to-date information',
  'Multi-language support',
  'Reasonable cost / value for money',
  'Ease of use and low learning curve',
  'Institutional admin and access management',
]

const CONCERNS = [
  'Data privacy and confidentiality (uploading University data to third-party services)',
  'Academic integrity and student misuse',
  'Accuracy and hallucination (AI presenting false information as fact)',
  'Intellectual property and copyright',
  'Environmental impact / energy use',
  'Equity of access (not all staff having equal access)',
  'Bias in AI outputs',
  'Deskilling or over-reliance',
  'Lack of transparency in how AI makes decisions',
  'Reputational risk to the University',
]

const TRAINING_NEEDS = [
  'An introductory workshop on what LLMs can and cannot do',
  'Discipline-specific guidance for researchers',
  'Guidance on teaching with/about AI (including Assessment Handbook categories)',
  'Training on data protection and responsible use',
  'Hands-on sessions with specific tools (e.g. Microsoft Copilot)',
  'A self-service online resource / FAQ',
  'Peer communities of practice (staff sharing examples)',
  'Nothing — I feel I have enough knowledge already',
]

function Checkbox({ name, value, checked, onChange, children }) {
  return (
    <label style={label}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ marginTop: 3, flexShrink: 0 }}
      />
      <span>{children}</span>
    </label>
  )
}

function Radio({ name, value, checked, onChange, children }) {
  return (
    <label style={label}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ marginTop: 3, flexShrink: 0 }}
      />
      <span>{children}</span>
    </label>
  )
}

function Scale({ name, value, onChange, low = 'Not at all', high = 'Extremely', steps = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        {Array.from({ length: steps }, (_, i) => i + 1).map(n => (
          <label key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', minWidth: 36 }}>
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === String(n)}
              onChange={onChange}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{n}</span>
          </label>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        <span>{low}</span><span>{high}</span>
      </div>
    </div>
  )
}

const EMPTY = {
  // S1
  role: [],
  school: '',
  // S2
  currentTools: [],
  frequency: '',
  // S3
  researchUses: [],
  researchDisclosure: '',
  researchDataConcern: '',
  // S4
  teachingUses: [],
  teachingCategory: '',
  // S5
  adminUses: [],
  // S6
  preferredTool: '',
  importantFeatures: [],
  procurementUrgency: '',
  // S7
  concerns: [],
  trainingNeeds: [],
  privacyConcernScale: '',
  freeText: '',
}

export default function SurveyForm({ onComplete }) {
  const [section, setSection] = useState(0)
  const [data, setData] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const isResearcher = data.role.some(r => r === 'research_staff' || r === 'pgr')
  const isTeacher = data.role.some(r => r === 'teaching_staff' || r === 'teaching_research')

  function setField(field, value) {
    setData(d => ({ ...d, [field]: value }))
  }

  function toggleCheck(field, value) {
    setData(d => {
      const arr = d[field]
      return { ...d, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  function progress() {
    const visible = visibleSections()
    const idx = visible.indexOf(section)
    return Math.round(((idx) / visible.length) * 100)
  }

  function visibleSections() {
    const all = [0, 1, 2, 3, 4, 5, 6]
    return all.filter(s => {
      if (s === 2) return isResearcher || data.role.length === 0
      if (s === 3) return isTeacher || data.role.length === 0
      return true
    })
  }

  function nextSection() {
    const vis = visibleSections()
    const idx = vis.indexOf(section)
    if (idx < vis.length - 1) setSection(vis[idx + 1])
  }

  function prevSection() {
    const vis = visibleSections()
    const idx = vis.indexOf(section)
    if (idx > 0) setSection(vis[idx - 1])
  }

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const payload = { ...data, submittedAt: new Date().toISOString() }
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      onComplete()
    } catch (err) {
      setError('There was a problem submitting your response. Please try again, or contact DTS.')
    } finally {
      setSubmitting(false)
    }
  }

  const vis = visibleSections()
  const isLast = vis.indexOf(section) === vis.length - 1

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
          <span>Section {vis.indexOf(section) + 1} of {vis.length}: <strong>{SECTIONS[section]}</strong></span>
          <span>{progress()}% complete</span>
        </div>
        <div style={{ height: 6, background: 'var(--uor-border)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress()}%`, background: 'var(--uor-teal)', transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={card}>
        {section === 0 && <Section0 data={data} setField={setField} toggleCheck={toggleCheck} />}
        {section === 1 && <Section1 data={data} setField={setField} toggleCheck={toggleCheck} />}
        {section === 2 && <Section2 data={data} setField={setField} toggleCheck={toggleCheck} />}
        {section === 3 && <Section3 data={data} setField={setField} toggleCheck={toggleCheck} />}
        {section === 4 && <Section4 data={data} setField={setField} toggleCheck={toggleCheck} />}
        {section === 5 && <Section5 data={data} setField={setField} toggleCheck={toggleCheck} />}
        {section === 6 && <Section6 data={data} setField={setField} toggleCheck={toggleCheck} />}
      </div>

      {error && (
        <div style={{ background: '#fdecea', border: '1px solid #e57373', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', marginBottom: '1rem', color: 'var(--error)', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <button style={vis.indexOf(section) === 0 ? { ...btnSecondary, opacity: 0.4, cursor: 'default' } : btnSecondary}
          onClick={prevSection} disabled={vis.indexOf(section) === 0}>
          ← Back
        </button>
        {isLast ? (
          <button style={btn} onClick={submit} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Response →'}
          </button>
        ) : (
          <button style={btn} onClick={nextSection}>
            Next →
          </button>
        )}
      </div>
    </div>
  )
}

// ── Section 0: About You ────────────────────────────────────────────────────

function Section0({ data, setField, toggleCheck }) {
  return (
    <div>
      <h2 style={sectionTitle}>About You</h2>
      <p style={sectionSubtitle}>This helps us understand how needs differ across role types. All responses are anonymous.</p>

      <fieldset style={fieldset}>
        <legend style={legend}>Which of the following best describes your role(s) at UoR? <span style={{ color: 'var(--uor-teal)' }}>(select all that apply)</span></legend>
        {[
          { id: 'research_staff', label: 'Research-only staff (Research Fellow, RA, PI, etc.)' },
          { id: 'teaching_research', label: 'Teaching and research staff (Lecturer, Associate/Full Professor, etc.)' },
          { id: 'teaching_staff', label: 'Teaching-focused staff (Teaching Fellow, Tutor, etc.)' },
          { id: 'pgr', label: 'Postgraduate Researcher (PhD, MRes, etc.)' },
          { id: 'professional', label: 'Professional / administrative staff' },
          { id: 'other_role', label: 'Other / prefer not to say' },
        ].map(opt => (
          <Checkbox key={opt.id} name="role" value={opt.id} checked={data.role.includes(opt.id)} onChange={() => toggleCheck('role', opt.id)}>
            {opt.label}
          </Checkbox>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>School or Service</legend>
        <select value={data.school} onChange={e => setField('school', e.target.value)} style={{ ...input, maxWidth: 400 }}>
          <option value="">— Please select —</option>
          {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </fieldset>
    </div>
  )
}

// ── Section 1: Current AI Use ───────────────────────────────────────────────

function Section1({ data, setField, toggleCheck }) {
  return (
    <div>
      <h2 style={sectionTitle}>Current AI / LLM Use</h2>
      <p style={sectionSubtitle}>Tell us about the AI tools you currently use.</p>

      <fieldset style={fieldset}>
        <legend style={legend}>Which AI or LLM tools do you currently use? <span style={{ color: 'var(--uor-teal)' }}>(select all that apply)</span></legend>
        <p style={hint}>Note: only Microsoft Copilot Chat is currently approved by UoR Legal, IMPS and Digital teams for University data.</p>
        {LLM_TOOLS.map(t => (
          <Checkbox key={t} name="currentTools" value={t} checked={data.currentTools.includes(t)} onChange={() => toggleCheck('currentTools', t)}>
            {t}
          </Checkbox>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>How often do you use AI/LLM tools in your work?</legend>
        {['Daily', 'Several times a week', 'Weekly', 'Monthly or less', 'Never'].map(f => (
          <Radio key={f} name="frequency" value={f} checked={data.frequency === f} onChange={() => setField('frequency', f)}>{f}</Radio>
        ))}
      </fieldset>
    </div>
  )
}

// ── Section 2: Research ─────────────────────────────────────────────────────

function Section2({ data, setField, toggleCheck }) {
  return (
    <div>
      <h2 style={sectionTitle}>Research Uses</h2>
      <p style={sectionSubtitle}>
        The University's{' '}
        <a href="https://www.reading.ac.uk/research-innovation-hub/managing-your-research/ai-use-in-research-and-innovation" target="_blank" rel="noreferrer">
          AI Use in Research guidance
        </a>{' '}
        distinguishes between <strong>AI supporting research</strong> (efficiency tools — writing, summarising, coding) and <strong>AI as a research component</strong> (AI as a core method, e.g. NLP or computer vision models). Please indicate which uses are relevant or interesting to you.
      </p>

      <fieldset style={fieldset}>
        <legend style={legend}>Which of the following research uses are you interested in or already doing? <span style={{ color: 'var(--uor-teal)' }}>(select all that apply)</span></legend>
        {RESEARCH_USES.map(u => (
          <Checkbox key={u.id} name="researchUses" value={u.id} checked={data.researchUses.includes(u.id)} onChange={() => toggleCheck('researchUses', u.id)}>
            {u.label}
          </Checkbox>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>How confident are you about the disclosure requirements for AI use in your research outputs?</legend>
        <p style={hint}>Publishers, funders and the University require disclosure of significant AI assistance in papers, grant applications, and reports.</p>
        {['Very confident', 'Fairly confident', 'Uncertain', 'Not confident at all', 'Not applicable to my role'].map(v => (
          <Radio key={v} name="researchDisclosure" value={v} checked={data.researchDisclosure === v} onChange={() => setField('researchDisclosure', v)}>{v}</Radio>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>How concerned are you about data privacy when using AI tools with research data?</legend>
        <p style={hint}>e.g. uploading datasets, interview transcripts, or unpublished results to cloud-based LLMs.</p>
        <Scale name="researchDataConcern" value={data.researchDataConcern} onChange={e => setField('researchDataConcern', e.target.value)} low="Not concerned" high="Very concerned" />
      </fieldset>
    </div>
  )
}

// ── Section 3: Teaching ─────────────────────────────────────────────────────

function Section3({ data, setField, toggleCheck }) {
  return (
    <div>
      <h2 style={sectionTitle}>Teaching Uses</h2>
      <p style={sectionSubtitle}>
        The University's{' '}
        <a href="https://www.reading.ac.uk/cqsd/artificial-intelligence" target="_blank" rel="noreferrer">
          CQSD AI guidance for staff
        </a>{' '}
        sets out three assessment categories: Category 1 (AI not permitted), Category 2 (AI permitted to support learning), Category 3 (AI actively used in assessment). This survey focuses on <strong>staff</strong> use of LLMs in teaching, not student use.
      </p>

      <fieldset style={fieldset}>
        <legend style={legend}>Which teaching tasks do you currently use (or would like to use) LLMs for? <span style={{ color: 'var(--uor-teal)' }}>(select all that apply)</span></legend>
        {TEACHING_USES.map(u => (
          <Checkbox key={u.id} name="teachingUses" value={u.id} checked={data.teachingUses.includes(u.id)} onChange={() => toggleCheck('teachingUses', u.id)}>
            {u.label}
          </Checkbox>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>Which assessment categories do you currently use in your modules?</legend>
        <p style={hint}>As defined in the Assessment Handbook Section 5.9.</p>
        {['Category 1 only (AI not permitted)', 'Category 2 (AI permitted to support learning)', 'Category 3 (AI actively used)', 'A mix of categories', 'Not applicable / I don\'t set assessments'].map(v => (
          <Radio key={v} name="teachingCategory" value={v} checked={data.teachingCategory === v} onChange={() => setField('teachingCategory', v)}>{v}</Radio>
        ))}
      </fieldset>
    </div>
  )
}

// ── Section 4: Professional / Admin Tasks ───────────────────────────────────

function Section4({ data, setField, toggleCheck }) {
  return (
    <div>
      <h2 style={sectionTitle}>Professional &amp; Administrative Tasks</h2>
      <p style={sectionSubtitle}>LLMs can support a wide range of professional and administrative work. Tell us which tasks are relevant to you.</p>

      <fieldset style={fieldset}>
        <legend style={legend}>Which professional/administrative tasks would you like LLM support for? <span style={{ color: 'var(--uor-teal)' }}>(select all that apply)</span></legend>
        {ADMIN_USES.map(u => (
          <Checkbox key={u.id} name="adminUses" value={u.id} checked={data.adminUses.includes(u.id)} onChange={() => toggleCheck('adminUses', u.id)}>
            {u.label}
          </Checkbox>
        ))}
      </fieldset>
    </div>
  )
}

// ── Section 5: LLM Services ─────────────────────────────────────────────────

function Section5({ data, setField, toggleCheck }) {
  return (
    <div>
      <h2 style={sectionTitle}>LLM Service Preferences</h2>
      <p style={sectionSubtitle}>DTS is evaluating which LLM tools to procure or expand access to. Your preferences will directly inform this decision.</p>

      <fieldset style={fieldset}>
        <legend style={legend}>If DTS could procure one additional LLM tool, which would be most valuable to you?</legend>
        {PREFERRED_TOOLS.map(t => (
          <Radio key={t} name="preferredTool" value={t} checked={data.preferredTool === t} onChange={() => setField('preferredTool', t)}>{t}</Radio>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>Which features matter most to you in an LLM tool? <span style={{ color: 'var(--uor-teal)' }}>(select up to 4)</span></legend>
        {IMPORTANT_FEATURES.map(f => (
          <Checkbox key={f} name="importantFeatures" value={f}
            checked={data.importantFeatures.includes(f)}
            onChange={() => {
              if (data.importantFeatures.includes(f)) toggleCheck('importantFeatures', f)
              else if (data.importantFeatures.length < 4) toggleCheck('importantFeatures', f)
            }}>
            {f}
          </Checkbox>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>How urgently do you feel DTS should procure enhanced LLM access for staff?</legend>
        {['Very urgently — I need this now', 'In the next 6 months', 'Within the year', 'No rush', 'I don\'t think we should'].map(v => (
          <Radio key={v} name="procurementUrgency" value={v} checked={data.procurementUrgency === v} onChange={() => setField('procurementUrgency', v)}>{v}</Radio>
        ))}
      </fieldset>
    </div>
  )
}

// ── Section 6: Support & Concerns ──────────────────────────────────────────

function Section6({ data, setField, toggleCheck }) {
  return (
    <div>
      <h2 style={sectionTitle}>Support Needs &amp; Concerns</h2>
      <p style={sectionSubtitle}>Help us understand what concerns you and what support would be most useful.</p>

      <fieldset style={fieldset}>
        <legend style={legend}>Which concerns do you have about LLM use at UoR? <span style={{ color: 'var(--uor-teal)' }}>(select all that apply)</span></legend>
        {CONCERNS.map(c => (
          <Checkbox key={c} name="concerns" value={c} checked={data.concerns.includes(c)} onChange={() => toggleCheck('concerns', c)}>
            {c}
          </Checkbox>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>What training or support would be most useful to you? <span style={{ color: 'var(--uor-teal)' }}>(select all that apply)</span></legend>
        {TRAINING_NEEDS.map(t => (
          <Checkbox key={t} name="trainingNeeds" value={t} checked={data.trainingNeeds.includes(t)} onChange={() => toggleCheck('trainingNeeds', t)}>
            {t}
          </Checkbox>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={legend}>Is there anything else you'd like DTS to know about your needs or views on AI/LLM tools?</legend>
        <textarea
          style={textarea}
          value={data.freeText}
          onChange={e => setField('freeText', e.target.value)}
          placeholder="Optional — any other comments, use cases, or specific concerns..."
          rows={4}
        />
      </fieldset>
    </div>
  )
}
