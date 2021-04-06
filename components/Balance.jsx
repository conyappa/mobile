import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';

import AppText from './AppText.jsx';

export default function Balance({ balance }) {
  return (
    <Container>
      <AppText style={[{ textTransform: 'uppercase' }]}>
        {I18n.t('user.balance')}
      </AppText>
      <AppText>
        {balance || `${I18n.t('misc.loading')}...`}
      </AppText>
    </Container>
  );
}

Balance.propTypes = {
  balance: PropTypes.number,
};

Balance.defaultProps = {
  balance: undefined,
};

const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
