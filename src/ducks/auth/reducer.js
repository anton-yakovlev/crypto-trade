import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
  loginRequest,
  loginSuccess,
  loginError,
  logout,
  registrationRequest,
  registrationSuccess,
  registrationError
} from './actions';

const isAuthorized = handleActions(
  {
    [loginSuccess]: (_state, _action) => true,
    [logout]: (_state, _action) => false,
    [registrationSuccess]: (_state, _action) => true
  },
  false
);

const isFetching = handleActions(
  {
    [loginRequest]: () => true,
    [loginSuccess]: () => false,
    [loginError]: () => false,
    [registrationRequest]: () => true,
    [registrationSuccess]: () => false,
    [registrationError]: () => false
  },
  false
);

const hasLoginError = handleActions(
  {
    [loginError]: (_state, action) => action.payload,
    [loginSuccess]: () => false,
    [registrationError]: () => false,
    [registrationSuccess]: () => false,
    [loginRequest]: () => false
  },
  false
);

const hasRegistrationError = handleActions(
  {
    [registrationError]: (_state, action) => action.payload,
    [registrationSuccess]: () => false,
    [loginError]: () => false,
    [loginSuccess]: () => false,
    [registrationRequest]: () => false,
  },
  false
);

export default combineReducers({ isAuthorized, hasLoginError, hasRegistrationError, isFetching })