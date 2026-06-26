export const card = {
  background: 'var(--white)',
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow)',
  padding: '2rem',
  marginBottom: '1.5rem',
}

export const btn = {
  background: 'var(--uor-navy)',
  color: 'var(--white)',
  border: 'none',
  borderRadius: 'var(--radius)',
  padding: '0.75rem 2rem',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.2s',
}

export const btnSecondary = {
  background: 'transparent',
  color: 'var(--uor-navy)',
  border: '2px solid var(--uor-navy)',
  borderRadius: 'var(--radius)',
  padding: '0.75rem 2rem',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
}

export const fieldset = {
  border: 'none',
  marginBottom: '1.5rem',
}

export const legend = {
  fontWeight: 700,
  color: 'var(--uor-navy)',
  fontSize: '0.95rem',
  marginBottom: '0.5rem',
  display: 'block',
}

export const hint = {
  color: 'var(--text-secondary)',
  fontSize: '0.82rem',
  marginBottom: '0.75rem',
  marginTop: '-0.25rem',
}

export const label = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.6rem',
  marginBottom: '0.4rem',
  cursor: 'pointer',
  fontSize: '0.92rem',
  lineHeight: 1.5,
}

export const input = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid var(--uor-border)',
  borderRadius: 6,
  fontSize: '0.92rem',
  fontFamily: 'inherit',
  color: 'var(--text-main)',
  background: 'var(--white)',
  marginTop: '0.25rem',
}

export const textarea = {
  ...input,
  minHeight: 90,
  resize: 'vertical',
}

export const sectionTitle = {
  fontSize: '1.1rem',
  fontWeight: 700,
  color: 'var(--uor-navy)',
  marginBottom: '0.25rem',
}

export const sectionSubtitle = {
  color: 'var(--text-secondary)',
  fontSize: '0.85rem',
  marginBottom: '1.25rem',
}
