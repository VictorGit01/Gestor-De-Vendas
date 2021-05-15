import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SalesProvider } from './src/contexts/sales';

import colors from './src/styles/colors';

import Routes from './src/routes';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside'])
  }, [])

  useEffect(() => {
    async function storeStateOfFonts() {
      await AsyncStorage.setItem('@mobile:state_fonts', fontsLoaded ? 'true' : '');
    }

    storeStateOfFonts();
  }, [fontsLoaded]);

  return (
    <SalesProvider>
      <StatusBar style="light" backgroundColor={colors.blue_light} />
      <Routes />
    </SalesProvider>
  );
};