import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Minimal bag store: no cart backend exists yet (scope: nav + hero), so the
// provider holds the UI state and a data-driven items list. addItem/setQty/
// removeItem are the contract product pages will call once they exist.
const BagContext = createContext(null)

export function BagProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { qty: 1, ...item }]
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const openBag = useCallback(() => setOpen(true), [])
  const closeBag = useCallback(() => setOpen(false), [])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  )

  const value = useMemo(
    () => ({ items, count, subtotal, open, addItem, setQty, removeItem, openBag, closeBag }),
    [items, count, subtotal, open, addItem, setQty, removeItem, openBag, closeBag]
  )

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

export function useBag() {
  const ctx = useContext(BagContext)
  if (!ctx) throw new Error('useBag must be used inside BagProvider')
  return ctx
}

export function formatPrice(n) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(n)
}
