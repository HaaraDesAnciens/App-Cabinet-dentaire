import { useEffect } from 'react'
import { CloseIcon } from './icons.jsx'

// Generic modal shell (overlay + panel + header/body/footer slots). Escape
// and a backdrop click both close it; the specific entity modals supply
// title/body/footer. `wide` widens the panel (used for the transcript view).
export default function Modal({ isOpen, onClose, title, children, footer, wide = false }) {
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={`modal-panel ${wide ? 'is-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">
            <CloseIcon width={16} height={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}
