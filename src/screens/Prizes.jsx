import React from 'react';
import styled from 'styled-components/native';

import I18n from 'i18n-js';
import { StyleUtils } from '@/utils/styles';

import AppText from '@/components/AppText.jsx';
import ScreenContainer from '@/components/containers/VerticallyCenteredScreenContainer.jsx';

export default function Prizes() {
  return (
    <ScreenContainer>
      <TitleText>{ I18n.t('screens.prizes.title') }</TitleText>
      <PrizesText>{ I18n.t('screens.prizes.text') }</PrizesText>
      <PrizesContainer>
        <AppText>
          { I18n.t('screens.prizes.prizes') }
        </AppText>
      </PrizesContainer>
    </ScreenContainer>
  );
}

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const PrizesText = styled(AppText)`
  ${StyleUtils.spacedTop()}
  ${StyleUtils.spacedX('lg')}
  text-align: justify;
`;

const PrizesContainer = styled.View`
  display: flex;
`;
