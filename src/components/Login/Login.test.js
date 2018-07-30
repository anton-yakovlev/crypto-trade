import React from 'react';
import Login from './Login';
import { AUTH_MODE } from './Login';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'

const initialState = {
  auth: {
    hasLoginError:false,
    hasRegistrationError:false,
    isFetching:false,
    isAuthorized:false
  }
};

const mockStore = configureStore();
let wrapper;
let store;

describe('Component Login', () => {
  store = mockStore(initialState);

  beforeEach(() => {
    wrapper = shallow(
      <Login store={store} />
    )
  });

  it('setState to login mode link changed to Registration', () => {
    wrapper.setState({ mode: AUTH_MODE.LOGIN});
    const el = wrapper.shallow();
    expect(el.find('a').text()).toEqual('Registration');
  });

  it('Содержит метода класса `handleFormSubmit`', () => {
    const el = wrapper.shallow();
    expect(el.instance().handleFormSubmit).toBeDefined();
  });

  it('Содержит инпут [name="email"]', () => {
    const el = wrapper.shallow();
    expect(el.find('[name="email"]')).toHaveLength(1);
  });

  it('Содержит инпут [name="password"]', () => {
    const el = wrapper.shallow();
    expect(el.find('[name="password"]')).toHaveLength(1);
  });
});