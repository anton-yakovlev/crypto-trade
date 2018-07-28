import { createActions } from 'redux-actions';

export const {
  auth: { loginRequest, loginError, loginSuccess, logout, registrationRequest, registrationError, registrationSuccess }
} = createActions({
  AUTH: {
    LOGIN_REQUEST: null,
    LOGIN_ERROR: null,
    LOGIN_SUCCESS: null,
    LOGOUT: null,
    REGISTRATION_REQUEST: null,
    REGISTRATION_ERROR: null,
    REGISTRATION_SUCCESS: null
  }
});
