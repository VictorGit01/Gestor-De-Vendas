import React from 'react';
import { Text, Image, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../styles/colors';

export default function ProductCard({ data, ...rest }) {
    return (
        <RectButton
            style={styles.container}
            rippleColor='rgba(0, 0, 0, .08)'
            {...rest}
        >
            <Image source={{ uri: data.photo }} style={styles.photo} />
            <View style={styles.labelContainer}>
                <Text style={styles.text}>
                    { data.name }
                </Text>
                <Text style={styles.price}>
                    { `R$ ${data.price.toFixed(2).replace('.', ',')}` }
                </Text>
                <Feather 
                    name={data.available ? "check-circle" : "x-circle"}
                    style={[
                        styles.icon, 
                        data.available ? styles.availableIcon : styles.unavailableIcon
                    ]} 
                />
            </View>
        </RectButton>
    )
};