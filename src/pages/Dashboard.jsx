import { useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import StatCard from '../components/StatCard.jsx'
import Badge from '../components/Badge.jsx'
import EmptyState from '../components/EmptyState.jsx'
import QuickAddButton from '../components/QuickAddButton.jsx'
import { APPEL_RESULTATS, LEAD_SOURCES, statusMeta, clientName } from '../utils/constants.js'
import { formatDateTime, formatDuration, isThisMonth, isWithinNextDays, todayISO, nowISODateTime } from '../utils/formatters.js'
import { ClientsIcon, PhoneIcon, CalendarIcon, TrendingUpIcon, LeadsIcon, ClockIcon } from '../components/icons.jsx'

export default function Dashboard({ onNavigate }) {
  const { clients, rendezVous, appels, leads } = useApp()
  const { openCreate } = useModal()

  const stats = useMemo(() => {
    const clientsActifs = clients.filter((c) => c.statut === 'actif').length
    const appelsCeMois = appels.filter((a) => isThisMonth(a.date)).length
    const rdvCeMois = rendezVous.filter((r) => isThisMonth(r.dateHeure)).length
    const appelsAvecRdv = appels.filter((a) => a.resultat === 'rdv_pris').length
    const tauxConversion = appels.length ? Math.round((appelsAvecRdv / appels.length) * 100) : 0
    const leadsARelancer = leads.filter((l) => l.statut === 'nouveau' || l.statut === 'contacté').length
    const tempsEconomiseHeures = (appels.reduce((sum, a) => sum + Number(a.duree || 0), 0) / 3600).toFixed(1)

    return { clientsActifs, appelsCeMois, rdvCeMois, tauxConversion, leadsARelancer, tempsEconomiseHeures }
  }, [clients, rendezVous, appels, leads])

  const rdvAVenir = useMemo(
    () =>
      rendezVous
        .filter((r) => r.statut === 'confirmé' && isWithinNextDays(r.dateHeure, 7))
        .sort((a, b) => a.dateHeure.localeCompare(b.dateHeure))
        .slice(0, 5),
    [rendezVous]
  )

  const derniersAppels = useMemo(
    () => [...appels].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [appels]
  )

  const leadsARelancerList = useMemo(
    () =>
      leads
        .filter((l) => l.statut === 'nouveau' || l.statut === 'contacté')
        .sort((a, b) => a.dateCapture.localeCompare(b.dateCapture))
        .slice(0, 5),
    [leads]
  )

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stat-grid">
        <StatCard
          label="Clients actifs"
          value={stats.clientsActifs}
          icon={<ClientsIcon width={18} height={18} />}
          tone="accent"
          onAdd={() => openCreate('client', { statut: 'actif', plan: 'pro', dateDebutAbonnement: todayISO(), agentActif: true })}
          addLabel="Nouveau client"
        />
        <StatCard label="Appels traités ce mois" value={stats.appelsCeMois} icon={<PhoneIcon width={18} height={18} />} tone="teal" />
        <StatCard label="RDV pris ce mois" value={stats.rdvCeMois} icon={<CalendarIcon width={18} height={18} />} tone="success" />
        <StatCard label="Taux de conversion appel→RDV" value={`${stats.tauxConversion}%`} icon={<TrendingUpIcon width={18} height={18} />} tone="purple" />
        <StatCard label="Leads à relancer" value={stats.leadsARelancer} icon={<LeadsIcon width={18} height={18} />} tone="warning" />
        <StatCard label="Temps estimé économisé" value={`${stats.tempsEconomiseHeures} h`} icon={<ClockIcon width={18} height={18} />} tone="info" />
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">RDV à venir (7 prochains jours)</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a className="panel-link" href="#" onClick={(e) => { e.preventDefault(); onNavigate('rendezvous') }}>Voir tous les RDV</a>
            <QuickAddButton label="Nouveau RDV" onClick={() => openCreate('rdv', { statut: 'confirmé', source: 'appel', dateHeure: nowISODateTime() })} />
          </div>
        </div>
        {rdvAVenir.length === 0 ? (
          <EmptyState icon="📅" title="Aucun RDV à venir" subtitle="Les prochains rendez-vous confirmés apparaîtront ici." />
        ) : (
          <div className="list-rows">
            {rdvAVenir.map((rdv) => (
              <div key={rdv.id} className="list-row is-static">
                <div className="list-row-main">
                  <span className="list-row-title">{rdv.patientNom} — {rdv.typeSoin}</span>
                  <span className="list-row-meta">
                    <span>{clientName(clients, rdv.clientId)}</span>
                    <span>{formatDateTime(rdv.dateHeure)}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Derniers appels</span>
          <a className="panel-link" href="#" onClick={(e) => { e.preventDefault(); onNavigate('appels') }}>Voir tous les appels</a>
        </div>
        {derniersAppels.length === 0 ? (
          <EmptyState icon="📞" title="Aucun appel enregistré" subtitle="Les conversations gérées par l'agent apparaîtront ici." />
        ) : (
          <div className="list-rows">
            {derniersAppels.map((appel) => {
              const resultatInfo = statusMeta(APPEL_RESULTATS, appel.resultat)
              return (
                <div key={appel.id} className="list-row is-static">
                  <div className="list-row-main">
                    <span className="list-row-title">{appel.resume}</span>
                    <span className="list-row-meta">
                      <span>{clientName(clients, appel.clientId)}</span>
                      <span>{formatDateTime(appel.date)}</span>
                      <span>{formatDuration(appel.duree)}</span>
                    </span>
                  </div>
                  <Badge tone={resultatInfo.color} label={resultatInfo.label} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Leads à relancer</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a className="panel-link" href="#" onClick={(e) => { e.preventDefault(); onNavigate('leads') }}>Voir tous les leads</a>
            <QuickAddButton label="Nouveau lead" onClick={() => openCreate('lead', { statut: 'nouveau', source: 'appel', dateCapture: todayISO() })} />
          </div>
        </div>
        {leadsARelancerList.length === 0 ? (
          <EmptyState icon="🎯" title="Aucun lead à relancer" subtitle="Les nouveaux prospects captés par l'agent apparaîtront ici." />
        ) : (
          <div className="list-rows">
            {leadsARelancerList.map((lead) => {
              const sourceInfo = LEAD_SOURCES.find((s) => s.value === lead.source)
              return (
                <div key={lead.id} className="list-row is-static">
                  <div className="list-row-main">
                    <span className="list-row-title">{lead.nom}</span>
                    <span className="list-row-meta">
                      <span>{clientName(clients, lead.clientId)}</span>
                      <span>{sourceInfo?.label}</span>
                    </span>
                  </div>
                  <Badge tone={lead.statut === 'nouveau' ? 'accent' : 'warning'} label={lead.statut === 'nouveau' ? 'Nouveau' : 'Contacté'} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
