import { monitorMessage } from './monitor'
import { monitoringStatus } from './monitoring-status'
import { toggleMonitoring } from './toggle-monitoring'

// Have to break the import / export pattern here due to subscriptions
export const monitoringResolvers = {
  monitoringStatus,
  toggleMonitoring
}

export const monitoringSubscriptions = {
  monitorMessage
}
