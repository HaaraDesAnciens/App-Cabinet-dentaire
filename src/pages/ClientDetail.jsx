import { useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import Badge from '../components/Badge.jsx'
import EmptyState from '../components/EmptyState.jsx'
import QuickAddButton from '../components/QuickAddButton.jsx'
import { ArrowLeftIcon, EditIcon } from '../components/icons.jsx'
import { CLIENT_STATUSES, RDV_STATUSES, APPEL_RESULTATS, LEAD_STATUSES, statusMeta } from '../utils/constants.js'
import { formatDate, formatDateTime, formatDuration, nowISODateTime, todayISO } from '../utils/formatters.js'

export default function ClientDetail({ clientId, onBack }) {
  const { clients, rendezVous, appels, leads } = useApp()
  const { openCreate, openEdit, openView } = useModal()

  const client = clients.find((c) => c.id === clientId)

  const clientRdv = useMemo(
    () => rendezVous.filter((r) => r.clientId === clientId).sort((a, b) => b.dateHeure.localeCompare(a.dateHeure)),
    [rendezVous, clientId]
  )
  const clientAppels = useMemo(
    () => appels.filter((a) => a.clientId === clientId).sort((a, b) => b.date.localeCompare(a.date)),
    [appels, clientId]
  )
  const clientLeads = useMemo(
    () => leads.filter((l) => l.clientId === clientId).sort((a, b) => b.dateCapture.localeCompare(a.dateCapture)),
    [leads, clientId]
  )

  const tauxConversion = useMemo(() => {
    if (!clientAppels.length) return 0
    const avecRdv = clientAppels.filter((a) => a.resultat === 'rdv_pris').length
    return Math.round((avecRdv / clientAppels.length) * 100)
  }, [clientAppels])

  if (!client) {
    return (
      <div className="page">
        <button type="button" className="back-link" onClick={onBack}>
          <ArrowLeftIcon width={15} height={15} /> Retour aux clients
        </button>
        <EmptyState icon="🔍" title="Client introuvable" subtitle="Ce client a peut-être été supprimé." />
      </div>
    )
  }

  const statutInfo = statusMeta(CLIENT_STATUSES, client.statut)

  return (
    <div className="page">
      <button type="button" className="back-link" onClick={onBack}>
        <ArrowLeftIcon width={15} height={15} /> Retour aux clients
      </button>

      <div className="panel">
        <div className="client-header">
          <div className="client-header-main">
            <span className="client-header-title">{client.nomCabinet}</span>
            <span className="client-header-meta">
              <span>{client.ville}</span>
              {client.dentisteResponsable && <span>· {client.dentisteResponsable}</span>}
              {client.telephone && <span>· {client.telephone}</span>}
            </span>
            <div className="client-header-badges">
              <Badge tone={statutInfo.color} label={statutInfo.label} />
              <Badge tone={client.agentActif ? 'teal' : 'muted'} label={client.agentActif ? 'Agent IA actif' : 'Agent IA inactif'} />
              <Badge tone="muted" label={`Client depuis le ${formatDate(client.dateDebutAbonnement)}`} />
            </div>
          </div>
          <button type="button" className="icon-btn" onClick={() => openEdit('client', client)} aria-label="Modifier">
            <EditIcon width={16} height={16} />
          </button>
        </div>

        <div className="mini-stat-grid" style={{ marginTop: 16 }}>
          <div className="mini-stat">
            <div className="mini-stat-label">Rendez-vous</div>
            <div className="mini-stat-value">{clientRdv.length}</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-label">Appels</div>
            <div className="mini-stat-value">{clientAppels.length}</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-label">Leads</div>
            <div className="mini-stat-value">{clientLeads.length}</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-label">Taux conversion appel→RDV</div>
            <div className="mini-stat-value">{tauxConversion}%</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="section-title">
          Rendez-vous
          <QuickAddButton label="Nouveau RDV" onClick={() => openCreate('rdv', { clientId, statut: 'confirmé', source: 'appel', dateHeure: nowISODateTime() })} />
        </div>
        {clientRdv.length === 0 ? (
          <EmptyState icon="📅" title="Aucun RDV pour ce client" />
        ) : (
          <div className="list-rows">
            {clientRdv.map((rdv) => {
              const info = statusMeta(RDV_STATUSES, rdv.statut)
              return (
                <div key={rdv.id} className="list-row" onClick={() => openEdit('rdv', rdv)}>
                  <div className="list-row-main">
                    <span className="list-row-title">{rdv.patientNom} — {rdv.typeSoin}</span>
                    <span className="list-row-meta">{formatDateTime(rdv.dateHeure)}</span>
                  </div>
                  <Badge tone={info.color} label={info.label} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="panel">
        <div className="section-title">Appels & conversations</div>
        {clientAppels.length === 0 ? (
          <EmptyState icon="📞" title="Aucun appel pour ce client" />
        ) : (
          <div className="list-rows">
            {clientAppels.map((appel) => {
              const info = statusMeta(APPEL_RESULTATS, appel.resultat)
              return (
                <div key={appel.id} className="list-row" onClick={() => openView('transcript', appel)}>
                  <div className="list-row-main">
                    <span className="list-row-title">{appel.resume}</span>
                    <span className="list-row-meta">
                      <span>{formatDateTime(appel.date)}</span>
                      <span>{formatDuration(appel.duree)}</span>
                    </span>
                  </div>
                  <Badge tone={info.color} label={info.label} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="panel">
        <div className="section-title">
          Leads
          <QuickAddButton label="Nouveau lead" onClick={() => openCreate('lead', { clientId, statut: 'nouveau', source: 'appel', dateCapture: todayISO() })} />
        </div>
        {clientLeads.length === 0 ? (
          <EmptyState icon="🎯" title="Aucun lead pour ce client" />
        ) : (
          <div className="list-rows">
            {clientLeads.map((lead) => {
              const info = statusMeta(LEAD_STATUSES, lead.statut)
              return (
                <div key={lead.id} className="list-row" onClick={() => openEdit('lead', lead)}>
                  <div className="list-row-main">
                    <span className="list-row-title">{lead.nom}</span>
                    <span className="list-row-meta">{formatDate(lead.dateCapture)}</span>
                  </div>
                  <Badge tone={info.color} label={info.label} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
