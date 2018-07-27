import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginRequest, registrationRequest, getIsAuthorized, getLoginError, getRegistrationError } from 'ducks/auth';
import LoginLogo from './Logo.svg';
import {
  LoginWrapper,
  LoginButton,
  LoginCard,
  LoginInput,
  LoginLogoWrapper,
  LoginText,
  StyledLoginLogo,
  LoginHeader,
  StyledLoginError
} from './LoginStyles';

const AUTH_MODE = {
  LOGIN: {
    name: 'login',
    title: 'Login',
    buttonCaption: 'Sign In',
    alternativeLinkCaption: 'Registration',
    alternativeText: 'First Time Here? '
  },
  REGISTRATION: {
    name: 'registration',
    title: 'Registration',
    buttonCaption: 'Sign Up',
    alternativeLinkCaption: 'Login',
    alternativeText: 'Have account? '
  }
};

class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
    mode: AUTH_MODE.LOGIN,
    emptyFields: null
  };

  changeMode = event => {
    event.preventDefault();
    this.setState({
      mode: this.state.mode.name === AUTH_MODE.LOGIN.name ? AUTH_MODE.REGISTRATION : AUTH_MODE.LOGIN
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.sendLoginRequest();
  };

  sendLoginRequest() {
    const { email, password } = this.state;
    const { loginRequest, registrationRequest } = this.props;

    if (email.trim() === '' || password.trim() === '') {
      this.setState({
        emptyFields: true
      });
      return;
    }

    this.setState({
      emptyFields: false
    });

    if (this.state.mode.name === 'login') {
      loginRequest({ email: email, password: password });
    } else {
      registrationRequest({ email: email, password: password });
    }
  }

  render() {
    const { mode, emptyFields } = this.state;
    const { isAuthorized, loginError, registrationError } = this.props;

    if (isAuthorized) {
      return <Redirect to="/" />;
    }

    return (
      <LoginWrapper>
        <form onSubmit={this.handleFormSubmit}>
          <LoginLogoWrapper>
            <StyledLoginLogo src={LoginLogo} alt="Crypto Trade" />
          </LoginLogoWrapper>

          <LoginCard>
            <LoginHeader>{mode.title}</LoginHeader>
            <LoginInput type="email" placeholder="Email" name="email" onChange={this.handleInputChange} />
            <LoginInput type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
            <LoginButton type="submit">{mode.buttonCaption}</LoginButton>

            {loginError && <StyledLoginError>{loginError}</StyledLoginError>}

            {emptyFields && <StyledLoginError>Please Fill Up the Form</StyledLoginError>}

            {registrationError &&
              registrationError.email &&
              registrationError.email.map(item => <StyledLoginError>Email {item}</StyledLoginError>)}

            {registrationError &&
              registrationError.password &&
              registrationError.password.map(item => <StyledLoginError>Password {item}</StyledLoginError>)}
          </LoginCard>

          <LoginCard>
            <LoginText>
              {mode.alternativeText}
              <a href="" onClick={this.changeMode}>
                {mode.alternativeLinkCaption}
              </a>
            </LoginText>
          </LoginCard>
        </form>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  loginError: getLoginError(state),
  registrationError: getRegistrationError(state)
});

const mapDispatchToProps = {
  loginRequest,
  registrationRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
