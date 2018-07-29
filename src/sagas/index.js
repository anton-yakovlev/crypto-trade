import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { fetchUserFlow } from './user';
import { currencyWatch, fetchCurrenciesWatch, fetchWalletWatch, buyCurrencyFlow, sellCurrencyFlow } from './currency';
import { fetchTransactionsWatch } from './transactions';
import { fetchFeedWatch } from './feed';

export default function*() {
  yield fork(authFlow);
  yield fork(currencyWatch);
  yield fork(fetchCurrenciesWatch);
  yield fork(fetchWalletWatch);
  yield fork(fetchUserFlow);
  yield fork(fetchTransactionsWatch);
  yield fork(buyCurrencyFlow);
  yield fork(sellCurrencyFlow);
  yield fork(fetchFeedWatch);
}