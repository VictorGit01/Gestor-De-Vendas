import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import styles from './styles';

export default function CategoryHeaderSection({ 
    selectedView, setSelectedView 
}) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>CATEGORIAS</Text>
                <Text style={styles.subTitle}>2 no total</Text>
            </View>

            <View style={styles.buttonsContainer} >
                <TouchableOpacity
                    style={[
                        styles.button, 
                        selectedView == 'chart' && styles.activeButton
                    ]}
                    onPress={() => setSelectedView('chart')}
                    activeOpacity={.6}
                >
                    <Entypo name="bar-graph" style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedView == 'buttons' && styles.activeButton
                    ]}
                    onPress={() => setSelectedView('buttons')}
                    activeOpacity={.6}
                >
                    <Entypo name="list" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}