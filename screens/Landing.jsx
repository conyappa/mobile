import React, { useState, useEffect } from 'react';

import api from '../api/index';

import BalanceContainer from '../components/BalanceContainer.jsx';
import ScreenContainer from '../components/ScreenContainer.jsx';

export default function Landing() {
  const [user, setUser] = useState({});

  function fetchUserData() {
    api.users.fetchProfile().then(({ data }) => {
      setUser(data);
    });
  }

  useEffect(fetchUserData, []);

  return (
    <ScreenContainer>
      <BalanceContainer balance={user.balance} />
    </ScreenContainer>
  );
}
