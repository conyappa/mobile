import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

import useSession from '@/hooks/useSession';

import LoggedNavigator from './LoggedNavigator.jsx';
import SessionNavigator from './SessionNavigator.jsx';

export default function MainNavigator() {
  const {
    login, logout, userId, checkedLocal,
  } = useSession();

  const isLoggedIn = useSelector((state) => state.session.value);

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

  if (isLoggedIn) {
    return <LoggedNavigator logout={logout} userId={userId} />;
  }

  return <SessionNavigator login={login} />;
}
