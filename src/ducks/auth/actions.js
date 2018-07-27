import { createActions } from 'redux-actions';

export const {
  loginRequest,
  loginError,
  loginSuccess,
  logout,
  registrationRequest,
  registrationError,
  registrationSuccess
} = createActions(
  'LOGIN_REQUEST',
  'LOGIN_ERROR',
  'LOGIN_SUCCESS',
  'LOGOUT',
  'REGISTRATION_REQUEST',
  'REGISTRATION_ERROR',
  'REGISTRATION_SUCCESS'
);
