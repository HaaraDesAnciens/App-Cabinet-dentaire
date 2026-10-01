import { useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import BarChart from '../components/BarChart.jsx'
import RankedBars from '../components/RankedBars.jsx'
import ResultBreakdown from '../components/ResultBreakdown.jsx'
import StatCard from '../components/StatCard.jsx'
import { APPEL_RESULTATS } from '../utils/constants.js'
import { weeklyBuckets, formatCurrency } from '../utils/formatters.js'
import { ClockIcon, TrendingUpIcon, PhoneIcon } from '../components/icons.jsx'

const RESULT_COLORS = {
  rdv_pris: 'var(--color-success)',
  information_donnée: 'var(--color-accent)',
  transfert_humain: 'var(--color-purple)',
  sans_suite: 'var(--color-text-muted)',
}

// Rough estimate used only to illustrate ROI: cost of staff time an
// assistant would have spent on these calls instead of the AI agent.
const TARIF_HORAIRE_ESTIME = 25

export default function Stats() {
  const { clients, appels, settings } = useApp()

  const weekly = useMemo(() => weeklyBuckets(appels.map((a) => a.date), 8), [appels])

  const conversionParClient = useMemo(() => {
    return clients
      .map((c) => {
        const clientAppels = appels.filter((a) => a.clientId === c.id)
        if (!clientAppels.length) return null
        const avecRdv = clientAppels.filter((a) => a.resultat === 'rdv_pris').length
        const pct = Math.round((avecRdv / clientAppels.length) * 100)
        return { label: c.nomCabinet, value: pct, display: `${pct}%` }
      })
      .filter(Boolean)
      .sort((a, b) => b.value - a.value)
  }, [clients, appels])

  const topClients = useMemo(() => {
    return clients
      .map((c) => {
        const count = appels.filter((a) => a.clientId === c.id).length
        return { label: c.nomCabinet, value: count, display: `${count}` }
      })
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }, [clients, appels])

  const resultSegments = useMemo(
    () =>
      APPEL_RESULTATS.map((r) => ({
        label: r.label,
        count: appels.filter((a) => a.resultat === r.value).length,
        color: RESULT_COLORS[r.value],
      })),
    [appels]
  )

  const tempsEconomiseHeures = useMemo(
    () => appels.reduce((sum, a) => sum + Number(a.duree || 0), 0) / 3600,
    [appels]
  )
  const valeurEstimee = tempsEconomiseHeures * TARIF_HORAIRE_ESTIME

  return (
    <div className="page">
      <div className="page-header">
        <h1>Statistiques & ROI</h1>
      </div>

      <div className="stat-grid">
        <StatCard label="Appels traités (total)" value={appels.length} icon={<PhoneIcon width={18} height={18} />} tone="teal" />
        <StatCard label="Temps estimé économisé" value={`${tempsEconomiseHeures.toFixed(1)} h`} icon={<ClockIcon width={18} height={18} />} tone="info" />
        <StatCard
          label="Valeur estimée (temps économisé)"
          value={formatCurrency(valeurEstimee, settings.devise)}
          icon={<TrendingUpIcon width={18} height={18} />}
          tone="success"
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Appels traités par semaine (8 dernières semaines)</span>
        </div>
        <BarChart data={weekly} color="var(--color-accent)" />
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Taux de conversion appel → RDV par client</span>
        </div>
        <RankedBars items={conversionParClient} />
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Répartition des résultats d'appels</span>
        </div>
        <ResultBreakdown segments={resultSegments} />
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Top 5 clients les plus actifs</span>
        </div>
        <RankedBars items={topClients} />
      </div>
    </div>
  )
}
