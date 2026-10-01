// Static reference data shared across the app: dropdown options and status
// metadata (label + color) used to render badges consistently everywhere.

export const CLIENT_STATUSES = [
  { value: 'actif', label: 'Actif', color: 'success' },
  { value: 'en_pause', label: 'En pause', color: 'warning' },
  { value: 'résilié', label: 'Résilié', color: 'danger' },
]

export const CLIENT_PLANS = [
  { value: 'starter', label: 'Starter', color: 'muted' },
  { value: 'pro', label: 'Pro', color: 'accent' },
  { value: 'premium', label: 'Premium', color: 'purple' },
]

export const RDV_TYPES = ['Consultation', 'Détartrage', 'Urgence', 'Devis', 'Autre']

export const RDV_STATUSES = [
  { value: 'confirmé', label: 'Confirmé', color: 'success' },
  { value: 'annulé', label: 'Annulé', color: 'danger' },
  { value: 'no_show', label: 'No-show', color: 'muted' },
  { value: 'terminé', label: 'Terminé', color: 'teal' },
]

export const RDV_SOURCES = [
  { value: 'appel', label: 'Appel' },
  { value: 'chat', label: 'Chat' },
  { value: 'site_web', label: 'Site web' },
]

export const APPEL_CANAUX = [
  { value: 'téléphone', label: 'Téléphone' },
  { value: 'chat', label: 'Chat' },
  { value: 'whatsapp', label: 'WhatsApp' },
]

export const APPEL_RESULTATS = [
  { value: 'rdv_pris', label: 'RDV pris', color: 'success' },
  { value: 'information_donnée', label: 'Information donnée', color: 'accent' },
  { value: 'transfert_humain', label: 'Transféré à un humain', color: 'purple' },
  { value: 'sans_suite', label: 'Sans suite', color: 'muted' },
]

export const APPEL_SENTIMENTS = [
  { value: 'positif', label: 'Positif', color: 'success' },
  { value: 'neutre', label: 'Neutre', color: 'muted' },
  { value: 'négatif', label: 'Négatif', color: 'danger' },
]

export const LEAD_SOURCES = [
  { value: 'appel', label: 'Appel' },
  { value: 'chat', label: 'Chat' },
  { value: 'site_web', label: 'Site web' },
  { value: 'publicité', label: 'Publicité' },
]

export const LEAD_STATUSES = [
  { value: 'nouveau', label: 'Nouveau', color: 'accent' },
  { value: 'contacté', label: 'Contacté', color: 'warning' },
  { value: 'rdv_pris', label: 'RDV pris', color: 'success' },
  { value: 'perdu', label: 'Perdu', color: 'danger' },
]

export function statusMeta(list, value) {
  return list.find((s) => s.value === value) || { label: value, color: 'muted' }
}

export function clientName(clients, clientId) {
  return clients.find((c) => c.id === clientId)?.nomCabinet || '—'
}
