import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

export default function FlyingButton({ onPress }) {
    return (
        <RectButton 
            style={styles.container}
            onPress={onPress}    
        >
            <Feather name="plus" style={styles.icon} />
        </RectButton>
    )
}