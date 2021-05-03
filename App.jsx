import React from 'react';
import { LogBox } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';

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
      <MainNavigator />
    </QueryClientProvider>
  );
}
