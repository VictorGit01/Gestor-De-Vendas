import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import styles from './styles';

import database from '../../services/database_test';

export default function CategoryHeaderSection({ 
    selectedView, setSelectedView 
}) {
    const { products_categories: categories } = database;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>CATEGORIAS</Text>
                <Text style={styles.subTitle}>
                    {categories.length 
                    ? `${categories.length} no total`
                    : 'Sem categorias'}
                </Text>
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