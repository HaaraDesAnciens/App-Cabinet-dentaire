// Minimal inline SVG icon set — avoids pulling in an icon-library dependency.
const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const PlusIcon = (props) => (
  <svg {...base} {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
)

export const MenuIcon = (props) => (
  <svg {...base} {...props}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
)

export const CloseIcon = (props) => (
  <svg {...base} {...props}><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>
)

export const EditIcon = (props) => (
  <svg {...base} {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
)

export const TrashIcon = (props) => (
  <svg {...base} {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
)

export const ChevronDownIcon = (props) => (
  <svg {...base} {...props}><polyline points="6 9 12 15 18 9" /></svg>
)

export const CheckIcon = (props) => (
  <svg {...base} {...props}><polyline points="20 6 9 17 4 12" /></svg>
)

export const ArrowLeftIcon = (props) => (
  <svg {...base} {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
)

export const DashboardIcon = (props) => (
  <svg {...base} {...props}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
)

export const ClientsIcon = (props) => (
  <svg {...base} {...props}><path d="M3 21V9l9-6 9 6v12" /><path d="M9 21v-7h6v7" /></svg>
)

export const CalendarIcon = (props) => (
  <svg {...base} {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
)

export const PhoneIcon = (props) => (
  <svg {...base} {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
)

export const LeadsIcon = (props) => (
  <svg {...base} {...props}><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" /></svg>
)

export const StatsIcon = (props) => (
  <svg {...base} {...props}><line x1="4" y1="20" x2="20" y2="20" /><rect x="6" y="12" width="3" height="8" rx="1" /><rect x="11" y="7" width="3" height="13" rx="1" /><rect x="16" y="3" width="3" height="17" rx="1" /></svg>
)

export const SettingsIcon = (props) => (
  <svg {...base} {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z" /></svg>
)

export const ClockIcon = (props) => (
  <svg {...base} {...props}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></svg>
)

export const TrendingUpIcon = (props) => (
  <svg {...base} {...props}><polyline points="3 17 9 11 13 15 21 6" /><polyline points="14 6 21 6 21 13" /></svg>
)

export const MessageIcon = (props) => (
  <svg {...base} {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
)
