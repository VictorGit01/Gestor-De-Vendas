import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PreloadContext } from '../contexts/preload';
import { AuthContext } from '../contexts/auth';

import PreloadStack from './preload.routes';
import AuthStack from './auth.routes';
import StackRoutes from './stack.routes';
import Splash from '../pages/Splash';

const Routes = () => {
    const { signed } = useContext(AuthContext);
    const { preload } = useContext(PreloadContext);

    function currentRoute() {
        if (preload.fontsLoaded && preload.loadImage && !signed) {
            return <AuthStack />;
        } else if (preload.fontsLoaded && preload.loadImage && signed) {
            return <StackRoutes />;
        } else {
            // return <PreloadStack />;
            return <Splash />;
        }
    }

    return (
        <NavigationContainer>
            {currentRoute()}
        </NavigationContainer>
    )
};

export default Routes;