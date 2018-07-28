import { createActions } from 'redux-actions';

export const {
  currency: {
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
  }
} = createActions({
  CURRENCY: {
    FETCH_BTC_REQUEST: null,
    FETCH_BTC_SUCCESS: null,
    FETCH_BTC_FAILURE: null,
    FETCH_ETH_REQUEST: null,
    FETCH_ETH_SUCCESS: null,
    FETCH_ETH_FAILURE: null,
    SELECT_OFFSET: null,
    SELECT_CURRENCY: null,
    BUY_CURRENCY_REQUEST: null,
    BUY_CURRENCY_SUCCESS: null,
    BUY_CURRENCY_ERROR: null,
    SELL_CURRENCY_REQUEST: null,
    SELL_CURRENCY_SUCCESS: null,
    SELL_CURRENCY_ERROR: null
  }
});
