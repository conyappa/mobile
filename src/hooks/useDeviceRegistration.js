import { useCallback, useEffect, useState } from 'react';
import { Platform, AppState } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Application from 'expo-application';

import api from '@/api';

export default function useDeviceRegistration(userId) {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [iosId, setIosId] = useState(null);
  const [androidId, setAndroidId] = useState(null);

  async function getPermissionsAsync() {
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

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      }
    }
  }

  async function getDeviceId() {
    if (Platform.OS === 'ios') {
      const iosIdForVendor = await Application.getIosIdForVendorAsync();
      setIosId(iosIdForVendor);
    } else if (Platform.OS === 'android') {
      setAndroidId(Application.androidId);
    }
  }

  const register = useCallback(
    () => {
      getPermissionsAsync();
      getDeviceId();
    },
    [],
  );

  // Add listener for app state change
  useEffect(() => {
    function registerOnAppStateChange(nextAppState) {
      if (nextAppState === 'active') {
        register();
      }
    }
    AppState.addEventListener('change', registerOnAppStateChange);

    return () => {
      AppState.removeEventListener('change', registerOnAppStateChange);
    };
  }, [register]);

  // Run on effect mount
  useEffect(() => {
    register();
  }, [register]);

  useEffect(() => {
    if (expoPushToken && iosId) {
      api.devices.create(userId, { expoPushToken, iosId });
    }
  }, [userId, expoPushToken, iosId]);

  useEffect(() => {
    if (expoPushToken && androidId) {
      api.devices.create(userId, { expoPushToken, androidId });
    }
  }, [userId, expoPushToken, androidId]);
}
