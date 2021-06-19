import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../styles/colors';

export default function Buttons() {
    const navigation = useNavigation();

    function navigateToProducts() {
        navigation.navigate('Products')
    }

    return (
        <View style={styles.container}>
            <RectButton 
                onPress={() => {}}
                style={[styles.button, styles.buttonPrimary]}
            >
                <FontAwesome5 name="users" size={40} color={colors.white} />
                <Text style={styles.buttonText}>Clientes</Text>
            </RectButton>

            <RectButton 
                onPress={navigateToProducts}
                style={[styles.button, styles.buttonSecondary]}
            >
                <Entypo name="archive" size={40} color={colors.white} />
                <Text style={styles.buttonText}>Produtos</Text>
            </RectButton>
        </View>
    )
};