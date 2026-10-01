// Stacked horizontal bar + legend showing the share of each call outcome.
// Expects segments = [{ label, count, color }].
export default function ResultBreakdown({ segments }) {
  const total = segments.reduce((sum, s) => sum + s.count, 0)

  if (!total) {
    return <div className="bar-chart-empty">Pas encore d'appels enregistrés.</div>
  }

  return (
    <div className="result-breakdown">
      <div className="result-breakdown-track">
        {segments
          .filter((s) => s.count > 0)
          .map((s, i) => (
            <div key={i} style={{ width: `${(s.count / total) * 100}%`, background: s.color }} />
          ))}
      </div>
      <div className="result-breakdown-legend">
        {segments.map((s, i) => (
          <span key={i}>
            <span className="legend-dot" style={{ background: s.color }} />
            {s.label} · {total ? Math.round((s.count / total) * 100) : 0}%
          </span>
        ))}
      </div>
    </div>
  )
}
