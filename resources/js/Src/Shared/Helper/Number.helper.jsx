export const numberFormat = (number) => {
  return new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(
    number,
  )
}