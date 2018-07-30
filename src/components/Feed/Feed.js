import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchFeedRequest, getRecords, getIsLoading } from 'ducks/feed';
import moment from 'moment';
import MySpinner from 'components/MySpinner';

const FeedList = styled.ul`
  list-style-type: none;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const FeedItem = styled.li`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;

  &:last-of-type {
    border: none;
    padding: 0;
    margin: 0;
  }
`;

const FeedItemHeader = styled.div`
  margin-bottom: 10px;
`;

const FeedItemBody = styled.div`  
`;

class Feed extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFeedRequest();
  }

  round = (number, points) => {
    return Math.ceil(number * Math.pow(10, points)) / Math.pow(10, points);
  };

  render() {
    const { records, limit, isLoading } = this.props;
    const limitedRecords = records.slice(0, limit);

    if (isLoading) {
      return <MySpinner size="32" />;
    }

    return (
      <FeedList>
        {limitedRecords.map(item => {
          return (
            <FeedItem key={item.id}>
              <FeedItemHeader>{moment(item.createdAt).format('DD-MM HH:mm')}</FeedItemHeader>

              <FeedItemBody>
                {item.usd_delta > 0 ? 'Buy' : 'Sell'}&nbsp;
                <strong>{item.btc_delta && `${this.round(Math.abs(item.btc_delta), 5)} Btc `}</strong>
                <strong>{item.eth_delta && `${this.round(Math.abs(item.eth_delta), 5)} Eth `}</strong>
                For&nbsp; <strong>${this.round(Math.abs(item.usd_delta), 5)} USD</strong>
              </FeedItemBody>
            </FeedItem>
          );
        })}
      </FeedList>
    );
  }
}

const mapStateToProps = state => ({
  records: getRecords(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = {
  fetchFeedRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
