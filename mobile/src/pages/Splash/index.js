import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { 
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
} from '@expo-google-fonts/roboto';

import styles from './styles';

import splashIcon from '../../assets/splash-icon.png'

function Splash() {
    const [ logged, setLogged ] = useState(true);
    const [ loadImage, setLoadImage ] = useState(false);
    // const [ fontsLoaded, setFontsLoaded ] = useState(false);
    const [ fontsLoaded ] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    });

    const navigation = useNavigation();

    useEffect(() => {
        // setTimeout(() => {
        //     navigation.navigate('Dashboard');
        // }, 1500); 
        // async function loadStateOfStorageSources() {
        //     const state_fonts = await AsyncStorage.getItem('@mobile:state_fonts')
        //     setFontsLoaded(state_fonts ? true : false);
        //     console.log(state_fonts);

            // navigateToNextPage();
        // }// AsyncStorage.getItem('@mobile:state_fonts')
        //     .then(state => {
        //         if (state == 'true') {
        //             setFontsLoaded(true);
        //             console.log(state);

        //             navigateToNextPage();
        //         } else {
        //             console.log(state);
        //             setFontsLoaded(false)
        //         }
        //     })

        // loadStateOfStorageSources();
        // changeColor();
    }, []);

    useEffect(() => {
        navigateToNextPage();
    }, [loadImage, fontsLoaded]);

    function navigateToNextPage() {
        if (!logged && loadImage && fontsLoaded) {
            setTimeout(() => {
                navigation.navigate('Login');
            }, 1500);
        } else if (logged && loadImage && fontsLoaded) {
            setTimeout(() => {
                navigation.navigate('Dashboard');
            }, 1500);
        }
    }

    return (
        <View style={styles.container} >
            <Image 
                source={splashIcon} 
                style={styles.image} 
                onLoad={() => setLoadImage(true)}
            />
        </View>
    );
};

export default Splash;