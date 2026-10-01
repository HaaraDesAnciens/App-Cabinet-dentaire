import { DashboardIcon, ClientsIcon, CalendarIcon, PhoneIcon, LeadsIcon, StatsIcon, SettingsIcon } from './icons.jsx'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { key: 'clients', label: 'Clients', icon: ClientsIcon },
  { key: 'rendezvous', label: 'Rendez-vous', icon: CalendarIcon },
  { key: 'appels', label: 'Appels & conversations', icon: PhoneIcon },
  { key: 'leads', label: 'Leads', icon: LeadsIcon },
  { key: 'stats', label: 'Statistiques & ROI', icon: StatsIcon },
  { key: 'settings', label: 'Paramètres', icon: SettingsIcon },
]

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">D</div>
          <span className="sidebar-brand-name">DentPilot</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                type="button"
                className={`sidebar-nav-item ${currentPage === item.key ? 'is-active' : ''}`}
                onClick={() => {
                  onNavigate(item.key)
                  onClose()
                }}
              >
                <span className="sidebar-nav-icon">
                  <Icon width={18} height={18} />
                </span>
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
