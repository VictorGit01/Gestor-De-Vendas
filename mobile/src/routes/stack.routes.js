import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import UserInformation from '../pages/UserInformation';
import UpdatePassword from '../pages/UpdatePassword';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Categories from '../pages/Categories';
import CreateProduct from '../pages/CreateProduct';

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
            name="Dashboard"
            component={Dashboard}
        />

        <stackRoutes.Screen
            name="UserInformation"
            component={UserInformation}
        />

        <stackRoutes.Screen
            name="UpdatePassword"
            component={UpdatePassword}
        />

        <stackRoutes.Screen
            name="Products"
            component={Products}
        />

        <stackRoutes.Screen
            name="ProductDetails"
            component={ProductDetails}
        />

        <stackRoutes.Screen
            name="Categories"
            component={Categories}
        />

        <stackRoutes.Screen
            name="CreateProduct"
            component={CreateProduct}
        />
    </stackRoutes.Navigator>
);

export default AppRoutes;