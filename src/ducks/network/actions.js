import { createActions } from 'redux-actions';

export const {
  network: { networkError, clearNetworkErrors }
} = createActions({
  NETWORK: {
    NETWORK_ERROR: null,
    CLEAR_NETWORK_ERRORS: null
  }
});
