import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWalletCoins, fetchWalletRequest, getIsLoading } from 'ducks/wallet';
import MySpinner from 'components/MySpinner';

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

class Wallet extends React.PureComponent {
  componentDidMount() {
    this.props.fetchWalletRequest();
  }

  render() {
    const { walletCoins, isLoading } = this.props;

    if (isLoading) {
      return <MySpinner size="32" />
    }

    return (
      <StyledWallet>
        {Object.keys(walletCoins).map(item => {
          return (
            <StyledWalletItem key={item}>
              {walletCoins[item]} {item.toUpperCase()}
            </StyledWalletItem>
          );
        })}
      </StyledWallet>
    );
  }
}

const mapStateToProps = state => ({
  walletCoins: getWalletCoins(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = {
  fetchWalletRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
