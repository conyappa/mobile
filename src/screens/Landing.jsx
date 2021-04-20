import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import useAsyncFn from 'react-use/lib/useAsyncFn';

import { StyleUtils } from '@/utils/styles';

import api from '@/api/index';
import Balance from '@/components/Balance.jsx';
import ScreenContainer from '@/components/containers/PaddedScreenContainer.jsx';
import OngoingDraw from '@/components/OngoingDraw.jsx';

export default function Landing({ userId }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  function fetchUserData() {
    setLoading(true);
    api.users.retrieve(userId)
      .then(({ data }) => {
        setUser(data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchUserData, [userId]);

  const { balance } = user;

  return (
    <ScreenContainer
      onRefresh={fetchUserData}
      refreshing={loading}
    >
      <Balance balance={balance} />
      <SpacedOngoingDraw />
    </ScreenContainer>
  );
}

Landing.propTypes = {
  userId: PropTypes.string.isRequired,
};

const SpacedOngoingDraw = styled(OngoingDraw)`
  ${StyleUtils.spacedTop()}
`;
