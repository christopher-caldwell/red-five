import { Routes } from '@_ui/router/routes'

export const links: Link[] = [
  {
    to: Routes.Keys,
    label: 'Keys'
  },
  // {
  //   to: Routes.Health,
  //   label: 'Health'
  // },
  {
    to: Routes.CLI,
    label: 'CLI'
  },
  {
    to: Routes.Monitor,
    label: 'Monitor'
  }
]

export interface Link {
  to: Routes
  label: string
}
