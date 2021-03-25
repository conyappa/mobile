import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../api/index';
import Balance from '../components/Balance.jsx';
import ScreenContainer from '../components/ScreenContainer.jsx';

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
    <ScreenContainer>
      <Balance balance={balance} />
    </ScreenContainer>
  );
}

Landing.propTypes = {
  userId: PropTypes.string.isRequired,
};
