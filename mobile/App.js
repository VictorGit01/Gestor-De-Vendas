import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { SalesProvider } from './src/contexts/sales';
import { MessageProvider } from './src/contexts/message';

import OverlayMessage from './src/components/OverlayMessage';

import Routes from './src/routes';

export default function App() {

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside']);
  }, []);

  useEffect(() => {
    // async function storeStateOfFonts() {
    //   await AsyncStorage.setItem('@mobile:state_fonts', fontsLoaded ? 'true' : '');
    // }

    // storeStateOfFonts();
  }, []);

  return (
    <SalesProvider>
      <MessageProvider>
        <StatusBar style="light" />
        <Routes />
        <OverlayMessage />
      </MessageProvider>
    </SalesProvider>
  );
};