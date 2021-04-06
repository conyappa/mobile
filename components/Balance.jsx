import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';

import { StyleUtils } from '../utils/styles';

import AppText from './AppText.jsx';

export default function Balance({ balance }) {
  function getBalance(unknownBalance) {
    if (unknownBalance === undefined) {
      return `${I18n.t('misc.loading')}...`;
    }
    return unknownBalance;
  }

  return (
    <Container>
      <TitleText style={[{ textTransform: 'uppercase' }]}>
        {I18n.t('user.balance')}
      </TitleText>
      <AppText>
        { getBalance(balance) }
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

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
  ${StyleUtils.spacedBottom()}
`;
