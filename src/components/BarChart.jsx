// Hand-rolled SVG bar chart (no charting dependency). Expects
// data = [{ label, count }], renders bars scaled to the tallest value.
export default function BarChart({ data, color = 'var(--color-accent)', height = 140 }) {
  if (!data.length || data.every((d) => d.count === 0)) {
    return <div className="bar-chart-empty">Pas encore de données sur cette période.</div>
  }

  const max = Math.max(...data.map((d) => d.count), 1)
  const barWidth = 100 / data.length
  const gap = barWidth * 0.3

  return (
    <div className="chart-wrap">
      <svg className="bar-chart" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        {data.map((d, i) => {
          const barHeight = (d.count / max) * (height - 24)
          const x = i * barWidth + gap / 2
          const w = barWidth - gap
          const y = height - 20 - barHeight
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={barHeight} rx={2} fill={color} />
              <text x={x + w / 2} y={height - 6} fontSize="5.5" textAnchor="middle" fill="var(--color-text-muted)">
                {d.label}
              </text>
              {d.count > 0 && (
                <text x={x + w / 2} y={Math.max(y - 3, 7)} fontSize="5.5" textAnchor="middle" fill="var(--color-text)">
                  {d.count}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
