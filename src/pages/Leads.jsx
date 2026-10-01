import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import Badge from '../components/Badge.jsx'
import EmptyState from '../components/EmptyState.jsx'
import QuickAddButton from '../components/QuickAddButton.jsx'
import { EditIcon, TrashIcon } from '../components/icons.jsx'
import { LEAD_STATUSES, statusMeta, clientName } from '../utils/constants.js'
import { formatDate, todayISO } from '../utils/formatters.js'

export default function Leads() {
  const { clients, leads, updateLead, deleteLead } = useApp()
  const { openCreate, openEdit } = useModal()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('tous')
  const [clientFilter, setClientFilter] = useState('tous')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return leads
      .filter((l) => !term || l.nom.toLowerCase().includes(term))
      .filter((l) => statusFilter === 'tous' || l.statut === statusFilter)
      .filter((l) => clientFilter === 'tous' || l.clientId === clientFilter)
      .sort((a, b) => b.dateCapture.localeCompare(a.dateCapture))
  }, [leads, search, statusFilter, clientFilter])

  function handleDelete(e, id) {
    e.stopPropagation()
    if (window.confirm('Supprimer ce lead ?')) deleteLead(id)
  }

  function handleQuickStatus(e, id, statut) {
    e.stopPropagation()
    updateLead(id, { statut })
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Leads</h1>
        <QuickAddButton
          label="Nouveau lead"
          onClick={() => openCreate('lead', { statut: 'nouveau', source: 'appel', dateCapture: todayISO() })}
        />
      </div>

      <div className="panel">
        <div className="filters-bar" style={{ marginBottom: 14 }}>
          <input
            className="search-input"
            placeholder="Rechercher par nom…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="filter-select" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
            <option value="tous">Tous les clients</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.nomCabinet}</option>)}
          </select>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="tous">Tous les statuts</option>
            {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="🎯" title="Aucun lead" subtitle="Ajustez vos filtres ou ajoutez un nouveau lead." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Cabinet</th>
                  <th>Source</th>
                  <th>Statut</th>
                  <th>Date de capture</th>
                  <th className="actions-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const info = statusMeta(LEAD_STATUSES, lead.statut)
                  return (
                    <tr key={lead.id} onClick={() => openEdit('lead', lead)}>
                      <td className="cell-primary">{lead.nom}</td>
                      <td className="cell-muted">{clientName(clients, lead.clientId)}</td>
                      <td className="cell-muted">{lead.source}</td>
                      <td><Badge tone={info.color} label={info.label} /></td>
                      <td className="cell-muted">{formatDate(lead.dateCapture)}</td>
                      <td className="actions-cell">
                        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                          {lead.statut !== 'contacté' && lead.statut !== 'rdv_pris' && (
                            <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => handleQuickStatus(e, lead.id, 'contacté')}>
                              Contacté
                            </button>
                          )}
                          {lead.statut !== 'rdv_pris' && (
                            <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => handleQuickStatus(e, lead.id, 'rdv_pris')}>
                              RDV pris
                            </button>
                          )}
                          <button type="button" className="icon-btn" aria-label="Modifier" onClick={() => openEdit('lead', lead)}>
                            <EditIcon width={15} height={15} />
                          </button>
                          <button type="button" className="icon-btn icon-btn-danger" aria-label="Supprimer" onClick={(e) => handleDelete(e, lead.id)}>
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
