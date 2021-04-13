import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';

import { COLORS, StyleUtils } from '@/utils/styles';

import AppText from './AppText.jsx';

export default function Balance({ balance }) {
  function getBalance(unknownBalance) {
    if (unknownBalance === undefined) {
      return `${I18n.t('misc.loading')}...`;
    }
    return I18n.toCurrency(unknownBalance, { delimiter: '.', precision: 0 });
  }

  return (
    <Container>
      <TitleText>
        {I18n.t('user.balance')}
      </TitleText>
      <BalanceText>
        { getBalance(balance) }
      </BalanceText>
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
  background-color: ${COLORS.green};
  ${StyleUtils.padded()}
  ${StyleUtils.rounded('sm')}
`;

const TitleText = styled(AppText)`
  color: ${COLORS.darkGreen};
`;

const BalanceText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;
