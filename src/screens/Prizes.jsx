import React from 'react';
import styled from 'styled-components/native';
import useAsync from 'react-use/lib/useAsync';
import { ActivityIndicator } from 'react-native';
import { map } from 'lodash';
import I18n from 'i18n-js';

import { StyleUtils, COLORS } from '@/utils/styles';
import api from '@/api';
import { formatCurrency } from '@/utils/formatters';

import AppText from '@/components/AppText.jsx';
import ScreenContainer from '@/components/containers/PaddedScreenContainer.jsx';

export default function Prizes() {
  const { loading, value: prizes } = useAsync(async () => {
    const { data: { prizes: apiPrizes } } = await api.draws.retrieveMetadata();
    return apiPrizes;
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={COLORS.blue} />
      </LoadingContainer>
    );
  }

  return (
    <ScreenContainer>
      <TitleText>{ I18n.t('screens.prizes.title') }</TitleText>
      <AppText>{ I18n.t('screens.prizes.text') }</AppText>
      <PrizesContainer>
        <PrizeHeader header>
          <AppText>
            { I18n.t('screens.prizes.matches') }
          </AppText>
          <AppText>
            { I18n.t('screens.prizes.prize') }
          </AppText>
        </PrizeHeader>
        {
          map(
            prizes,
            (prize, matches) => (
              <PrizeContainer key={`${matches}-matches-prize`}>
                <WhiteText>
                  { matches }
                </WhiteText>
                <PrizeText>
                  { formatCurrency(prize) }
                </PrizeText>
              </PrizeContainer>
            ),
          )
        }
      </PrizesContainer>
    </ScreenContainer>
  );
}

const LoadingContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const PrizesContainer = styled.View`
  display: flex;
  ${StyleUtils.spacedTop()}
`;

const PrizeContainer = styled.View`
  align-items: center;
  background-color: ${COLORS.blue};
  flex-direction: row;
  justify-content: space-between;
  ${StyleUtils.paddedX()}
  ${StyleUtils.paddedY('sm')}
  ${StyleUtils.rounded('sm')}
  ${StyleUtils.spacedTop('xs')}
`;

const PrizeHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  ${StyleUtils.paddedX()}
`;

const WhiteText = styled(AppText)`
  color: white;
`;

const PrizeText = styled(AppText)`
  color: ${COLORS.green};
  font-weight: 600;
`;
