import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';

import loadProductsAnimation from '../../assets/load-products.json';
import loadCostumersAnimation from '../../assets/load-costumers.json';

import styles from './styles';

export default function Load({ type }) {
    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <LottieView
                source={
                    type == 'products' 
                    ? loadProductsAnimation
                    : loadCostumersAnimation
                }
                autoPlay
                loop
                style={styles.productsAnimation}
            />
        </View>
    );
}