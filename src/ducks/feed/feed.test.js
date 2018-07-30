import reducer from './index'
import {
  fetchFeedRequest,
  fetchFeedSuccess,
  fetchFeedFailure
} from './actions'

const initialState = {
  isLoading: false,
  error: false,
  records: []
}

describe('feed reducer', () => {
  it('Инициализация с корректным state:', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('Action fetchFeedRequest change isLoading:', () => {
    expect(reducer(initialState, fetchFeedRequest())).toMatchObject({
      isLoading: true
    })
  })

  it('Action fetchFeedSuccess change records:', () => {
    expect(reducer(initialState, fetchFeedSuccess(['somedata']))).toMatchObject({
     records: ['somedata']
    })
  })

  it('Action fetchFeedFailure change error:', () => {
    expect(reducer(initialState, fetchFeedFailure('somedata'))).toMatchObject({
      error: 'somedata'
    })
  })
})