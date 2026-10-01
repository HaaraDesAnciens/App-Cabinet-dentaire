import { useState } from 'react'
import { AppProvider } from './context/AppContext.jsx'
import { ModalProvider, useModal } from './context/ModalContext.jsx'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js'
import { todayISO, nowISODateTime } from './utils/formatters.js'

import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import ClientModal from './components/ClientModal.jsx'
import RendezVousModal from './components/RendezVousModal.jsx'
import LeadModal from './components/LeadModal.jsx'
import AppelModal from './components/AppelModal.jsx'
import TranscriptModal from './components/TranscriptModal.jsx'

import Dashboard from './pages/Dashboard.jsx'
import Clients from './pages/Clients.jsx'
import RendezVous from './pages/RendezVous.jsx'
import Appels from './pages/Appels.jsx'
import Leads from './pages/Leads.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'

// "N" opens the add-modal relevant to whichever page is currently shown.
const PAGE_QUICK_ADD = {
  dashboard: () => ['client', { statut: 'actif', plan: 'pro', dateDebutAbonnement: todayISO(), agentActif: true }],
  clients: () => ['client', { statut: 'actif', plan: 'pro', dateDebutAbonnement: todayISO(), agentActif: true }],
  rendezvous: () => ['rdv', { statut: 'confirmé', source: 'appel', dateHeure: nowISODateTime() }],
  appels: () => ['appel', { canal: 'téléphone', resultat: 'rdv_pris', sentiment: 'neutre', date: nowISODateTime() }],
  leads: () => ['lead', { statut: 'nouveau', source: 'appel', dateCapture: todayISO() }],
}

function AppShell() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const { openCreate, modal, closeModal } = useModal()

  useKeyboardShortcuts({
    onNew: () => {
      const factory = PAGE_QUICK_ADD[currentPage]
      if (!factory) return
      const [type, initialData] = factory()
      openCreate(type, initialData)
    },
    onEscape: () => {
      if (modal.type) closeModal()
    },
  })

  function renderPage() {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />
      case 'clients':
        return <Clients />
      case 'rendezvous':
        return <RendezVous />
      case 'appels':
        return <Appels />
      case 'leads':
        return <Leads />
      case 'stats':
        return <Stats />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar currentPage={currentPage} onOpenSidebar={() => setSidebarOpen(true)} />
        {renderPage()}
      </div>

      <ClientModal />
      <RendezVousModal />
      <LeadModal />
      <AppelModal />
      <TranscriptModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <ModalProvider>
        <AppShell />
      </ModalProvider>
    </AppProvider>
  )
}
