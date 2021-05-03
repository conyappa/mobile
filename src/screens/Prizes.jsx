import React from 'react';
import styled from 'styled-components/native';
import { map, reverse, toArray } from 'lodash';
import I18n from 'i18n-js';
import { useQuery, useQueryClient } from 'react-query';
import { MaterialIcons } from '@expo/vector-icons';

import { StyleUtils, COLORS, SPACING } from '@/utils/styles';
import api from '@/api';
import { PRIZES_QUERY_KEY } from '@/utils/constants';

import AppText from '@/components/AppText.jsx';
import ScreenContainer from '@/components/containers/PaddedScreenContainer.jsx';

export default function Prizes() {
  const {
    data: { prizes = [] } = {},
    isLoading,
  } = useQuery(PRIZES_QUERY_KEY, api.draws.retrieveMetadata);
  const queryClient = useQueryClient();

  return (
    <ScreenContainer
      onRefresh={() => queryClient.refetchQueries([PRIZES_QUERY_KEY])}
      refreshing={isLoading}
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
              reverse(toArray(prizes)),
              ({ value, isShared }, matches) => (
                <PrizeContainer key={`${matches}-matches-prize`}>
                  <WhiteText>
                    { matches }
                  </WhiteText>
                  <Prize>
                    <PrizeText>
                      { I18n.toCurrency(value) }
                    </PrizeText>
                    {
                      isShared && <SharedIcon name="group" />
                    }
                  </Prize>
                </PrizeContainer>
              ),
            )
          }
          </PrizesContainer>
        )
      }
      <SharedDisclaimer>
        <SharedDisclaimerIcon name="group" size={SPACING.md} />
        <DisclaimerText>{ I18n.t('screens.prizes.sharedDisclaimer') }</DisclaimerText>
      </SharedDisclaimer>
    </ScreenContainer>
  );
}

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const PrizesContainer = styled.View`
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

const Prize = styled.View`
  align-items: center;
  flex-direction: row;
`;

const PrizeText = styled(AppText)`
  color: ${COLORS.green};
  font-weight: 600;
`;

const SharedIcon = styled(MaterialIcons)`
  color: ${COLORS.green};
  ${StyleUtils.spacedLeft('xs')}
`;

const SharedDisclaimer = styled.View`
  align-items: center;
  flex-direction: row;
  ${StyleUtils.spacedTop('lg')}
`;

const DisclaimerText = styled(AppText)`
  ${StyleUtils.fontSize('sm')}
  width: 90%;
`;

const SharedDisclaimerIcon = styled(MaterialIcons)`
  color: ${COLORS.blue};
  width: 10%;
`;
