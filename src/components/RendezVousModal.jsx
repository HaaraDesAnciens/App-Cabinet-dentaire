import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import { RDV_TYPES, RDV_STATUSES, RDV_SOURCES } from '../utils/constants.js'
import { nowISODateTime } from '../utils/formatters.js'

const BLANK = {
  clientId: '',
  patientNom: '',
  patientTelephone: '',
  dateHeure: nowISODateTime(),
  typeSoin: 'Consultation',
  statut: 'confirmé',
  source: 'appel',
  notes: '',
}

export default function RendezVousModal() {
  const { modal, closeModal } = useModal()
  const { clients, addRendezVous, updateRendezVous } = useApp()
  const isOpen = modal.type === 'rdv'
  const isEdit = Boolean(modal.editId)

  const [form, setForm] = useState(BLANK)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      setForm({ ...BLANK, ...modal.initialData })
      setErrors({})
    }
  }, [isOpen, modal.initialData])

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!form.clientId) nextErrors.clientId = 'Le cabinet client est requis.'
    if (!form.patientNom.trim()) nextErrors.patientNom = 'Le nom du patient est requis.'
    if (!form.dateHeure) nextErrors.dateHeure = 'La date et l\'heure sont requises.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    if (isEdit) {
      updateRendezVous(modal.editId, form)
    } else {
      addRendezVous(form)
    }
    closeModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={isEdit ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
          <button type="submit" form="rdv-form" className="btn btn-primary">Enregistrer</button>
        </>
      }
    >
      <form id="rdv-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="form-field">
          <label className="form-label" htmlFor="rdv-client">Cabinet client <span className="required">*</span></label>
          <select id="rdv-client" className="form-control" value={form.clientId} onChange={(e) => setField('clientId', e.target.value)}>
            <option value="">— Sélectionner —</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.nomCabinet} · {c.ville}</option>)}
          </select>
          {errors.clientId && <span className="form-error">{errors.clientId}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="rdv-patient">Patient <span className="required">*</span></label>
            <input id="rdv-patient" className="form-control" value={form.patientNom} onChange={(e) => setField('patientNom', e.target.value)} />
            {errors.patientNom && <span className="form-error">{errors.patientNom}</span>}
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="rdv-tel">Téléphone</label>
            <input id="rdv-tel" className="form-control" value={form.patientTelephone} onChange={(e) => setField('patientTelephone', e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="rdv-date">Date et heure <span className="required">*</span></label>
          <input id="rdv-date" type="datetime-local" className="form-control" value={form.dateHeure} onChange={(e) => setField('dateHeure', e.target.value)} />
          {errors.dateHeure && <span className="form-error">{errors.dateHeure}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="rdv-type">Type de soin</label>
            <select id="rdv-type" className="form-control" value={form.typeSoin} onChange={(e) => setField('typeSoin', e.target.value)}>
              {RDV_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="rdv-statut">Statut</label>
            <select id="rdv-statut" className="form-control" value={form.statut} onChange={(e) => setField('statut', e.target.value)}>
              {RDV_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="rdv-source">Source</label>
          <select id="rdv-source" className="form-control" value={form.source} onChange={(e) => setField('source', e.target.value)}>
            {RDV_SOURCES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="rdv-notes">Notes</label>
          <textarea id="rdv-notes" className="form-control" value={form.notes} onChange={(e) => setField('notes', e.target.value)} />
        </div>
      </form>
    </Modal>
  )
}
