import { createActions } from 'redux-actions';

export const {
  feed: {
    fetcFeedRequest,
    fetchFeedSuccess,
    fetchFeedFailure
  }
} = createActions({
  FEED: {
    FETCH_FEED_REQUEST: null,
    FETCH_FEED_SUCCESS: null,
    FETCH_FEED_FAILURE: null
  }
});
