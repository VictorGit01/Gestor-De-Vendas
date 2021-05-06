import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import styles from './styles';

import splashIcon from '../../assets/splash-icon.png'

function Splash() {
    const [ logged, setLogged ] = useState(false);

    const navigation = useNavigation();

    useFocusEffect(() => {
        // changeColor();
        navigateToNextPage();
    });

    async function changeColor() {
        try {
            await changeNavigationBarColor('#0FF2C9', true);
            // hideNavigationBar();
        } catch(e) {
            console.log(e)
        }
    }

    async function navigateToNextPage() {
        if (!logged) {
            setTimeout(() => {
                navigation.navigate('Login');
            }, 1500);
        } else {
            setTimeout(() => {
                navigation.navigate('Dashboard');
            }, 1500);
        }
    }

    return (
        <View style={styles.container} >
            <Image source={splashIcon} style={styles.image} />
        </View>
    );
};

export default Splash;