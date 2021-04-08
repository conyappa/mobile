import React from 'react';

import setupLocalization from './src/locales';

import MainNavigator from './src/navigators/MainNavigator.jsx';

setupLocalization();

export default function App() {
  return (
    <MainNavigator />
  );
}
