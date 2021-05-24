import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../../assets/loading.json';

import styles from './styles';

export default function Loader() {
    return (
        <View style={styles.container}>
            <LottieView
                source={loadAnimation}
                autoPlay
                loop
                speed={2}
                style={styles.animation}
            />
        </View>
    );
};