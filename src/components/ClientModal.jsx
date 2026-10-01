import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useModal } from '../context/ModalContext.jsx'
import { CLIENT_STATUSES, CLIENT_PLANS } from '../utils/constants.js'
import { todayISO } from '../utils/formatters.js'

const BLANK = {
  nomCabinet: '',
  ville: '',
  dentisteResponsable: '',
  email: '',
  telephone: '',
  statut: 'actif',
  plan: 'pro',
  dateDebutAbonnement: todayISO(),
  agentActif: true,
  notes: '',
}

export default function ClientModal() {
  const { modal, closeModal } = useModal()
  const { addClient, updateClient } = useApp()
  const isOpen = modal.type === 'client'
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
    if (!form.nomCabinet.trim()) nextErrors.nomCabinet = 'Le nom du cabinet est requis.'
    if (!form.ville.trim()) nextErrors.ville = 'La ville est requise.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    if (isEdit) {
      updateClient(modal.editId, form)
    } else {
      addClient(form)
    }
    closeModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={isEdit ? 'Modifier le client' : 'Nouveau client'}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
          <button type="submit" form="client-form" className="btn btn-primary">Enregistrer</button>
        </>
      }
    >
      <form id="client-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="form-field">
          <label className="form-label" htmlFor="cl-nom">Nom du cabinet <span className="required">*</span></label>
          <input id="cl-nom" className="form-control" value={form.nomCabinet} onChange={(e) => setField('nomCabinet', e.target.value)} />
          {errors.nomCabinet && <span className="form-error">{errors.nomCabinet}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="cl-ville">Ville <span className="required">*</span></label>
            <input id="cl-ville" className="form-control" value={form.ville} onChange={(e) => setField('ville', e.target.value)} />
            {errors.ville && <span className="form-error">{errors.ville}</span>}
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="cl-dentiste">Dentiste responsable</label>
            <input id="cl-dentiste" className="form-control" value={form.dentisteResponsable} onChange={(e) => setField('dentisteResponsable', e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="cl-email">Email</label>
            <input id="cl-email" type="email" className="form-control" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="cl-tel">Téléphone</label>
            <input id="cl-tel" className="form-control" value={form.telephone} onChange={(e) => setField('telephone', e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="cl-statut">Statut</label>
            <select id="cl-statut" className="form-control" value={form.statut} onChange={(e) => setField('statut', e.target.value)}>
              {CLIENT_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="cl-plan">Plan</label>
            <select id="cl-plan" className="form-control" value={form.plan} onChange={(e) => setField('plan', e.target.value)}>
              {CLIENT_PLANS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="cl-date">Date de début d'abonnement</label>
            <input id="cl-date" type="date" className="form-control" value={form.dateDebutAbonnement} onChange={(e) => setField('dateDebutAbonnement', e.target.value)} />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="cl-agent">Agent IA</label>
            <select
              id="cl-agent"
              className="form-control"
              value={form.agentActif ? 'actif' : 'inactif'}
              onChange={(e) => setField('agentActif', e.target.value === 'actif')}
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="cl-notes">Notes</label>
          <textarea id="cl-notes" className="form-control" value={form.notes} onChange={(e) => setField('notes', e.target.value)} />
        </div>
      </form>
    </Modal>
  )
}
