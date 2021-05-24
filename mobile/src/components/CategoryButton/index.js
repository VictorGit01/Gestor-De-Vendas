import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import colors from '../../styles/colors';

export default function CategoryButton({ 
    title, 
    active = false, 
    ...rest 
}) {
    return (
        <RectButton
            style={[
                styles.container,
                active && styles.containerActive
            ]}
            {...rest}
        >
            <Text style={[
                styles.text,
                active && styles.textActive
            ]}>
                { title }
            </Text>
        </RectButton>
    )
};