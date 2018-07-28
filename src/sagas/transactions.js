import { put, call, takeLatest } from 'redux-saga/effects';
import { getUserTransactions } from 'api';
import { fetchTransactionsRequest, fetchTransactionsSuccess, fetchTransactionsFailure } from 'ducks/transactions';

function* fetchTransactionsFlow() {
  try {
    const response = yield call(getUserTransactions);
    yield put(fetchTransactionsSuccess(response.data.result));
  } catch (error) {
    yield put(fetchTransactionsFailure(error));
  }
}

export function* fetchTransactionsWatch() {
  yield takeLatest(fetchTransactionsRequest, fetchTransactionsFlow);
}
