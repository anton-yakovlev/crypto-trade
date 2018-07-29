import React from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-easy-chart';
import styled from 'styled-components';
import { selectOffset, getOffset, getPurchase, getSell, getIsBtcLoading, getIsEthLoading } from 'ducks/currency';
import { SmallButtonCss, SmallButtonCssHover } from 'components/Trading/Styles';
import moment from 'moment';
import MySpinner from 'components/MySpinner';

const OFFSETS = ['2h', '4h', '8h', '1d', '7d'];

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

const GraphWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
`;

class Wallet extends React.PureComponent {
  chooseOffset = e => {
    this.props.selectOffset(e.currentTarget.dataset.id);
  };

  render() {
    const { sell, purchase, offset, isBtcLoading, isEthLoading } = this.props;

    if (isBtcLoading || isEthLoading) {
      return <MySpinner size="32" />
    }

    return (
      <GraphWrapper>
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
      </GraphWrapper>
    );
  }
}

const mapStateToProps = state => ({
  offset: getOffset(state),
  sell: getSell(state),
  purchase: getPurchase(state),
  isBtcLoading: getIsBtcLoading(state),
  isEthLoading: getIsEthLoading(state)
});

const mapDispatchToProps = {
  selectOffset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
