import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import { LEAD_SOURCES, LEAD_STATUSES } from '../utils/constants.js'
import { todayISO } from '../utils/formatters.js'

const BLANK = {
  clientId: '',
  nom: '',
  telephone: '',
  email: '',
  source: 'appel',
  statut: 'nouveau',
  dateCapture: todayISO(),
  notes: '',
}

export default function LeadModal() {
  const { modal, closeModal } = useModal()
  const { clients, addLead, updateLead } = useApp()
  const isOpen = modal.type === 'lead'
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
    if (!form.nom.trim()) nextErrors.nom = 'Le nom est requis.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    if (isEdit) {
      updateLead(modal.editId, form)
    } else {
      addLead(form)
    }
    closeModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={isEdit ? 'Modifier le lead' : 'Nouveau lead'}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
          <button type="submit" form="lead-form" className="btn btn-primary">Enregistrer</button>
        </>
      }
    >
      <form id="lead-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="form-field">
          <label className="form-label" htmlFor="ld-client">Cabinet client <span className="required">*</span></label>
          <select id="ld-client" className="form-control" value={form.clientId} onChange={(e) => setField('clientId', e.target.value)}>
            <option value="">— Sélectionner —</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.nomCabinet} · {c.ville}</option>)}
          </select>
          {errors.clientId && <span className="form-error">{errors.clientId}</span>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="ld-nom">Nom <span className="required">*</span></label>
          <input id="ld-nom" className="form-control" value={form.nom} onChange={(e) => setField('nom', e.target.value)} />
          {errors.nom && <span className="form-error">{errors.nom}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="ld-tel">Téléphone</label>
            <input id="ld-tel" className="form-control" value={form.telephone} onChange={(e) => setField('telephone', e.target.value)} />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="ld-email">Email</label>
            <input id="ld-email" type="email" className="form-control" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="ld-source">Source</label>
            <select id="ld-source" className="form-control" value={form.source} onChange={(e) => setField('source', e.target.value)}>
              {LEAD_SOURCES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="ld-statut">Statut</label>
            <select id="ld-statut" className="form-control" value={form.statut} onChange={(e) => setField('statut', e.target.value)}>
              {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="ld-date">Date de capture</label>
          <input id="ld-date" type="date" className="form-control" value={form.dateCapture} onChange={(e) => setField('dateCapture', e.target.value)} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="ld-notes">Notes</label>
          <textarea id="ld-notes" className="form-control" value={form.notes} onChange={(e) => setField('notes', e.target.value)} />
        </div>
      </form>
    </Modal>
  )
}
