import React from 'react';
import TradeOperations from 'components/TradeOperations';
import { connect } from 'react-redux';
import Logo from 'components/Login/Logo.svg';
import { getSelected, getOffset } from 'ducks/currency';
import { getUser, fetchUserRequest } from 'ducks/user';
import { logout, getIsAuthorized } from 'ducks/auth';
import Wallet from 'components/Wallet';
import Graph from 'components/Graph';
import TradingHistory from 'components/TradingHistory';
import CurrencySwitcher from 'components/CurrencySwitcher';
import Feed from 'components/Feed';
import {
  StyledWrapper,
  StyledCard,
  StyledCardHeader,
  StyledRightSide,
  StyledHeader,
  LogoWrapper,
  LoginLogo,
  StyledUserWrapper,
  StyledUser,
  StyledLogoutButton,
  StyledBody,
  StyledLayout,
  StyledLeftSide
} from './Styles';

class Trading extends React.PureComponent {
  componentDidMount() {
    this.props.fetchUserRequest();
  }

  handleLogoutClick = () => {
    this.props.logout();
  };

  render() {
    const { user, isAuthorized } = this.props;

    return (
      <StyledWrapper>
        <StyledHeader>
          <LogoWrapper>
            <LoginLogo src={Logo} alt="Crypto Trade" />
          </LogoWrapper>

          <CurrencySwitcher />

          <StyledUserWrapper>
            {user && user.email && <StyledUser>{user.email}</StyledUser>}
            {isAuthorized && <StyledLogoutButton onClick={this.handleLogoutClick}>Logout</StyledLogoutButton>}
          </StyledUserWrapper>
        </StyledHeader>

        <StyledBody>
          <StyledLayout>
            <StyledLeftSide>
              <StyledCard>
                <StyledCardHeader>Wallet</StyledCardHeader>

                <Wallet />
              </StyledCard>

              <StyledCard>
                <StyledCardHeader>Trading</StyledCardHeader>

                <TradeOperations />
              </StyledCard>

              <StyledCard>
                <StyledCardHeader>Last Feed Activity</StyledCardHeader>

                <Feed limit="5" />
              </StyledCard>
            </StyledLeftSide>

            <StyledRightSide>
              <StyledCard>
                <StyledCardHeader>Graph</StyledCardHeader>

                <Graph />
              </StyledCard>

              <StyledCard>
                <StyledCardHeader>History</StyledCardHeader>

                <TradingHistory />
              </StyledCard>
            </StyledRightSide>
          </StyledLayout>
        </StyledBody>
      </StyledWrapper>
    );
  }
}

const mapStateToProps = state => ({
  selectedCurrency: getSelected(state),
  user: getUser(state),
  offset: getOffset(state),
  isAuthorized: getIsAuthorized(state)
});

const mapDispatchToProps = {
  fetchUserRequest,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trading);
