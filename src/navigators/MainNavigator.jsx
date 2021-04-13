import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import useSession from '@/hooks/useSession';

import LoggedNavigator from './LoggedNavigator.jsx';
import SessionNavigator from './SessionNavigator.jsx';

export default function MainNavigator() {
  const {
    login, logout, isLogged, userId, checkedLocal,
  } = useSession();

  useEffect(() => {
    async function hideSplash() {
      if (checkedLocal) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [checkedLocal]);

  if (!checkedLocal) {
    return null;
  }

  if (isLogged) {
    return <LoggedNavigator logout={logout} userId={userId} />;
  }

  return (
    <SessionNavigator login={login} />
  );
}
