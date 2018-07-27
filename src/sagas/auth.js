import { take, put, call, select } from 'redux-saga/effects';
import { setTokenApi, clearTokenApi, login } from 'api';
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from 'localStorage';
import { loginRequest, loginError, loginSuccess, logout, getIsAuthorized } from 'ducks/auth';

export function* authFlow() {
  while (true) {
    let isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);

    let response;

    if (!isAuthorized && localStorageToken) {
      response = localStorageToken;
      console.log('authFlow loginSuccess');
      yield call(setTokenApi, response);
      yield put(loginSuccess());
    } else {
      try {
        const action = yield take(loginRequest);
        console.log('authFlow loginRequest');
        response = yield call(login, action.payload);
        const token = response.data.jwt;
        yield call(setTokenApi, token);
        yield call(setTokenToLocalStorage, token);
        yield put(loginSuccess());
      } catch (error) {
        console.log('authFlow loginError', error.data.message);
        yield put(loginError(error.data.message));
      }
    }

    yield take(logout);

    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
