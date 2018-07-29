import { authFlow, authorize } from './auth'
import { call, put, take } from 'redux-saga/effects'
import { setTokenApi, clearTokenApi } from 'api'
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from 'localStorage'
import { loginRequest, loginSuccess, registrationRequest, logout } from 'ducks/auth'
//import { fetchUserRequest } from 'ducks/user'
//import { fetchAccountRequest } from 'ducks/account'

describe('auth saga', () => {
  describe('Saga authFlow', () => {
    describe('Login from token localStorage', () => {
      const gen = authFlow()

      it('get token from localStorage', () => {
        expect(gen.next().value).toEqual(call(getTokenFromLocalStorage))
      })

      it('execute method setToken', () => {
        expect(gen.next('jwt_token').value).toEqual(
          call(setTokenApi, 'jwt_token'),
        )
      })

      it('execute action loginSuccess', () => {
        expect(gen.next().value).toEqual(put(loginSuccess()))
      })
    })

    describe('Login with entered data', () => {
      const gen = authFlow()

      it('Check token in localStorage', () => {
        expect(gen.next().value).toEqual(call(getTokenFromLocalStorage))
      })

      it('Get event of auth/reg', () => {
        expect(gen.next().value).toEqual(take([loginRequest, registrationRequest]))
      })

      it('Execute saga of auth/reg', () => {
        expect(
          gen.next({
            type: loginRequest.toString(),
            payload: {
              email: '1',
              password: '2',
            },
          }).value,
        ).toEqual(call(authorize, '1', '2'))
      })
    })

    describe('After login', () => {
      const gen = authFlow()
      gen.next()
      gen.next('token')
      gen.next()

      it('Wait for logout', () => {
        expect(gen.next().value).toEqual(take(logout))
      })

      it('When logout call removeTokenFromLocalStorage and clearTokenApi', () => {
        expect(gen.next().value).toEqual(call(removeTokenFromLocalStorage))
        expect(gen.next().value).toEqual(call(clearTokenApi))
      })

      it('Continue work in loop', () => {
        const next = gen.next()
        expect(next.done).toEqual(false)
        expect(next.value).toEqual(call(getTokenFromLocalStorage))
      })
    })
  })
})