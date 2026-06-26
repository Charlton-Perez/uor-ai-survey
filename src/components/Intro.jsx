import React from 'react'
import { card, btn } from '../styles.js'

export default function Intro({ onStart }) {
  return (
    <div>
      <div style={card}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--uor-navy)', marginBottom: '0.75rem' }}>
          How should we use AI and LLMs at the University of Reading?
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          The School of Mathematical, Physical and Computational Sciences (MPCS) is gathering staff input
          to inform our approach to procuring and supporting Large Language Model (LLM) tools — such as
          Microsoft Copilot, ChatGPT, Claude, and Gemini — for research, teaching, and professional services.
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          This survey takes approximately <strong>5–8 minutes</strong>. Your responses are anonymous and will
          be used to produce an evidence base for colleagues and leadership. All data is held securely.
        </p>

        <div style={{
          background: '#eef4fb',
          border: '1px solid var(--uor-border)',
          borderRadius: 'var(--radius)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{ fontSize: '0.95rem', color: 'var(--uor-navy)', marginBottom: '0.5rem' }}>
            Relevant University Policies
          </h2>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            <li>
              <a href="https://www.reading.ac.uk/research-innovation-hub/managing-your-research/ai-use-in-research-and-innovation" target="_blank" rel="noreferrer">
                AI Use in Research and Innovation
              </a>
              {' '}— University of Reading Research &amp; Innovation Hub
            </li>
            <li>
              <a href="https://www.reading.ac.uk/cqsd/artificial-intelligence" target="_blank" rel="noreferrer">
                Artificial Intelligence — Teaching &amp; Learning Guidance
              </a>
              {' '}— Centre for Quality Support and Development
            </li>
            <li>
              <a href="https://www.reading.ac.uk/imps/information-security" target="_blank" rel="noreferrer">
                Information Security &amp; Data Protection
              </a>
              {' '}— only Microsoft Copilot Chat is currently approved for general University data
            </li>
          </ul>
        </div>

        <button style={btn} onClick={onStart}>
          Start Survey →
        </button>
      </div>
    </div>
  )
}
