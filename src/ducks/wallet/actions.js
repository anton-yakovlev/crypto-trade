import { createActions } from 'redux-actions';

export const {
  wallet: {
    fetchWalletRequest,
    fetchWalletSuccess,
    fetchWalletFailure
  }
} = createActions({
  WALLET: {
    FETCH_WALLET_REQUEST: null,
    FETCH_WALLET_SUCCESS: null,
    FETCH_WALLET_FAILURE: null
  }
});
