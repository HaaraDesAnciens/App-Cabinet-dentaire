import Modal from './Modal.jsx'
import Badge from './Badge.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import { APPEL_CANAUX, APPEL_RESULTATS, APPEL_SENTIMENTS, statusMeta, clientName } from '../utils/constants.js'
import { formatDateTime, formatDuration } from '../utils/formatters.js'

// Read-only view of a call/conversation: summary, badges and full transcript.
export default function TranscriptModal() {
  const { modal, closeModal } = useModal()
  const { clients } = useApp()
  const isOpen = modal.type === 'transcript'
  const appel = modal.initialData

  if (!isOpen || !appel) return null

  const resultatInfo = statusMeta(APPEL_RESULTATS, appel.resultat)
  const sentimentInfo = statusMeta(APPEL_SENTIMENTS, appel.sentiment)
  const canalInfo = APPEL_CANAUX.find((c) => c.value === appel.canal)

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Détail de la conversation"
      wide
      footer={<button type="button" className="btn btn-secondary" onClick={closeModal}>Fermer</button>}
    >
      <div className="form-field">
        <span className="form-label">Cabinet</span>
        <span className="cell-primary">{clientName(clients, appel.clientId)}</span>
      </div>

      <div className="list-row-meta" style={{ fontSize: 13 }}>
        <span>{formatDateTime(appel.date)}</span>
        <span>· {canalInfo?.label}</span>
        <span>· {formatDuration(appel.duree)}</span>
        <Badge tone={resultatInfo.color} label={resultatInfo.label} />
        <Badge tone={sentimentInfo.color} label={sentimentInfo.label} />
      </div>

      <div className="form-field">
        <span className="form-label">Résumé</span>
        <div className="transcript-box">{appel.resume}</div>
      </div>

      <div className="form-field">
        <span className="form-label">Transcript complet</span>
        <div className="transcript-box">{appel.transcript || 'Pas de transcript disponible.'}</div>
      </div>
    </Modal>
  )
}
