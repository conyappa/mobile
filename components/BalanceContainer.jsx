import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import AppText from './AppText.jsx';

export default function BalanceContainer({ balance }) {
  return (
    <Container>
      <AppText>
        BALANCE
      </AppText>
      <AppText>
        { balance }
      </AppText>
    </Container>
  );
}

BalanceContainer.propTypes = {
  balance: PropTypes.number.isRequired,
};

const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
