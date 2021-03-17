import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

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

export default function LoggedNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          activeTintColor: COLORS.darkBlue,
          inactiveTintColor: COLORS.gray,
        }}
      >
        <Tab.Screen
          name="Landing"
          component={Landing}
          options={{
            tabBarIcon: getTabBarIconFunction(FontAwesome5, 'piggy-bank'),
          }}
        />
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
          component={Settings}
          options={{
            tabBarIcon: getTabBarIconFunction(FontAwesome5, 'cog'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
