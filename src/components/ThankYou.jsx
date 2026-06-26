import React from 'react'
import { card, btn } from '../styles.js'

export default function ThankYou() {
  return (
    <div style={card}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'var(--uor-teal)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', marginBottom: '1.25rem',
      }}>✓</div>
      <h1 style={{ fontSize: '1.4rem', color: 'var(--uor-navy)', marginBottom: '0.75rem' }}>
        Thank you for your response
      </h1>
      <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
        Your input has been recorded and will contribute to the MPCS evidence base for DTS colleagues
        on AI/LLM tool procurement and support planning.
      </p>
      <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
        A summary report will be shared with colleagues once the survey period closes. If you have
        further questions, please contact the Head of School.
      </p>
      <div style={{
        background: '#eef4fb',
        border: '1px solid var(--uor-border)',
        borderRadius: 8,
        padding: '1rem 1.25rem',
        fontSize: '0.88rem',
        color: '#4a5568',
        marginBottom: '1.5rem',
      }}>
        <strong style={{ color: 'var(--uor-navy)' }}>Useful links</strong>
        <ul style={{ marginTop: '0.4rem', paddingLeft: '1.25rem', lineHeight: 2 }}>
          <li><a href="https://www.reading.ac.uk/research-innovation-hub/managing-your-research/ai-use-in-research-and-innovation" target="_blank" rel="noreferrer">AI Use in Research guidance</a></li>
          <li><a href="https://www.reading.ac.uk/cqsd/artificial-intelligence" target="_blank" rel="noreferrer">CQSD AI teaching guidance</a></li>
          <li><a href="https://login.microsoftonline.com" target="_blank" rel="noreferrer">Microsoft Copilot Chat (University-approved LLM)</a></li>
        </ul>
      </div>
    </div>
  )
}
