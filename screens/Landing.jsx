import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import api from '../api/index';
import Balance from '../components/Balance.jsx';
import LoggedScreen from '../components/LoggedScreen.jsx';
import OngoingDraw from '../components/OngoingDraw.jsx';
import { StyleUtils } from '../utils/styles';

export default function Landing({ userId }) {
  const [user, setUser] = useState({});

  function fetchUserData() {
    api.users.retrieve(userId).then(({ data }) => {
      setUser(data);
    });
  }

  useEffect(fetchUserData, [userId]);

  const { balance } = user;

  return (
    <LoggedScreen>
      <Balance balance={balance} />
      <SpacedOngoingDraw />
    </LoggedScreen>
  );
}

Landing.propTypes = {
  userId: PropTypes.string.isRequired,
};

const SpacedOngoingDraw = styled(OngoingDraw)`
  ${StyleUtils.spacedTop()}
`;
