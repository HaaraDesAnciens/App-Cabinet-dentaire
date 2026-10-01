import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ModalContext = createContext(null)

const EMPTY_MODAL = { type: null, initialData: null, editId: null }

// Single source of truth for the entity modals (client/rdv/lead/appel/transcript)
// so every quick-action entry point (topbar menu, dashboard card "+", page-header
// "+", fiche client "+", keyboard shortcut) opens the exact same modal instance
// instead of duplicating modal code per trigger.
export function ModalProvider({ children }) {
  const [modal, setModal] = useState(EMPTY_MODAL)

  const openCreate = useCallback((type, initialData = {}) => {
    setModal({ type, initialData, editId: null })
  }, [])

  const openEdit = useCallback((type, entity) => {
    setModal({ type, initialData: entity, editId: entity.id })
  }, [])

  const openView = useCallback((type, entity) => {
    setModal({ type, initialData: entity, editId: entity.id })
  }, [])

  const closeModal = useCallback(() => setModal(EMPTY_MODAL), [])

  const value = useMemo(
    () => ({ modal, openCreate, openEdit, openView, closeModal }),
    [modal, openCreate, openEdit, openView, closeModal]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
