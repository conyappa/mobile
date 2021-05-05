import React from 'react';
import styled from 'styled-components/native';
import {
  map, range, toString,
} from 'lodash';
import I18n from 'i18n-js';
import { useQuery, useQueryClient } from 'react-query';
import { MaterialIcons } from '@expo/vector-icons';

import { StyleUtils, COLORS, SPACING } from '@/utils/styles';
import api from '@/api';
import { PRIZES_QUERY_KEY } from '@/utils/constants';

import AppText from '@/components/AppText.jsx';
import ScreenContainer from '@/components/containers/PaddedScreenContainer.jsx';
import PrizeField from '@/components/PrizeField.jsx';

export default function Prizes() {
  const {
    data: { prizes = [] } = {},
    isLoading,
  } = useQuery(PRIZES_QUERY_KEY, api.draws.retrieveMetadata);
  const queryClient = useQueryClient();

  const prizeIndices = map(range(7, -1), toString);

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
              prizeIndices,
              (matches) => (
                <PrizeField
                  key={`${matches}-matches-prize`}
                  matches={matches}
                  prize={prizes[matches]}
                />
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

const PrizeHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  ${StyleUtils.paddedX()}
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
