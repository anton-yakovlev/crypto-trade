export const getIsLoading = state => state.transactions.isLoading
export const getTransactionsByCurrency = state => {
  const currency = state.currency.selected;
  return state.transactions.records.filter(item => item.hasOwnProperty(currency + '_delta'));
}