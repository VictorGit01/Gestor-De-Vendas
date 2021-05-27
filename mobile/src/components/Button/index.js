import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

export default function Button({ title, onPress, onBegan, onEnded }) {
    return (
        <RectButton 
            style={styles.container}
            onPress={onPress}
            onBegan={onBegan}
            onEnded={onEnded}
        >
            <Text style={styles.text}>
                { title }
            </Text>
        </RectButton>
    )
};