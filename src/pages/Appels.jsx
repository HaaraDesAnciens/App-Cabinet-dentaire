import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import Badge from '../components/Badge.jsx'
import EmptyState from '../components/EmptyState.jsx'
import QuickAddButton from '../components/QuickAddButton.jsx'
import { TrashIcon } from '../components/icons.jsx'
import { APPEL_CANAUX, APPEL_RESULTATS, statusMeta, clientName } from '../utils/constants.js'
import { formatDateTime, formatDuration, nowISODateTime } from '../utils/formatters.js'

export default function Appels() {
  const { clients, appels, deleteAppel } = useApp()
  const { openCreate, openView } = useModal()
  const [clientFilter, setClientFilter] = useState('tous')
  const [canalFilter, setCanalFilter] = useState('tous')
  const [resultatFilter, setResultatFilter] = useState('tous')

  const filtered = useMemo(() => {
    return appels
      .filter((a) => clientFilter === 'tous' || a.clientId === clientFilter)
      .filter((a) => canalFilter === 'tous' || a.canal === canalFilter)
      .filter((a) => resultatFilter === 'tous' || a.resultat === resultatFilter)
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [appels, clientFilter, canalFilter, resultatFilter])

  function handleDelete(e, id) {
    e.stopPropagation()
    if (window.confirm('Supprimer cet appel ?')) deleteAppel(id)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Appels & conversations</h1>
        <QuickAddButton
          label="Ajouter un appel (test)"
          onClick={() => openCreate('appel', { canal: 'téléphone', resultat: 'rdv_pris', sentiment: 'neutre', date: nowISODateTime() })}
        />
      </div>

      <div className="panel">
        <div className="filters-bar" style={{ marginBottom: 14 }}>
          <select className="filter-select" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
            <option value="tous">Tous les clients</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.nomCabinet}</option>)}
          </select>
          <select className="filter-select" value={canalFilter} onChange={(e) => setCanalFilter(e.target.value)}>
            <option value="tous">Tous les canaux</option>
            {APPEL_CANAUX.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select className="filter-select" value={resultatFilter} onChange={(e) => setResultatFilter(e.target.value)}>
            <option value="tous">Tous les résultats</option>
            {APPEL_RESULTATS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="📞" title="Aucun appel" subtitle="Ajustez vos filtres — les conversations de l'agent apparaîtront ici." />
        ) : (
          <div className="list-rows">
            {filtered.map((appel) => {
              const info = statusMeta(APPEL_RESULTATS, appel.resultat)
              const canalInfo = APPEL_CANAUX.find((c) => c.value === appel.canal)
              return (
                <div key={appel.id} className="list-row" onClick={() => openView('transcript', appel)}>
                  <div className="list-row-main">
                    <span className="list-row-title">{appel.resume}</span>
                    <span className="list-row-meta">
                      <span>{clientName(clients, appel.clientId)}</span>
                      <span>{formatDateTime(appel.date)}</span>
                      <span>{canalInfo?.label}</span>
                      <span>{formatDuration(appel.duree)}</span>
                    </span>
                  </div>
                  <div className="list-row-actions">
                    <Badge tone={info.color} label={info.label} />
                    <button type="button" className="icon-btn icon-btn-danger" aria-label="Supprimer" onClick={(e) => handleDelete(e, appel.id)}>
                      <TrashIcon width={15} height={15} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
