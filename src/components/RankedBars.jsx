// Horizontal ranked bars, e.g. clients sorted by conversion rate or activity.
// Expects items = [{ label, value, display }].
export default function RankedBars({ items }) {
  if (!items.length) {
    return <div className="bar-chart-empty">Pas encore assez de données.</div>
  }

  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <div className="ranked-bars">
      {items.map((item, i) => (
        <div className="ranked-bar-row" key={i}>
          <span className="ranked-bar-label" title={item.label}>{item.label}</span>
          <span className="ranked-bar-track">
            <span className="ranked-bar-fill" style={{ width: `${(item.value / max) * 100}%` }} />
          </span>
          <span className="ranked-bar-value">{item.display ?? item.value}</span>
        </div>
      ))}
    </div>
  )
}
