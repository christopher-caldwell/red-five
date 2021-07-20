import format from 'date-fns/format'

const formatString = 'iii - MMM DD - hh:mm a'

/** Attempts to create a date from the input, returns a `-` on error */
export const standardFormatDate = (rawDate: string | number): string => {
  try {
    console.log('rawDate', rawDate)
    const dateObj = new Date(rawDate)
    return format(dateObj, formatString, { useAdditionalDayOfYearTokens: true })
  } catch (e) {
    console.error(e)
    return '-'
  }
}
