import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { map, min } from 'lodash';

import I18n from 'i18n-js';
import { ActivityIndicator } from 'react-native';
import { COLORS, StyleUtils } from '@/utils/styles';
import api from '@/api';

import AppText from '@/components/AppText.jsx';
import Ticket from '@/components/Ticket.jsx';
import LoggedScreen from '@/components/LoggedScreen.jsx';

const SHOWN_TICKETS = 20;
export default function Tickets({ userId }) {
  const [tickets, setTickets] = useState([]);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function fetchTicketsData() {
    setLoading(true);
    setError(false);
    api.tickets.retrieve(userId, { pageSize: SHOWN_TICKETS })
      .then(
        ({ data: { count: apiCount, results } }) => {
          setTickets(results);
          setCount(apiCount);
        },
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(fetchTicketsData, [userId]);

  if (loading || count === null) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={COLORS.blue} />
      </LoadingContainer>
    );
  }

  if (error || count === 0) {
    return (
      <LoggedScreen>
        <TitleText>{I18n.t('screens.tickets.none')}</TitleText>
      </LoggedScreen>
    );
  }

  return (
    <LoggedScreen>
      <TitleText>{I18n.t('screens.tickets.ticketCount', { count })}</TitleText>
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
    </LoggedScreen>
  );
}

Tickets.propTypes = {
  userId: PropTypes.string.isRequired,
};

const LoadingContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const TicketsContainer = styled.SafeAreaView`
  ${StyleUtils.spacedTop()}
`;

const SpacedTicket = styled(Ticket)`
  ${({ isFirst }) => !isFirst && StyleUtils.spacedTop()}
`;
