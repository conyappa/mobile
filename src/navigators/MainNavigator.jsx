import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import useSession from '@/hooks/useSession';

import LoggedNavigator from './LoggedNavigator.jsx';
import SessionNavigator from './SessionNavigator.jsx';

export default function MainNavigator() {
  const {
    login, logout, isLogged, userId, checkedLocal,
  } = useSession();
  const [, setExpoPushToken] = useState(null);

  useEffect(() => {
    async function hideSplash() {
      if (checkedLocal) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [checkedLocal]);

  async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: currentStatus } = await Notifications.getPermissionsAsync();
      let status = currentStatus;

      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        status = newStatus;
      }

      if (status === 'granted') {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);
      }
    }
  }

  useEffect(() => { registerForPushNotificationsAsync(); }, []);

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
