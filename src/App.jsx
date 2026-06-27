import React from 'react'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
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

function Header() {
  return (
    <header style={{ background: '#003366', color: '#fff', padding: 0 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 6, background: '#c9a84c',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1.2rem', color: '#003366', flexShrink: 0,
        }}>UoR</div>
        <div>
          <div style={{ fontSize: '0.75rem', opacity: 0.75, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            School of Mathematical, Physical and Computational Sciences
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2 }}>
            AI &amp; LLM Tools — Staff Survey Results
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: '#c9a84c' }} />
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#003366', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', padding: '1rem 1.5rem', textAlign: 'center', marginTop: '2rem' }}>
      University of Reading · School of Mathematical, Physical and Computational Sciences · {new Date().getFullYear()}
    </footer>
  )
}
