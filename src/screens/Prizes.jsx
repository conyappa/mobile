import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import { map } from 'lodash';
import I18n from 'i18n-js';

import { StyleUtils, COLORS } from '@/utils/styles';
import api from '@/api';

import AppText from '@/components/AppText.jsx';
import ScreenContainer from '@/components/containers/PaddedScreenContainer.jsx';

export default function Prizes() {
  const [{ loading, value: prizes }, fetchPrizes] = useAsyncFn(async () => {
    const { data: { prizes: apiPrizes } } = await api.draws.retrieveMetadata();
    return apiPrizes;
  }, []);

  useEffect(() => {
    fetchPrizes();
  }, [fetchPrizes]);

  return (
    <ScreenContainer
      onRefresh={fetchPrizes}
      refreshing={loading}
    >
      <TitleText>{ I18n.t('screens.prizes.title') }</TitleText>
      <AppText>{ I18n.t('screens.prizes.text') }</AppText>
      {
        prizes && (
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
                    { I18n.toCurrency(prize) }
                  </PrizeText>
                </PrizeContainer>
              ),
            )
          }
          </PrizesContainer>
        )
      }
    </ScreenContainer>
  );
}

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
