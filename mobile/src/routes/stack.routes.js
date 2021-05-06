import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const stackRoutes = createStackNavigator();

const AppRoutes = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: "#0FF2C9"
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <stackRoutes.Screen
            name="Splash"
            component={Splash}
        />
        <stackRoutes.Screen
            name="Login"
            component={Login}
        />
        <stackRoutes.Screen
            name="Dashboard"
            component={Dashboard}
        />
    </stackRoutes.Navigator>
);

export default AppRoutes;