import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import useSession from '@/hooks/useSession';
import { useStoreSession } from '@/store/session.jsx';

import LoggedNavigator from './LoggedNavigator.jsx';
import SessionNavigator from './SessionNavigator.jsx';

export default function MainNavigator() {
  const {
    login, logout, userId, checkedLocal,
  } = useSession();

  const [isLoggedIn] = useStoreSession();

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
