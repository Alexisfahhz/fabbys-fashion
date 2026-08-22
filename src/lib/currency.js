// Multi-currency support: NGN (base), USD, and GBP with real-time conversion & locale formatting.

export const CURRENCIES = [
  { code: 'NGN', symbol: '₦', label: 'NGN (₦)', rate: 1 },
  { code: 'USD', symbol: '$', label: 'USD ($)', rate: 1 / 1500 },
  { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 1 / 1950 },
]

export function formatPrice(amountInNGN, currencyCode = 'NGN') {
  const cur = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0]
  const converted = Math.round(amountInNGN * cur.rate)

  if (currencyCode === 'NGN') {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(converted)
  }

  if (currencyCode === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(converted)
  }

  if (currencyCode === 'GBP') {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(converted)
  }

  return `${cur.symbol}${converted.toLocaleString()}`
}
