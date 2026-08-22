import { createContext, useContext } from 'react'

export const BagContext = createContext(null)

export function useBag() {
  const ctx = useContext(BagContext)
  if (!ctx) throw new Error('useBag must be used inside BagProvider')
  return ctx
}
