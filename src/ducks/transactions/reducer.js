import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchTransactionsRequest, fetchTransactionsSuccess, fetchTransactionsFailure } from './actions';

const isLoading = handleActions(
  {
    [fetchTransactionsRequest]: () => true,
    [fetchTransactionsSuccess]: () => false,
    [fetchTransactionsFailure]: () => false,
  },
  false
);

const records = handleActions(
  {
    [fetchTransactionsSuccess]: (_state, action) => action.payload
  },
  []
);

export default combineReducers({ isLoading, records });
