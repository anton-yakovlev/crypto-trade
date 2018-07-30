import reducer from './index'
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from './actions'

const initialState = {
  isLoading: false,
  error: false,
  info: []
}

describe('user reducer', () => {
  it('Инициализация с корректным state:', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('Action fetchUserRequest change isLoading:', () => {
    expect(reducer(initialState, fetchUserRequest())).toMatchObject({
      isLoading: true
    })
  })

  it('Action fetchUserSuccess change info:', () => {
    expect(reducer(initialState, fetchUserSuccess(['somedata']))).toMatchObject({
     info: ['somedata']
    })
  })

  it('Action fetchUserFailure change error:', () => {
    expect(reducer(initialState, fetchUserFailure('somedata'))).toMatchObject({
      error: 'somedata'
    })
  })
})