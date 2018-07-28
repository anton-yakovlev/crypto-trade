import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { fetchUserFlow } from './user';
//import { networkFlow } from './request';
import { registrationFlow } from './registration';
import { currencyWatch, fetchCurrenciesWatch, fetchWalletWatch, buyCurrencyFlow, sellCurrencyFlow } from './currency';
import { fetchTransactionsWatch } from './transactions';

export default function*() {
  yield fork(authFlow);
  yield fork(registrationFlow);
  //yield fork(networkFlow);
  yield fork(currencyWatch);
  yield fork(fetchCurrenciesWatch);
  yield fork(fetchWalletWatch);
  yield fork(fetchUserFlow);
  yield fork(fetchTransactionsWatch);
  yield fork(buyCurrencyFlow);
  yield fork(sellCurrencyFlow);
}