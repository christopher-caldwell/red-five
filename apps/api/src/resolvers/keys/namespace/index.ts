import { Resolver, Key, NamespaceKeyResult, NameSpacedKeys } from '@_api/interfaces'
import { keys } from '../get-all'

export const namespacedKeys: Resolver<NamespaceKeyResult> = async (_, { Client }) => {
  const allKeys = await keys({}, { Client })
  return {
    allKeys,
    namespaced: aggregateKeys(allKeys)
  }
}

/** This is gross. What this does is put all the namespaced keys into a namespace key, while putting the others in a key called `root`
 * The result is n number of namespaces, with one key as root. The root keys are not namespaced
 * @example
 * {
 * root: [...],
 * publisher: [...],
 * dentist: [...]
 * }
 */
const groupKeysByNamespace = (allKeys: Key[]): Record<string, Key[]> => {
  const keyValuePairOfNamespacedKeys = allKeys.reduce((total, keyConfig) => {
    const { key } = keyConfig
    const keyNameSpaces = key.split(':')
    if (!keyNameSpaces[1]) return { ...total, root: [...(total.root || []), keyConfig] }
    return {
      ...total,
      [keyNameSpaces[0]]: [...(total[keyNameSpaces[0]] || []), keyConfig]
    }
  }, {} as Record<string, Key[]>)
  return keyValuePairOfNamespacedKeys
}

const flattenKeysIntoNamespaces = (keyValuePairOfNamespacedKeys: Record<string, Key[]>): NameSpacedKeys[] => {
  const flattenedKeys: NameSpacedKeys[] = Object.entries(keyValuePairOfNamespacedKeys).map(([key, value]) => {
    return {
      name: key,
      keys: value
    }
  })
  return flattenedKeys
}

const aggregateKeys = (allKeys: Key[]) => {
  const keyValuePairOfNamespacedKeys = groupKeysByNamespace(allKeys)
  return flattenKeysIntoNamespaces(keyValuePairOfNamespacedKeys)
}
