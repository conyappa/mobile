import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { map, min } from 'lodash';
import useAsyncFn from 'react-use/lib/useAsyncFn';

import I18n from 'i18n-js';
import { StyleUtils } from '@/utils/styles';
import api from '@/api';

import AppText from '@/components/AppText.jsx';
import Ticket from '@/components/Ticket.jsx';
import ScreenContainer from '@/components/containers/PaddedScreenContainer.jsx';

const SHOWN_TICKETS = 20;
export default function Tickets({ userId }) {
  const [
    { loading, error, value }, fetchTickets,
  ] = useAsyncFn(async () => {
    const { data } = await api.tickets.retrieve(userId, { pageSize: SHOWN_TICKETS });
    return data;
  }, [userId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets, userId]);

  const { count, results: tickets } = value || {};

  if (error) {
    return (
      <ScreenContainer>
        <TitleText>{I18n.t('screens.tickets.error')}</TitleText>
      </ScreenContainer>
    );
  }

  if (count === 0) {
    return (
      <ScreenContainer>
        <TitleText>{I18n.t('screens.tickets.none')}</TitleText>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      onRefresh={fetchTickets}
      refreshing={loading}
    >
      <TitleText>
        {
          count
            ? I18n.t('screens.tickets.ticketCount', { count })
            : I18n.t('screens.tickets.title')
        }
      </TitleText>
      {
        tickets && (
          <>
            <AppText>
              {I18n.t('screens.tickets.topTickets', { count: min([tickets.length, SHOWN_TICKETS]) })}
            </AppText>
            <TicketsContainer>
              {
              map(
                tickets,
                (ticket, index) => (
                  <SpacedTicket
                    key={`ticket-${index}`}
                    isFirst={index === 0}
                    ticket={ticket}
                  />
                ),
              )
            }
            </TicketsContainer>
          </>
        )
      }
    </ScreenContainer>
  );
}

Tickets.propTypes = {
  userId: PropTypes.string.isRequired,
};

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const TicketsContainer = styled.SafeAreaView`
  ${StyleUtils.spacedTop()}
`;

const SpacedTicket = styled(Ticket)`
  ${({ isFirst }) => !isFirst && StyleUtils.spacedTop()}
`;
