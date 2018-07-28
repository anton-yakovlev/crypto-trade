import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure } from './actions';

const isLoading = handleActions(
  {
    [fetchWalletRequest]: () => true,
    [fetchWalletSuccess]: () => false,
    [fetchWalletFailure]: () => false
  },
  false
);

const error = handleActions(
  {
    [fetchWalletRequest]: () => false,
    [fetchWalletSuccess]: () => false,
    [fetchWalletFailure]: (_state, action) => action.payload
  },
  false
);

const coins = handleActions(
  {
    [fetchWalletSuccess]: (_state, action) => action.payload
  },
  {}
);

export default combineReducers({ isLoading, error, coins });
