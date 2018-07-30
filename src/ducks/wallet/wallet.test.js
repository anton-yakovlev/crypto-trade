import reducer from './index'
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from './actions'

const initialState = {
  isLoading: false,
  error: false,
  coins: []
}

describe('wallet reducer', () => {
  it('Инициализация с корректным state:', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('Action fetchWalletRequest change isLoading:', () => {
    expect(reducer(initialState, fetchWalletRequest())).toMatchObject({
      isLoading: true
    })
  })

  it('Action fetchWalletSuccess change coins:', () => {
    expect(reducer(initialState, fetchWalletSuccess(['somedata']))).toMatchObject({
     coins: ['somedata']
    })
  })

  it('Action fetchWalletFailure change error:', () => {
    expect(reducer(initialState, fetchWalletFailure('somedata'))).toMatchObject({
      error: 'somedata'
    })
  })
})