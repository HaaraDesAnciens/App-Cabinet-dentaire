import { PlusIcon } from './icons.jsx'

// Consistent "+" shortcut used across page headers, dashboard cards and the
// fiche client sections. `variant="accent"` renders a filled version.
export default function QuickAddButton({ onClick, label = 'Ajouter', variant = 'default', size = 18 }) {
  return (
    <button
      type="button"
      className={variant === 'accent' ? 'icon-btn icon-btn-accent' : 'icon-btn'}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <PlusIcon width={size} height={size} />
    </button>
  )
}
