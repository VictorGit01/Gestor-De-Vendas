import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

export default function Button({ title, onPress }) {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.text}>
                { title }
            </Text>
        </TouchableOpacity>
    )
};