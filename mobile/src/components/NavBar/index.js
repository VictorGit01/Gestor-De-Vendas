import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Fi from '@expo/vector-icons/Feather';

import styles from './styles';

export default function NavBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.userButton}>
                <View style={styles.initialsRadius}>
                    <Text style={styles.initials}>
                        RD
                    </Text>
                </View>
                <Text style={styles.email}>
                    rosiane@gmail.com
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.powerButton}>
                <Fi name="power" style={styles.powerIcon} />
            </TouchableOpacity>
        </View>
    )
};