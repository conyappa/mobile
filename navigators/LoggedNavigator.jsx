import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { COLORS, ICON_SIZES } from '../utils/styles';

import Deposit from '../screens/Deposit.jsx';
import Tickets from '../screens/Tickets.jsx';
import Landing from '../screens/Landing.jsx';
import Prizes from '../screens/Prizes.jsx';
import Settings from '../screens/Settings.jsx';

const Tab = createBottomTabNavigator();

function getTabBarIconFunction(IconComponent, name) {
  function tabBarIcon({ color }) {
    return (
      <IconComponent
        name={name}
        color={color}
        size={ICON_SIZES.lg}
      />
    );
  }

  return tabBarIcon;
}

export default function LoggedNavigator({ logout, userId }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          activeTintColor: COLORS.blue,
          inactiveTintColor: COLORS.gray500,
        }}
      >
        <Tab.Screen
          name="Landing"
          options={{
            tabBarIcon: getTabBarIconFunction(FontAwesome5, 'piggy-bank'),
          }}
        >
          {() => <Landing userId={userId} />}
        </Tab.Screen>
        <Tab.Screen
          name="Deposit"
          component={Deposit}
          options={{
            tabBarIcon: getTabBarIconFunction(FontAwesome, 'bank'),
          }}
        />
        <Tab.Screen
          name="Tickets"
          component={Tickets}
          options={{
            tabBarIcon: getTabBarIconFunction(FontAwesome5, 'ticket-alt'),
          }}
        />
        <Tab.Screen
          name="Prizes"
          component={Prizes}
          options={{
            tabBarIcon: getTabBarIconFunction(FontAwesome, 'trophy'),
          }}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarIcon: getTabBarIconFunction(FontAwesome5, 'cog'),
          }}
        >
          {() => <Settings logout={logout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

LoggedNavigator.propTypes = {
  logout: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
