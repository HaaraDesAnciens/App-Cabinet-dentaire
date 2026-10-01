import { useEffect, useRef, useState } from 'react'
import { MenuIcon, PlusIcon, ChevronDownIcon } from './icons.jsx'
import { useModal } from '../context/ModalContext.jsx'
import { todayISO, nowISODateTime } from '../utils/formatters.js'

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  clients: 'Clients',
  rendezvous: 'Rendez-vous',
  appels: 'Appels & conversations',
  leads: 'Leads',
  stats: 'Statistiques & ROI',
  settings: 'Paramètres',
}

export default function Topbar({ currentPage, onOpenSidebar }) {
  const { openCreate } = useModal()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function pick(type) {
    setMenuOpen(false)
    if (type === 'client') openCreate('client', { statut: 'actif', plan: 'pro', dateDebutAbonnement: todayISO(), agentActif: true })
    if (type === 'rdv') openCreate('rdv', { statut: 'confirmé', source: 'appel', dateHeure: nowISODateTime() })
    if (type === 'lead') openCreate('lead', { statut: 'nouveau', source: 'appel', dateCapture: todayISO() })
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button type="button" className="hamburger-btn" onClick={onOpenSidebar} aria-label="Ouvrir le menu">
          <MenuIcon width={20} height={20} />
        </button>
        <span className="topbar-title">{PAGE_TITLES[currentPage] || ''}</span>
      </div>

      <div className="quick-add" ref={menuRef}>
        <button type="button" className="btn btn-primary" onClick={() => setMenuOpen((v) => !v)}>
          <PlusIcon width={16} height={16} />
          Nouveau
          <ChevronDownIcon width={14} height={14} />
        </button>
        {menuOpen && (
          <div className="quick-add-menu">
            <button type="button" onClick={() => pick('client')}>Nouveau client</button>
            <button type="button" onClick={() => pick('rdv')}>Nouveau RDV</button>
            <button type="button" onClick={() => pick('lead')}>Nouveau lead</button>
          </div>
        )}
      </div>
    </header>
  )
}
