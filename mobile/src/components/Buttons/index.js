import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import styles from './styles';

export default function Buttons() {
    return (
        <View style={styles.container}>
            <RectButton 
                onPress={() => {}}
                style={[styles.button, styles.buttonPrimary]}
            >
                <FontAwesome5 name="users" size={40} color="#fff" />
                <Text style={styles.buttonText}>Clientes</Text>
            </RectButton>

            <RectButton 
                onPress={() => {}}
                style={[styles.button, styles.buttonSecondary]}
            >
                <Entypo name="archive" size={40} color="#fff" />
                <Text style={styles.buttonText}>Produtos</Text>
            </RectButton>
        </View>
    )
};