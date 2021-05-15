import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

export default function Button({ title, onPress }) {
    return (
        <RectButton 
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.text}>
                { title }
            </Text>
        </RectButton>
    )
};