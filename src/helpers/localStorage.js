import { Transaction } from '../models/Transaction'

const STORAGE_KEY = 'USER_TX'

export const getTransactions = () => {
  const transactions = window.localStorage.getItem(STORAGE_KEY)
  if (transactions) {
    return JSON.parse(transactions).map(tx => new Transaction(tx))
  }
  return []
}

export const updateTransactions = (transaction) => {
  const currentTransactions = getTransactions()

  // Check if transaction is saved already
  const index = currentTransactions.findIndex(tx => tx.hash === transaction.hash)

  const newTransactions = (index >= 0)
    ? [
      ...currentTransactions.slice(0, index),
      transaction,
      ...currentTransactions.slice(index + 1, currentTransactions.length)
    ]
    : [
      ...currentTransactions,
      transaction
    ]

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions))
}

export const clearTransactions = () => {
    window.localStorage.removeItem(STORAGE_KEY)
}