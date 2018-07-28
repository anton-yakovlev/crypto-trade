import { createActions } from 'redux-actions';

export const {
  transactions: {
    fetchTransactionsRequest,
    fetchTransactionsSuccess,
    fetchTransactionsFailure
  }
} = createActions({
  TRANSACTIONS: {
    FETCH_TRANSACTIONS_REQUEST: null,
    FETCH_TRANSACTIONS_SUCCESS: null,
    FETCH_TRANSACTIONS_FAILURE: null
  }
});
