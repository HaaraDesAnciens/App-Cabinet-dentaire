import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import Badge from '../components/Badge.jsx'
import EmptyState from '../components/EmptyState.jsx'
import QuickAddButton from '../components/QuickAddButton.jsx'
import { EditIcon, TrashIcon } from '../components/icons.jsx'
import { RDV_STATUSES, statusMeta, clientName } from '../utils/constants.js'
import { formatDateTime, isToday, nowISODateTime } from '../utils/formatters.js'

export default function RendezVous() {
  const { clients, rendezVous, deleteRendezVous } = useApp()
  const { openCreate, openEdit } = useModal()
  const [clientFilter, setClientFilter] = useState('tous')
  const [statusFilter, setStatusFilter] = useState('tous')

  const filtered = useMemo(() => {
    return rendezVous
      .filter((r) => clientFilter === 'tous' || r.clientId === clientFilter)
      .filter((r) => statusFilter === 'tous' || r.statut === statusFilter)
      .sort((a, b) => b.dateHeure.localeCompare(a.dateHeure))
  }, [rendezVous, clientFilter, statusFilter])

  function handleDelete(e, id) {
    e.stopPropagation()
    if (window.confirm('Supprimer ce rendez-vous ?')) deleteRendezVous(id)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Rendez-vous</h1>
        <QuickAddButton
          label="Nouveau RDV"
          onClick={() => openCreate('rdv', { statut: 'confirmé', source: 'appel', dateHeure: nowISODateTime() })}
        />
      </div>

      <div className="panel">
        <div className="filters-bar" style={{ marginBottom: 14 }}>
          <select className="filter-select" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
            <option value="tous">Tous les clients</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.nomCabinet}</option>)}
          </select>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="tous">Tous les statuts</option>
            {RDV_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="📅" title="Aucun rendez-vous" subtitle="Ajustez vos filtres ou ajoutez un nouveau RDV." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Cabinet</th>
                  <th>Date / heure</th>
                  <th>Type de soin</th>
                  <th>Statut</th>
                  <th>Source</th>
                  <th className="actions-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((rdv) => {
                  const info = statusMeta(RDV_STATUSES, rdv.statut)
                  return (
                    <tr key={rdv.id} onClick={() => openEdit('rdv', rdv)}>
                      <td className="cell-primary">{rdv.patientNom}</td>
                      <td className="cell-muted">{clientName(clients, rdv.clientId)}</td>
                      <td className="cell-muted">
                        {formatDateTime(rdv.dateHeure)} {isToday(rdv.dateHeure) && <Badge tone="info" label="Aujourd'hui" />}
                      </td>
                      <td className="cell-muted">{rdv.typeSoin}</td>
                      <td><Badge tone={info.color} label={info.label} /></td>
                      <td className="cell-muted">{rdv.source}</td>
                      <td className="actions-cell">
                        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                          <button type="button" className="icon-btn" aria-label="Modifier" onClick={() => openEdit('rdv', rdv)}>
                            <EditIcon width={15} height={15} />
                          </button>
                          <button type="button" className="icon-btn icon-btn-danger" aria-label="Supprimer" onClick={(e) => handleDelete(e, rdv.id)}>
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
