import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { CLIENT_PLANS } from '../utils/constants.js'

const DEVISES = ['€', '$', '£']

export default function Settings() {
  const { settings, updateSettings } = useApp()
  const [savedHint, setSavedHint] = useState(false)

  function handleChange(field, value) {
    updateSettings({ [field]: value })
    setSavedHint(true)
    window.clearTimeout(handleChange._t)
    handleChange._t = window.setTimeout(() => setSavedHint(false), 1500)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Paramètres</h1>
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Agence</span>
        </div>

        <div className="settings-form">
          <div className="form-field">
            <label className="form-label" htmlFor="s-nom">Nom de l'agence</label>
            <input
              id="s-nom"
              className="form-control"
              value={settings.nomAgence}
              onChange={(e) => handleChange('nomAgence', e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="s-email">Email de contact</label>
            <input
              id="s-email"
              type="email"
              className="form-control"
              value={settings.emailContact}
              onChange={(e) => handleChange('emailContact', e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="s-plan">Plan par défaut (nouveaux clients)</label>
            <select
              id="s-plan"
              className="form-control"
              value={settings.planParDefaut}
              onChange={(e) => handleChange('planParDefaut', e.target.value)}
            >
              {CLIENT_PLANS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="s-essai">Durée d'essai (jours)</label>
            <input
              id="s-essai"
              type="number"
              min="0"
              className="form-control"
              value={settings.dureeEssaiJours}
              onChange={(e) => handleChange('dureeEssaiJours', Number(e.target.value))}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="s-devise">Devise</label>
            <select
              id="s-devise"
              className="form-control"
              value={settings.devise}
              onChange={(e) => handleChange('devise', e.target.value)}
            >
              {DEVISES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {savedHint && <span className="settings-saved-hint">Modifications enregistrées</span>}
        </div>
      </div>
    </div>
  )
}
