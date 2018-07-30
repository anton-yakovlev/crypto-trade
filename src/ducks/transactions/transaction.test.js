import reducer from './index'
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,    
} from './actions'

const initialState = {
  isLoading: false,
  records: []
}

describe('transactions reducer', () => {
  it('Инициализация с корректным state:', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('Action fetchTransactionsRequest change isLoading:', () => {
    expect(reducer(initialState, fetchTransactionsRequest())).toMatchObject({
      isLoading: true
    })
  })

  it('Action fetchTransactionsSuccess change records:', () => {
    expect(reducer(initialState, fetchTransactionsSuccess(['somedata']))).toMatchObject({
     records: ['somedata']
    })
  })
})