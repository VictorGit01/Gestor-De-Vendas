import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Splash from '../pages/Splash';

const PreloadStack = createStackNavigator();

const PreloadRoutes = () => (
    <PreloadStack.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: "#0FF2C9"
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <PreloadStack.Screen 
            name="Splash"
            component={Splash}
        />
    </PreloadStack.Navigator>
);

export default PreloadRoutes;