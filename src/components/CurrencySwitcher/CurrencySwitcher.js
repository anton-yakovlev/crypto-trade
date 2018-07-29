import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectCurrency, getCurrentBtcPurchase, getCurrentEthPurchase, getSelected } from 'ducks/currency';
import { SmallButtonCss, SmallButtonCssHover } from 'components/Trading/Styles';

const CURRENCIES = ['btc', 'eth'];

const StyledCurrencySwitcher = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
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

class CurrencySwitcher extends React.PureComponent {
  chooseCurrency = e => {
    this.props.selectCurrency(e.currentTarget.dataset.id);
  };

  round = (number, points) => {
    return Math.ceil(number * Math.pow(10, points)) / Math.pow(10, points);
  };

  render() {
    const { selectedCurrency, currentBtcPurchase, currentEthPurchase } = this.props;

    return (
      <StyledCurrencySwitcher>
        {CURRENCIES.map(item => {
          return (
            <StyledCurrencySwitcherItem
              key={item}
              data-id={item}
              onClick={this.chooseCurrency}
              selected={item === selectedCurrency}
            >
              <div>{item.toUpperCase()}</div>
              <div>$ {item === 'btc' ? this.round(currentBtcPurchase, 2) : this.round(currentEthPurchase, 2)}</div>
            </StyledCurrencySwitcherItem>
          );
        })}
      </StyledCurrencySwitcher>
    );
  }
}

const mapStateToProps = state => ({
  selectedCurrency: getSelected(state),
  currentBtcPurchase: getCurrentBtcPurchase(state),
  currentEthPurchase: getCurrentEthPurchase(state)
});

const mapDispatchToProps = {
  selectCurrency
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySwitcher);
