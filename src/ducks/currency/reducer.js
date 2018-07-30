import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
  selectOffset,
  selectCurrency,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyError,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyError
} from './actions';

const btc = handleActions(
  {
    [fetchBtcSuccess]: (_state, action) => action.payload
  },
  []
);

const eth = handleActions(
  {
    [fetchEthSuccess]: (_state, action) => action.payload
  },
  []
);

const isBtcLoading = handleActions(
  {
    [fetchBtcRequest]: () => true,
    [fetchBtcSuccess]: () => false,
    [fetchBtcFailure]: () => false
  },
  false
);

const isEthLoading = handleActions(
  {
    [fetchEthRequest]: () => true,
    [fetchEthSuccess]: () => false,
    [fetchEthFailure]: () => false
  },
  false
);

const selected = handleActions(
  {
    [selectCurrency]: (_state, action) => action.payload
  },
  'btc'
);

const offset = handleActions(
  {
    [selectOffset]: (_state, action) => action.payload
  },
  '2h'
);

const tradeCurrencyError = handleActions(
  {
    [buyCurrencyRequest]: () => false,
    [buyCurrencySuccess]: () => false,
    [sellCurrencyRequest]: () => false,
    [sellCurrencySuccess]: () => false,
    [sellCurrencyError]: (_state, action) => action.payload,
    [buyCurrencyError]: (_state, action) => action.payload
  },
  false
);

export default combineReducers({ selected, offset, eth, btc, isBtcLoading, isEthLoading, tradeCurrencyError });
