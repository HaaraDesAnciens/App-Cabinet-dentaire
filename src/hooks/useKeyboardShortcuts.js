import { useEffect } from 'react'

const EDITABLE_TAGS = ['INPUT', 'TEXTAREA', 'SELECT']

// Global shortcuts: "n" triggers onNew() unless the user is typing in a
// field; "Escape" triggers onEscape().
export function useKeyboardShortcuts({ onNew, onEscape }) {
  useEffect(() => {
    function handleKeyDown(e) {
      const isEditable = EDITABLE_TAGS.includes(e.target.tagName) || e.target.isContentEditable

      if (e.key === 'Escape') {
        onEscape?.()
        return
      }

      if ((e.key === 'n' || e.key === 'N') && !isEditable && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        onNew?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNew, onEscape])
}
