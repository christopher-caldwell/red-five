export const links: Link[] = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/servers',
    label: 'Servers'
  }
]

export interface Link {
  to: string
  label: string
}
