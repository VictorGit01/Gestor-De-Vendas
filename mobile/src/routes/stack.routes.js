import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UserInfo from '../pages/UserInfo';
import NewPassword from '../pages/NewPassword';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';

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

        <stackRoutes.Screen
            name="UserInfo"
            component={UserInfo}
        />

        <stackRoutes.Screen
            name="NewPassword"
            component={NewPassword}
        />

        <stackRoutes.Screen
            name="Products"
            component={Products}
        />

        <stackRoutes.Screen
            name="ProductDetails"
            component={ProductDetails}
        />
    </stackRoutes.Navigator>
);

export default AppRoutes;