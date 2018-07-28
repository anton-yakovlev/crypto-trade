import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './actions';

const isLoading = handleActions(
  {
    [fetchUserRequest]: () => true,
    [fetchUserSuccess]: () => false,
    [fetchUserFailure]: () => false
  },
  false
);

const error = handleActions(
  {
    [fetchUserRequest]: () => false,
    [fetchUserSuccess]: () => false,
    [fetchUserFailure]: (_state, action) => action.payload
  },
  false
);

const info = handleActions(
  {
    [fetchUserSuccess]: (_state, action) => action.payload
  },
  {}
);

export default combineReducers({ isLoading, error, info });
