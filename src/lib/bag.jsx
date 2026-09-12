import { useCallback, useEffect, useMemo, useState } from 'react'
import { CURRENCIES, formatPrice as formatCurrencyPrice } from './currency'
import { BagContext } from './bagContext'

const STORAGE_KEY_ITEMS = 'fabbys_bag_items'
const STORAGE_KEY_CURRENCY = 'fabbys_bag_currency'

export function BagProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_ITEMS)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(false)
  const [currency, setCurrency] = useState(() => {
    if (typeof window === 'undefined') return 'NGN'
    try {
      return window.localStorage.getItem(STORAGE_KEY_CURRENCY) || 'NGN'
    } catch {
      return 'NGN'
    }
  })
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  // Persist items to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  // Persist currency to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_CURRENCY, currency)
    } catch {
      // ignore
    }
  }, [currency])

  const showToast = useCallback((msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current))
    }, 3200)
  }, [])

  const addItem = useCallback((item, selectedSize = 'UK 10') => {
    setItems((prev) => {
      const itemKey = `${item.id}-${selectedSize}`
      const existing = prev.find((i) => i.itemKey === itemKey)
      if (existing) {
        return prev.map((i) => (i.itemKey === itemKey ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { qty: 1, itemKey, size: selectedSize, ...item }]
    })
    showToast(`Added "${item.title}" (${selectedSize}) to Bag`)
  }, [showToast])

  const setQty = useCallback((itemKey, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => (i.itemKey || i.id) !== itemKey)
        : prev.map((i) => ((i.itemKey || i.id) === itemKey ? { ...i, qty } : i))
    )
  }, [])

  const removeItem = useCallback((itemKey) => {
    setItems((prev) => prev.filter((i) => (i.itemKey || i.id) !== itemKey))
  }, [])

  const openBag = useCallback(() => setOpen(true), [])
  const closeBag = useCallback(() => setOpen(false), [])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  )

  const formatPrice = useCallback(
    (amountInNGN) => formatCurrencyPrice(amountInNGN, currency),
    [currency]
  )

  // Generates prefilled WhatsApp link for direct ordering
  const getWhatsAppOrderUrl = useCallback(() => {
    const phone = '2347011934913'
    if (items.length === 0) {
      return `https://wa.me/${phone}?text=${encodeURIComponent('Hello Fabbys Fashion, I would like to inquire about placing a custom order.')}`
    }
    const lines = items.map(
      (item, idx) =>
        `${idx + 1}. *${item.title}* (Size: ${item.size || 'M'}) × ${item.qty} — ${formatPrice(item.price * item.qty)}`
    )
    const text = `Hello Fabbys Fashion! I'd like to place an order for the following items:\n\n${lines.join('\n')}\n\n*Total:* ${formatPrice(subtotal)} (${currency})\n\nPlease advise on production lead time and payment details.`
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }, [items, subtotal, currency, formatPrice])

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      open,
      currency,
      setCurrency,
      currencies: CURRENCIES,
      quickViewProduct,
      setQuickViewProduct,
      toastMessage,
      addItem,
      setQty,
      removeItem,
      openBag,
      closeBag,
      formatPrice,
      getWhatsAppOrderUrl,
    }),
    [
      items,
      count,
      subtotal,
      open,
      currency,
      quickViewProduct,
      toastMessage,
      addItem,
      setQty,
      removeItem,
      openBag,
      closeBag,
      formatPrice,
      getWhatsAppOrderUrl,
    ]
  )

  return (
    <BagContext.Provider value={value}>
      {children}
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-live="polite"
          className="fixed bottom-6 right-6 z-90 flex items-center gap-3 rounded-2xl bg-ink px-5 py-3.5 text-porcelain shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span className="flex h-2 w-2 rounded-full bg-claret animate-pulse" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </aside>
      )}
    </BagContext.Provider>
  )
}
