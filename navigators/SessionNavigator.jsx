import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import Login from '../screens/Login.jsx';
import Signup from '../screens/Signup.jsx';

const Stack = createStackNavigator();

export default function SessionNavigator({ login }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login">
          {() => <Login login={login} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {() => <Signup login={login} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

SessionNavigator.propTypes = {
  login: PropTypes.func.isRequired,
};
