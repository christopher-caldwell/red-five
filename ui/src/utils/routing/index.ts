import { stringify } from 'query-string'

import { Routes } from '@/router/routes'

export const keyActionConfirmation = {
  pathname: Routes.Keys,
  search: '?' + stringify({ confirmation: true })
}
