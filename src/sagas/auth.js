import { take, put, call } from 'redux-saga/effects';
import { setTokenApi, clearTokenApi, login, registration } from 'api';
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from 'localStorage';
import {
  loginRequest,
  loginError,
  loginSuccess,
  registrationRequest,
  registrationError,
  registrationSuccess,
  logout
} from 'ducks/auth';

export function* authorize(email, password) {
  try {
    const response = yield call(login, { email, password });
    const token = response.data.jwt;
    yield call(setTokenToLocalStorage, token);
    yield call(setTokenApi, token);
    yield put(loginSuccess());
    return token;
  } catch (error) {
    yield put(loginError(error.data.message));
  }
}

export function* register(email, password) {
  try {
    const response = yield call(registration, { email, password });
    const token = response.data.jwt;
    yield call(setTokenToLocalStorage, token);
    yield call(setTokenApi, token);
    yield put(registrationSuccess());
  } catch (error) {
    yield put(registrationError(error.data.message));
  }
}

export function* authFlow() {
  while (true) {
    let token = yield call(getTokenFromLocalStorage);

    if (token != null) {
      yield call(setTokenApi, token);
      yield put(loginSuccess());
    } else {
      const action = yield take([loginRequest, registrationRequest]);
      const { email, password } = action.payload;
      const handler = action.type === loginRequest.toString() ? authorize : register;
      token = yield call(handler, email, password);
    }

    if (token) {
      yield take(logout);

      yield call(removeTokenFromLocalStorage);
      yield call(clearTokenApi);
    }
  }
}