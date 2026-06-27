import React, { useState, useEffect } from 'react'
import Intro from './components/Intro.jsx'
import SurveyForm from './components/SurveyForm.jsx'
import ThankYou from './components/ThankYou.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  const [stage, setStage] = useState('intro')
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#dashboard') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <Dashboard />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: 780, margin: '0 auto', width: '100%' }}>
        {stage === 'intro' && <Intro onStart={() => setStage('survey')} />}
        {stage === 'survey' && <SurveyForm onComplete={() => setStage('done')} />}
        {stage === 'done' && <ThankYou />}
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header style={{
      background: 'var(--uor-navy)',
      color: 'var(--white)',
      padding: '0',
    }}>
      <div style={{
        maxWidth: 780,
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 6,
          background: 'var(--uor-gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1.2rem', color: 'var(--uor-navy)',
          flexShrink: 0,
        }}>UoR</div>
        <div>
          <div style={{ fontSize: '0.75rem', opacity: 0.75, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            School of Mathematical, Physical and Computational Sciences
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2 }}>
            AI &amp; LLM Tools — Staff Input Survey
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: 'var(--uor-gold)' }} />
    </header>
  )
}

function Footer() {
  return (
    <footer style={{
      background: 'var(--uor-navy)',
      color: 'rgba(255,255,255,0.6)',
      fontSize: '0.8rem',
      padding: '1rem 1.5rem',
      textAlign: 'center',
      marginTop: '2rem',
    }}>
      University of Reading · School of Mathematical, Physical and Computational Sciences · {new Date().getFullYear()}
    </footer>
  )
}
