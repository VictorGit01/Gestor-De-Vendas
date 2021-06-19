import React, { useEffect, useState, useContext, useRef } from 'react';
import { Animated, Image } from 'react-native';
import { 
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
} from '@expo-google-fonts/roboto';

import { PreloadContext } from '../../contexts/preload';

import styles from './styles';

import splashIcon from '../../assets/splash-icon.png'

function Splash() {
    const [ loadImage, setLoadImage ] = useState(false);
    const [ fontsLoaded ] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    });

    const { preload, setPreload } = useContext(PreloadContext);

    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let isActive = true;
        
        async function handleLoading() {
            try {
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log('LOAD_IMAGE')
                console.log(loadImage)
                console.log('FONTS_LOADED')
                console.log(fontsLoaded)
                if (isActive) {
                    if (loadImage && fontsLoaded) {
                        fadeOut();
                        setPreload({
                            ...preload,
                            loadImage,
                            fontsLoaded,
                        });
                    }
                }
            } catch(error) {
                console.log(error);
            }
        }

        handleLoading();

        return () => {
            isActive = false;
        }
    }, [loadImage, fontsLoaded]);

    function fadeOut() {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    return (
        <Animated.View style={[
            styles.container,
            { opacity: fadeAnim }
        ]}>
            <Image 
                source={splashIcon} 
                style={styles.image}
                onLoadEnd={() => setLoadImage(true)}
            />
        </Animated.View>
    );
};

export default Splash;