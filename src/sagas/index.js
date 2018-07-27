import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { registrationFlow } from './registration';

export default function*() {
  yield fork(authFlow);
  yield fork(registrationFlow);
}