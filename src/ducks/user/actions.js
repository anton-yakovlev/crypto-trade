import { createActions } from 'redux-actions';

export const {
  user: {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure
  }
} = createActions({
  USER: {
    FETCH_USER_REQUEST: null,
    FETCH_USER_SUCCESS: null,
    FETCH_USER_FAILURE: null
  }
});
