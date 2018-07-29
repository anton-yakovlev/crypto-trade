import { createActions } from 'redux-actions';

export const {
  feed: {
    fetchFeedRequest,
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
