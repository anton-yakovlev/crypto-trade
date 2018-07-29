import React from 'react';
import Spinner from 'react-svg-spinner';
import styled from 'styled-components';

const StyledSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

class MySpinner extends React.PureComponent {
  render() {
    const { size } = this.props;
    return (
      <StyledSpinnerWrapper>
        <Spinner size={`${size || 64}px`} color="#ccc" gap={4} />
      </StyledSpinnerWrapper>
    )
  }
}

export default MySpinner;
