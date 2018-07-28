import { put, call } from 'redux-saga/effects';
import { getUserInfo } from 'api';
import { fetchUserSuccess, fetchUserFailure } from 'ducks/user';

export function* fetchUserFlow() {
  try {
    const response = yield call(getUserInfo);
    yield put(fetchUserSuccess(response.data.result));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}