import reducer from './index'
import {
  loginRequest,
  loginSuccess,
  loginError,
  registrationRequest,
  registrationSuccess,
  registrationError,
  logout,
} from './actions'

const initialState = {
  isAuthorized: false,
  hasLoginError: false,
  hasRegistrationError: false,
  isFetching: false,
}

describe('auth reducer', () => {
  it('Инициализация с корректным state:', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('Action loginRequest и registrationRequest:', () => {
    const actionLogin = loginRequest()

    it('очищают имеющуюся ошибку при login', () => {
      expect(reducer({ hasLoginError: 'error' }, actionLogin)).toMatchObject({
        hasLoginError: false
      })
    })
  })

  describe('Actions loginRequest и registrationRequest:', () => {
    const actionRegister = registrationRequest()

    it('очищают имеющуюся ошибку при registration', () => {
      expect(reducer({ hasRegistrationError: 'error' }, actionRegister)).toMatchObject({
        hasRegistrationError: false
      })
    })
  });

  describe('Actions loginSuccess и registrationSuccess:', () => {
    const actionLogin = loginSuccess({ data: 'somedata' })
    const actionRegister = registrationSuccess({ data: 'somedata' })

    it('выставляют значение isAuthorized === true', () => {
      expect(reducer(initialState, actionLogin)).toMatchObject({
        isAuthorized: true,
      })
      expect(reducer(initialState, actionRegister)).toMatchObject({
        isAuthorized: true,
      })
    })

    it('очищают имеющуюся ошибку loginSuccess', () => {
      expect(reducer({ hasLoginError: 'error' }, actionLogin)).toMatchObject({
        hasLoginError: false
      })
    })

    it('очищают имеющуюся ошибку registrationSuccess', () => {
      expect(reducer({ hasRegistrationError: 'error' }, actionRegister)).toMatchObject({
        hasRegistrationError: false
      })
    })
  })

  describe('Actions loginError и registrationError:', () => {
    const actionLogin = loginError('error')
    const actionRegister = registrationError('error')

    it('устанавливают ошибку hasLoginError', () => {
      expect(reducer(initialState, actionLogin)).toMatchObject({
        hasLoginError: 'error',
      })
    })

    it('устанавливают ошибку hasRegistrationError', () => {
      expect(reducer(initialState, actionRegister)).toMatchObject({
        hasRegistrationError: 'error',
      })
    })
  })

  describe('Action logout:', () => {
    const action = logout()

    it('выставляет значение isAuthorized === false', () => {
      expect(reducer({ isAuthorized: true }, action)).toMatchObject({
        isAuthorized: false,
      })
    })
  })
})