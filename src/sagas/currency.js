import { takeLatest, fork, take, select, put, cancel, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { loginSuccess, logout } from 'ducks/auth';
import {
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchEthSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  selectOffset,
  selectCurrency,
  getOffset,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyError,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyError
} from 'ducks/currency';
import { candles, getWallet, buyCurrency, sellCurrency } from '../api';
import { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure } from 'ducks/wallet';
import { fetchTransactionsRequest } from 'ducks/transactions';
import { fetchFeedRequest } from 'ducks/feed';

function* fetchBtcFlow(action) {
  try {
    const response = yield call(candles, 'btc', action.payload);
    yield put(fetchBtcSuccess(response.data.result));
  } catch (error) {
    yield put(fetchBtcFailure(error));
  }
}

function* fetchEthFlow(action) {
  try {
    const response = yield call(candles, 'eth', action.payload);
    yield put(fetchEthSuccess(response.data.result));
  } catch (error) {
    yield put(fetchEthFailure(error));
  }
}

export function* fetchCurrenciesWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
  yield takeLatest(fetchEthRequest, fetchEthFlow);
}

function* сurrencyFlow() {
  while (true) {
    const offset = yield select(getOffset);
    yield put(fetchBtcRequest(offset));
    yield put(fetchEthRequest(offset));

    yield delay(15000);
  }
}

export function* currencyWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([loginSuccess, logout, selectCurrency, selectOffset]);

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== logout.toString()) currencyTask = yield fork(сurrencyFlow);
  }
}

function* fetchWalletFlow() {
  try {
    const response = yield call(getWallet);
    yield put(fetchWalletSuccess(response.data.result));
  } catch (error) {
    yield put(fetchWalletFailure(error));
  }
}

export function* fetchWalletWatch() {
  yield takeLatest(fetchWalletRequest, fetchWalletFlow);
}

export function* fetchBtcWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch() {
  yield takeLatest(fetchEthRequest, fetchEthFlow);
}

export function* buyCurrencyFlow() {
  let currencyTask;
  while (true) {
    try {
      if (currencyTask) {
        yield cancel(currencyTask);
        currencyTask = undefined;
      }

      const action = yield take(buyCurrencyRequest);
      yield call(buyCurrency, action.payload);

      yield put(buyCurrencySuccess());
      yield put(fetchWalletRequest());
      yield put(fetchTransactionsRequest());
      yield put(fetchFeedRequest());
    } catch (error) {
      console.log(error);
      yield put(buyCurrencyError(error));
    }
  }
}

export function* sellCurrencyFlow() {
  let currencyTask;
  while (true) {
    try {
      if (currencyTask) {
        yield cancel(currencyTask);
        currencyTask = undefined;
      }

      const action = yield take(sellCurrencyRequest);
      yield call(sellCurrency, action.payload);

      yield put(sellCurrencySuccess());
      yield put(fetchWalletRequest());
      yield put(fetchTransactionsRequest());
      yield put(fetchFeedRequest());
    } catch (error) {
      console.log(error);
      yield put(sellCurrencyError(error));
    }
  }
}
