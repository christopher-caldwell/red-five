export const links: Link[] = [
  {
    to: '/keys',
    label: 'Keys'
  },
  {
    to: '/health',
    label: 'Health'
  },
  {
    to: '/cli',
    label: 'CLI'
  },
  {
    to: '/connections',
    label: 'Connections'
  }
]

export interface Link {
  to: string
  label: string
}
