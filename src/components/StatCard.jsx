import { PlusIcon } from './icons.jsx'

// A dashboard metric tile. Passing `onAdd` renders a small "+" shortcut in
// the corner, turning the tile into both a KPI and a quick-add entry point.
export default function StatCard({ label, value, icon, tone = 'accent', onAdd, addLabel }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        {icon && <div className={`stat-card-icon tone-${tone}`}>{icon}</div>}
        {onAdd && (
          <button type="button" className="icon-btn" onClick={onAdd} aria-label={addLabel || 'Ajouter'} title={addLabel || 'Ajouter'}>
            <PlusIcon width={15} height={15} />
          </button>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  )
}
