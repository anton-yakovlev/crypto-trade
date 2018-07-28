import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetcFeedRequest, fetchFeedSuccess, fetchFeedFailure } from './actions';

const isLoading = handleActions(
  {
    [fetcFeedRequest]: () => true,
    [fetchFeedSuccess]: () => false,
    [fetchFeedFailure]: () => false
  },
  false
);

const error = handleActions(
  {
    [fetcFeedRequest]: () => false,
    [fetchFeedSuccess]: () => false,
    [fetchFeedFailure]: (_state, action) => action.payload
  },
  false
);

const records = handleActions(
  {
    [fetchFeedSuccess]: (_state, action) => action.payload
  },
  {}
);

export default combineReducers({ isLoading, error, records });
