import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import useAsync from 'react-use/lib/useAsync';
import { parse } from 'date-fns';

import { StyleUtils } from '@/utils/styles';

import api from '@/api/index';
import Balance from '@/components/Balance.jsx';
import ScreenContainer from '@/components/containers/PaddedScreenContainer.jsx';
import OngoingDraw from '@/components/OngoingDraw.jsx';

export default function Landing({ userId }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [results, setResults] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [prizes, setPrizes] = useState({});

  async function fetchUserData() {
    const { data: userData } = await api.users.retrieve(userId);
    setUser(userData);
  }

  async function fetchOngoingDraw() {
    const {
      data: {
        results: ongoingResults,
        startDate: ongoingStartDate,
      },
    } = await api.draws.retrieveOngoing();
    setResults(ongoingResults);
    setStartDate(parse(ongoingStartDate, 'y-MM-dd', new Date()));
  }

  async function fetchPrizes() {
    const { data: { prizes: prizesData } } = await api.draws.retrieveMetadata();
    setPrizes(prizesData);
  }

  async function fetchAllData() {
    setLoading(true);
    await Promise.all([
      fetchUserData(),
      fetchOngoingDraw(),
      fetchPrizes(),
    ]);
    setLoading(false);
  }

  useAsync(fetchUserData, [userId]);
  useAsync(fetchOngoingDraw, []);
  useAsync(fetchPrizes, []);

  const { balance } = user;

  return (
    <ScreenContainer
      onRefresh={fetchAllData}
      refreshing={loading}
    >
      <Balance balance={balance} />
      <SpacedOngoingDraw
        results={results}
        startDate={startDate}
        prizes={prizes}
      />
    </ScreenContainer>
  );
}

Landing.propTypes = {
  userId: PropTypes.string.isRequired,
};

const SpacedOngoingDraw = styled(OngoingDraw)`
  ${StyleUtils.spacedTop()}
`;
