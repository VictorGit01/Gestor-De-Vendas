import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

import splashIcon from '../../assets/splash-icon.png'

function Splash() {
    const [ logged, setLogged ] = useState(false);
    const [ loaded, setLoaded ] = useState(false);
    const [ fontsLoaded, setFontsLoaded ] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Dashboard');
        }, 1500);
        // async function loadStateOfStorageSources() {
        //     const state_fonts = await AsyncStorage.getItem('@mobile:state_fonts')
        //     setFontsLoaded(state_fonts ? true : false);
        //     console.log(state_fonts);

            // navigateToNextPage();
        // }

        // AsyncStorage.getItem('@mobile:state_fonts')
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

    async function changeColor() {
        try {
            await changeNavigationBarColor('#0FF2C9', true);
            // hideNavigationBar();
        } catch(e) {
            console.log(e)
        }
    }

    function navigateToNextPage() {
        if (!logged && loaded) {
            setTimeout(() => {
                navigation.navigate('Login');
            }, 1500);
        } else if (logged && loaded) {
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
                onLoad={() => setLoaded(true)} 
            />
        </View>
    );
};

export default Splash;