import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import Badge from '../components/Badge.jsx'
import EmptyState from '../components/EmptyState.jsx'
import QuickAddButton from '../components/QuickAddButton.jsx'
import ClientDetail from './ClientDetail.jsx'
import { EditIcon, TrashIcon } from '../components/icons.jsx'
import { CLIENT_STATUSES, CLIENT_PLANS, statusMeta } from '../utils/constants.js'
import { formatDate, todayISO } from '../utils/formatters.js'

export default function Clients() {
  const { clients, deleteClient } = useApp()
  const { openCreate, openEdit } = useModal()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('tous')
  const [selectedClientId, setSelectedClientId] = useState(null)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return clients.filter((c) => {
      const matchesSearch = !term || c.nomCabinet.toLowerCase().includes(term) || c.ville.toLowerCase().includes(term)
      const matchesStatus = statusFilter === 'tous' || c.statut === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [clients, search, statusFilter])

  function handleDelete(e, id) {
    e.stopPropagation()
    if (window.confirm('Supprimer ce client ? Ses RDV, appels et leads resteront enregistrés mais ne seront plus rattachés.')) deleteClient(id)
  }

  if (selectedClientId) {
    return <ClientDetail clientId={selectedClientId} onBack={() => setSelectedClientId(null)} />
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Clients</h1>
        <QuickAddButton
          label="Nouveau client"
          onClick={() => openCreate('client', { statut: 'actif', plan: 'pro', dateDebutAbonnement: todayISO(), agentActif: true })}
        />
      </div>

      <div className="panel">
        <div className="filters-bar" style={{ marginBottom: 14 }}>
          <input
            className="search-input"
            placeholder="Rechercher par nom de cabinet ou ville…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="tous">Tous les statuts</option>
            {CLIENT_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="🦷" title="Aucun client" subtitle="Ajustez vos filtres ou ajoutez un nouveau cabinet client." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cabinet</th>
                  <th>Ville</th>
                  <th>Dentiste responsable</th>
                  <th>Statut</th>
                  <th>Plan</th>
                  <th>Agent IA</th>
                  <th>Début</th>
                  <th className="actions-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const statutInfo = statusMeta(CLIENT_STATUSES, c.statut)
                  const planInfo = statusMeta(CLIENT_PLANS, c.plan)
                  return (
                    <tr key={c.id} onClick={() => setSelectedClientId(c.id)}>
                      <td className="cell-primary">{c.nomCabinet}</td>
                      <td className="cell-muted">{c.ville}</td>
                      <td className="cell-muted">{c.dentisteResponsable || '—'}</td>
                      <td><Badge tone={statutInfo.color} label={statutInfo.label} /></td>
                      <td><Badge tone={planInfo.color} label={planInfo.label} /></td>
                      <td className="cell-muted">{c.agentActif ? 'Actif' : 'Inactif'}</td>
                      <td className="cell-muted">{formatDate(c.dateDebutAbonnement)}</td>
                      <td className="actions-cell">
                        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                          <button type="button" className="icon-btn" aria-label="Modifier" onClick={() => openEdit('client', c)}>
                            <EditIcon width={15} height={15} />
                          </button>
                          <button type="button" className="icon-btn icon-btn-danger" aria-label="Supprimer" onClick={(e) => handleDelete(e, c.id)}>
                            <TrashIcon width={15} height={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
