import reducer from './index'
import {
  fetchBtcRequest,
    fetchBtcSuccess,
    fetchEthRequest,
    fetchEthSuccess,
    buyCurrencyRequest,
    buyCurrencySuccess,
    buyCurrencyError,
    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyError,
} from './actions'

const initialState = {
  selected: 'btc',
  offset: '2h',
  btc: [],
  eth: [],
  isBtcLoading: false,
  isEthLoading: false,
  tradeCurrencyError: false
}

describe('currency reducer', () => {
  it('Инициализация с корректным state:', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('Action fetchBtcRequest change isBtcLoading:', () => {
    expect(reducer(initialState, fetchBtcRequest())).toMatchObject({
      isBtcLoading: true
    })
  })

  it('Action fetchEthRequest change isEthLoading:', () => {
    expect(reducer(initialState, fetchEthRequest())).toMatchObject({
      isEthLoading: true
    })
  })

  it('Action fetchBtcSuccess change data:', () => {
    expect(reducer(initialState, fetchBtcSuccess({ data: 'somedata' }))).toMatchObject({
      btc: { data: 'somedata'}
    })
  })

  it('Action fetchEthSuccess change isEthLoading:', () => {
    expect(reducer(initialState, fetchEthSuccess({ data: 'somedata' }))).toMatchObject({
      eth: { data: 'somedata' }
    })
  })
  
  it('Action buyCurrencyError change tradeCurrencyError:', () => {
    expect(reducer(initialState, buyCurrencyError('somedata'))).toMatchObject({
      tradeCurrencyError: 'somedata'
    })
  })

  it('Action sellCurrencyError change tradeCurrencyError:', () => {
    expect(reducer(initialState, sellCurrencyError('somedata'))).toMatchObject({
      tradeCurrencyError: 'somedata'
    })
  })
})