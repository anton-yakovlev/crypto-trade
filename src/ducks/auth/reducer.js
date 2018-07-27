import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
  loginSuccess,
  loginError,
  logout,
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

const hasLoginError = handleActions(
  {
    [loginError]: (_state, action) => action.payload,
    [loginSuccess]: (_state, _action) => false,
    [registrationError]: (_state, _action) => false,
    [registrationSuccess]: (_state, _action) => false
  },
  false
);

const hasRegistrationError = handleActions(
  {
    [registrationError]: (_state, action) => action.payload,
    [registrationSuccess]: (_state, _action) => false,
    [loginError]: (_state, _action) => false,
    [loginSuccess]: (_state, _action) => false,
  },
  false
);

export default combineReducers({ isAuthorized, hasLoginError, hasRegistrationError })