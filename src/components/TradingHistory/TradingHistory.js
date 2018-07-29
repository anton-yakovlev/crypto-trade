import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getTransactionsByCurrency, fetchTransactionsRequest, getIsLoading } from 'ducks/transactions';
import { getSelected } from 'ducks/currency';
import moment from 'moment';
import MySpinner from 'components/MySpinner';

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

class TradingHistory extends React.PureComponent {
  componentDidMount() {
    this.props.fetchTransactionsRequest();
  }

  render() {
    const { transactions, selectedCurrency, isLoading } = this.props;

    if (isLoading) {
      return <MySpinner size="32" />
    }
  
    return (
      <StyledTable>
        <StyledTableRow>
          <StyledTableCell>Type</StyledTableCell>
          <StyledTableCell>Date</StyledTableCell>
          <StyledTableCell>{selectedCurrency.toUpperCase()}</StyledTableCell>
          <StyledTableCell>USD</StyledTableCell>
        </StyledTableRow>

        {transactions &&
          transactions.length &&
          transactions.map(item => {
            return (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.usd_delta > 0 ? 'Buy' : 'Sell'}</StyledTableCell>
                <StyledTableCell>{moment(item.createdAt).format('DD-MM HH:mm')}</StyledTableCell>
                <StyledTableCell>{item[selectedCurrency + '_delta']}</StyledTableCell>
                <StyledTableCell>{item.usd_delta}</StyledTableCell>
              </StyledTableRow>
            );
          })}
      </StyledTable>
    );
  }
}

const mapStateToProps = state => ({
  selectedCurrency: getSelected(state),
  transactions: getTransactionsByCurrency(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = {
  fetchTransactionsRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradingHistory);
