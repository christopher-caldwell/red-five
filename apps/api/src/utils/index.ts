export const stitchSchema = (...schemas: string[]): string => {
  return schemas.reduce((accumulator, currentValue) => accumulator + '\n' + currentValue, '')
}

export const stitchArrayValuesIntoString = (values: string[] | string, shouldBeAllOnOneLine = false): string => {
  if (!Array.isArray(values)) return values
  const delimiter = shouldBeAllOnOneLine ? '' : '\n'
  return values.reduce((fullString, segment) => {
    return fullString + delimiter + segment
  }, '')
}

export * from './cli'
