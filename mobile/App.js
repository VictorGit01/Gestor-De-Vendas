import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { PreloadProvider } from './src/contexts/preload';
import { AuthProvider } from './src/contexts/auth';
import { SalesProvider } from './src/contexts/sales';
import { MessageProvider } from './src/contexts/message';

import OverlayMessage from './src/components/OverlayMessage';

import Routes from './src/routes';

export default function App() {

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside",
      // "Warning: Can't perform a React state update on an unmounted component",
      "Setting a timer for a long period of time, i.e. multiple minutes"
    ]);
    // LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component"]);
    // LogBox.ignoreLogs(["Setting a timer for a long period of time, i.e. multiple minutes"]);
  }, []);

  return (
    <PreloadProvider>
      <AuthProvider>
        <SalesProvider>
          <MessageProvider>
            <StatusBar style="light" />
            <Routes />
            <OverlayMessage />
          </MessageProvider>
        </SalesProvider>
      </AuthProvider>
    </PreloadProvider>
  );
};