import { take, put, call } from 'redux-saga/effects';
import {
  loginSuccess,
  registrationRequest,
  registrationError,
  registrationSuccess,
} from 'ducks/auth';
import { setTokenToLocalStorage } from 'localStorage';
import { registration, setTokenApi } from '../api';

export function* registrationFlow() {
  while (true) {
    try {
      const action = yield take(registrationRequest);
      console.log('registrationFlow registrationRequest');
      const response = yield call(registration, action.payload);
      const token = response.data.jwt;
      console.log('registrationFlow token', token);
      yield call(setTokenApi, token);
      yield call(setTokenToLocalStorage, token);
      yield put(registrationSuccess());
      yield put(loginSuccess());
    } catch (error) {
      console.log('registrationFlow error', error.data.message);
      yield put(registrationError(error.data.message));
    }
  }
}