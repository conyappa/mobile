import React from 'react';

import setupLocalization from './locales';

import MainNavigator from './navigators/MainNavigator.jsx';

setupLocalization();

export default function App() {
  return (
    <MainNavigator />
  );
}
