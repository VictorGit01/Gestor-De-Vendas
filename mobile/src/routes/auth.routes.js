import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Login from '../pages/Login';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: "#0FF2C9"
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <AuthStack.Screen 
            name="Login" 
            component={Login} 
        />
    </AuthStack.Navigator>
);

export default AuthRoutes;