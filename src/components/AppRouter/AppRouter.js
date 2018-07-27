import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Login from 'components/Login';
import PrivateRoute from 'components/PrivateRoute';
import Profile from 'components/Profile';
import { logout } from 'ducks/auth';
import { getIsAuthorized } from 'ducks/auth/index';
//import { getIsNetworkErrorPresent, getNetworkError } from 'ducks/network';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import 'index.css';
import ParticleParams from './particles-params';

const StyledNetworkError = styled.div`
  background-color: red;
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto;
`;

const StyledLogoutButton = styled.button`
  margin: 0 auto 20px;
  display: block;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const StyledParticles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;

  & div {
    height: 100%;
  }
`;

class AppRouter extends React.PureComponent {
  handleLogoutClick = () => {
    this.props.logout();
  };

  render() {
    const { isAuthorized, isNetworkError, networkErrorText } = this.props;

    return (
      <div className="app">
        {isNetworkError && (
          <StyledNetworkError>{networkErrorText}</StyledNetworkError>
        )}

        {isAuthorized && (
          <StyledLogoutButton onClick={this.handleLogoutClick}>
            Logout
          </StyledLogoutButton>
        )}

        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Redirect to="/profile" />
        </Switch>

        <StyledParticles>
          <Particles params={ParticleParams} />
        </StyledParticles>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  //isNetworkError: getIsNetworkErrorPresent(state),
  //networkErrorText: getNetworkError(state)
});

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppRouter)
);
