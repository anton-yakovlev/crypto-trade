import React from 'react';
import TradeOperations from 'components/TradeOperations';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import Logo from 'components/Login/Logo.svg';
import {
  getSelected,
  getSell,
  getPurchase,
  selectCurrency,
  getOffset,
  selectOffset,
  getCurrentBtcPurchase,
  getCurrentEthPurchase
} from 'ducks/currency';
import { getWalletCoins, fetchWalletRequest } from 'ducks/wallet';
import { fetchTransactionsRequest, getTransactionsByCurrency } from 'ducks/transactions';
import { getUser, fetchUserRequest } from 'ducks/user';
import { logout, getIsAuthorized } from 'ducks/auth';
import { LineChart } from 'react-easy-chart';
import moment from 'moment';

const OFFSETS = ['2h', '4h', '8h', '1d', '7d'];
const CURRENCIES = ['btc', 'eth'];

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.div`
  flex: none;
  height: 100px;
  border-bottom: 1px solid #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledBody = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px 0;
`;

const StyledFooter = styled.div`
  flex: none;
  height: 100px;
  border-bottom: 1px solid #fff;
`;

const LogoWrapper = styled.div`
  height: 100px;
`;

const LoginLogo = styled.img`
  height: 100%;
`;

const StyledCurrencySwitcher = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const SmallButtonCss = css`
  background-color: #555;
  line-height: 1;
  font-size: 14px;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;
  margin-right: 5px;
`;

const SmallButtonCssHover = css`
  background-color: #fff;
  border-color: #555;
  color: #555;
`;

const StyledCurrencySwitcherItem = styled.li`
  ${SmallButtonCss};
  ${props => props.selected && SmallButtonCssHover};
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  padding: 20px;

  &:hover {
    ${SmallButtonCssHover};
  }
`;

const StyledUserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledUser = styled.div`
  font-size: 18px;
  color: #fff;
  margin-right: 20px;
`;

const StyledLayout = styled.div`
  display: flex;
  width: 100%;
`;

const StyledLeftSide = styled.div`
  width: 40%;
  flex: none;
  margin-right: 40px;
`;

const StyledCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const StyledRightSide = styled.div`
  flex: 1;
`;

const StyledCardHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const StyledWallet = styled.ul`
  list-style-type: none;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const StyledWalletItem = styled.li`
  margin-bottom: 10px;
  font-size: 18px;
`;

const StyledTable = styled.div`
  display: table;
`;

const StyledTableRow = styled.div`
  display: table-row;
`;

const StyledTableCell = styled.div`
  display: table-cell;
  padding: 10px;
`;

const StyledOffsets = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
`;

const StyledOffset = styled.li`
  ${SmallButtonCss};
  ${props => props.selected && SmallButtonCssHover};

  &:hover {
    ${SmallButtonCssHover};
  }
`;

const StyledLogoutButton = styled.button`
  display: block;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
`;

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.fetchWalletRequest();
    this.props.fetchUserRequest();
    this.props.fetchTransactionsRequest();
  }

  handleLogoutClick = () => {
    this.props.logout();
  };

  chooseOffset = e => {
    this.props.selectOffset(e.currentTarget.dataset.id);
  };

  chooseCurrency = e => {
    this.props.selectCurrency(e.currentTarget.dataset.id);
  };

  render() {
    const {
      sell,
      purchase,
      walletCoins,
      user,
      transactions,
      offset,
      isAuthorized,
      selectedCurrency,
      currentBtcPurchase,
      currentEthPurchase
    } = this.props;

    return (
      <StyledWrapper>
        <StyledHeader>
          <LogoWrapper>
            <LoginLogo src={Logo} alt="Crypto Trade" />
          </LogoWrapper>

          <StyledCurrencySwitcher>
            {CURRENCIES.map(item => {
              return (
                <StyledCurrencySwitcherItem
                  key={item}
                  data-id={item}
                  onClick={this.chooseCurrency}
                  selected={item === selectedCurrency}
                >
                  <div>$ {item === 'btc' ? currentBtcPurchase : currentEthPurchase}</div>
                  <div>{item.toUpperCase()}</div>
                </StyledCurrencySwitcherItem>
              );
            })}
          </StyledCurrencySwitcher>

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

                <StyledWallet>
                  {Object.keys(walletCoins).map(item => {
                    return (
                      <StyledWalletItem key={item}>
                        {walletCoins[item]} {item.toUpperCase()}
                      </StyledWalletItem>
                    );
                  })}
                </StyledWallet>
              </StyledCard>

              <StyledCard>
                <StyledCardHeader>Trading</StyledCardHeader>

                <TradeOperations />
              </StyledCard>
            </StyledLeftSide>

            <StyledRightSide>
              <StyledCard>
                <StyledCardHeader>Graph</StyledCardHeader>

                <StyledOffsets>
                  {OFFSETS.map(item => (
                    <StyledOffset onClick={this.chooseOffset} key={item} data-id={item} selected={offset === item}>
                      {item}
                    </StyledOffset>
                  ))}
                </StyledOffsets>

                <LineChart
                  lineColors={['blue', 'red']}
                  axes
                  grid
                  verticalGrid
                  interpolate={'cardinal'}
                  xType={'time'}
                  datePattern={'%d-%m %H:%M'}
                  width={600}
                  height={400}
                  style={{
                    '.axis path': {
                      stroke: '#EDF0F1'
                    }
                  }}
                  data={[
                    sell.map(({ date, value }) => ({ x: moment(date).format('DD-MM HH:mm'), y: value })),
                    purchase.map(({ date, value }) => ({ x: moment(date).format('DD-MM HH:mm'), y: value }))
                  ]}
                />
              </StyledCard>

              <StyledCard>
                <StyledCardHeader>History</StyledCardHeader>

                <StyledTable>
                  <StyledTableRow>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>BTC</StyledTableCell>
                    <StyledTableCell>USD</StyledTableCell>
                  </StyledTableRow>

                  {transactions &&
                    transactions.length &&
                    transactions.map(item => {
                      return (
                        <StyledTableRow key={item.id}>
                          <StyledTableCell>{item.usd_delta > 0 ? 'Buy' : 'Sell'}</StyledTableCell>
                          <StyledTableCell>{moment(item.createdAt).format('DD-MM HH:mm')}</StyledTableCell>
                          <StyledTableCell>{item.btc_delta}</StyledTableCell>
                          <StyledTableCell>{item.usd_delta}</StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </StyledTable>
              </StyledCard>
            </StyledRightSide>
          </StyledLayout>
        </StyledBody>

        <StyledFooter />
      </StyledWrapper>
    );
  }
}

const mapStateToProps = state => ({
  selectedCurrency: getSelected(state),
  sell: getSell(state),
  purchase: getPurchase(state),
  walletCoins: getWalletCoins(state),
  user: getUser(state),
  transactions: getTransactionsByCurrency(state),
  offset: getOffset(state),
  isAuthorized: getIsAuthorized(state),
  currentBtcPurchase: getCurrentBtcPurchase(state),
  currentEthPurchase: getCurrentEthPurchase(state)
});

const mapDispatchToProps = {
  selectCurrency,
  fetchWalletRequest,
  fetchUserRequest,
  fetchTransactionsRequest,
  selectOffset,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
