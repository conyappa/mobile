/* eslint-disable react/jsx-props-no-spreading */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';

const StoreSessionContext = createContext();

export function useStoreSession() {
  const context = useContext(StoreSessionContext);
  if (!context) {
    throw new Error('useStoreSession must be used within a StoreSessionProvider');
  }
  return context;
}

export function StoreSessionProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = useMemo(() => [isLoggedIn, setIsLoggedIn], [isLoggedIn]);
  return <StoreSessionContext.Provider value={value} {...props} />;
}
