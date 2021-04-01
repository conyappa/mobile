import React from 'react';
import styled from 'styled-components/native';

import I18n from 'i18n-js';
import { map } from 'lodash';
import { StyleUtils } from '../utils/styles';

import AppText from '../components/AppText.jsx';
import LoggedScreen from '../components/LoggedScreen.jsx';
import DepositField from '../components/BankField.jsx';

const FIELDS = [
  { name: 'name', value: 'Con Yappa' },
  { name: 'rut', value: '22612199-4' },
  { name: 'bankName', value: 'Santander' },
  { name: 'accountType', value: 'Cuenta Vista' },
  { name: 'accountNumber', value: '007002885802' },
  { name: 'email', value: 'ahorra@conyappa.cl' },
];

const WITHDRAW_EMAIL = 'ahorra@conyappa.cl';

export default function Bank() {
  return (
    <LoggedScreen>
      <TitleText>{ I18n.t('screens.bank.depositTitle') }</TitleText>
      <AppText>{ I18n.t('screens.bank.depositInstructions') }</AppText>
      <BankFieldsContainer>
        {
          map(
            FIELDS,
            ({ name, value }, index) => (
              <SpacedBankField
                key={`${name}-deposit-field`}
                name={I18n.t(`screens.bank.${name}`)}
                value={value}
                isFirst={index === 0}
              />
            ),
          )
        }
      </BankFieldsContainer>
      <WithdrawTitle>{ I18n.t('screens.bank.withdrawTitle') }</WithdrawTitle>
      <AppText>{ I18n.t('screens.bank.withdrawInstructions') }</AppText>
      <BankFieldsContainer>
        <SpacedBankField
          name={I18n.t('screens.bank.email')}
          value={WITHDRAW_EMAIL}
        />
      </BankFieldsContainer>
    </LoggedScreen>
  );
}

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const WithdrawTitle = styled(TitleText)`
  ${StyleUtils.spacedTop('lg')}
`;

const BankFieldsContainer = styled.View`
  ${StyleUtils.spacedTop()}
`;

const SpacedBankField = styled(DepositField)`
  ${({ isFirst }) => !isFirst && StyleUtils.spacedTop('xs')}
`;
