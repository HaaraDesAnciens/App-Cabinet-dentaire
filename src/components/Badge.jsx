// Small colored pill. `tone` matches the `.tone-*` utility classes defined
// in components.css (accent / success / warning / purple / danger / teal / info / muted).
export default function Badge({ label, tone = 'muted' }) {
  return <span className={`badge tone-${tone}`}>{label}</span>
}
