import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { seedClients, seedRendezVous, seedAppels, seedLeads, seedSettings } from '../data/seedData.js'
import { generateId } from '../utils/formatters.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [clients, setClients] = useLocalStorage('dentpilot_clients', seedClients)
  const [rendezVous, setRendezVous] = useLocalStorage('dentpilot_rdv', seedRendezVous)
  const [appels, setAppels] = useLocalStorage('dentpilot_appels', seedAppels)
  const [leads, setLeads] = useLocalStorage('dentpilot_leads', seedLeads)
  const [settings, setSettings] = useLocalStorage('dentpilot_settings', seedSettings)

  const addClient = useCallback(
    (data) => {
      const client = { id: generateId(), ...data }
      setClients((prev) => [client, ...prev])
      return client
    },
    [setClients]
  )
  const updateClient = useCallback(
    (id, data) => setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c))),
    [setClients]
  )
  const deleteClient = useCallback((id) => setClients((prev) => prev.filter((c) => c.id !== id)), [setClients])

  const addRendezVous = useCallback(
    (data) => {
      const rdv = { id: generateId(), ...data }
      setRendezVous((prev) => [rdv, ...prev])
      return rdv
    },
    [setRendezVous]
  )
  const updateRendezVous = useCallback(
    (id, data) => setRendezVous((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r))),
    [setRendezVous]
  )
  const deleteRendezVous = useCallback(
    (id) => setRendezVous((prev) => prev.filter((r) => r.id !== id)),
    [setRendezVous]
  )

  const addAppel = useCallback(
    (data) => {
      const appel = { id: generateId(), ...data }
      setAppels((prev) => [appel, ...prev])
      return appel
    },
    [setAppels]
  )
  const deleteAppel = useCallback((id) => setAppels((prev) => prev.filter((a) => a.id !== id)), [setAppels])

  const addLead = useCallback(
    (data) => {
      const lead = { id: generateId(), ...data }
      setLeads((prev) => [lead, ...prev])
      return lead
    },
    [setLeads]
  )
  const updateLead = useCallback(
    (id, data) => setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l))),
    [setLeads]
  )
  const deleteLead = useCallback((id) => setLeads((prev) => prev.filter((l) => l.id !== id)), [setLeads])

  const updateSettings = useCallback((data) => setSettings((prev) => ({ ...prev, ...data })), [setSettings])

  const value = useMemo(
    () => ({
      clients,
      addClient,
      updateClient,
      deleteClient,
      rendezVous,
      addRendezVous,
      updateRendezVous,
      deleteRendezVous,
      appels,
      addAppel,
      deleteAppel,
      leads,
      addLead,
      updateLead,
      deleteLead,
      settings,
      updateSettings,
    }),
    [
      clients,
      addClient,
      updateClient,
      deleteClient,
      rendezVous,
      addRendezVous,
      updateRendezVous,
      deleteRendezVous,
      appels,
      addAppel,
      deleteAppel,
      leads,
      addLead,
      updateLead,
      deleteLead,
      settings,
      updateSettings,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
