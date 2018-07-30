import { put, call, takeLatest } from 'redux-saga/effects';
import { getUserTransactions } from 'api';
import { fetchFeedRequest, fetchFeedSuccess, fetchFeedFailure } from 'ducks/feed';

export function* fetchFeedFlow() {
  try {
    const response = yield call(getUserTransactions);
    yield put(fetchFeedSuccess(response.data.result));
  } catch (error) {
    yield put(fetchFeedFailure(error));
  }
}

export function* fetchFeedWatch() {
  yield takeLatest(fetchFeedRequest, fetchFeedFlow);
}