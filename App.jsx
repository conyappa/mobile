import React from 'react';
import { LogBox } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';

import $store from './src/store';

import setupLocalization from './src/locales';

import MainNavigator from './src/navigators/MainNavigator.jsx';

setupLocalization();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
    },
  },
});

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={$store}>
        <MainNavigator />
      </Provider>
    </QueryClientProvider>
  );
}
