import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';

import { COLORS, StyleUtils } from '@/utils/styles';

import AppText from './AppText.jsx';

function getAmount(unknownAmount) {
  if (unknownAmount === undefined) {
    return `${I18n.t('misc.loading')}...`;
  }
  return I18n.toCurrency(unknownAmount, { delimiter: '.', precision: 0 });
}

export default function Balance({ balance, winnings }) {
  return (
    <Container>
      <TitleText>
        {I18n.t('user.balance')}
      </TitleText>
      <BalanceText>
        { getAmount(balance) }
      </BalanceText>
      <AppText>
        {I18n.t('user.winnings', { winnings: getAmount(winnings) })}
      </AppText>
    </Container>
  );
}

Balance.propTypes = {
  balance: PropTypes.number,
  winnings: PropTypes.number,
};

Balance.defaultProps = {
  balance: undefined,
  winnings: undefined,
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
