import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';

import styles from './styles';

import colors from '../../../styles/colors';

export default function SalesSummary({ 
    data, 
    selectedMonth, 
    setSelectMonthByName 
}) {
    function renderItem({ item }) {
        return (
            <TouchableOpacity 
                style={[
                    styles.button, 
                    { 
                        backgroundColor: (selectedMonth && selectedMonth.name == item.name) 
                        ? item.color 
                        : colors.shape
                    }
                ]}
                onPress={() => setSelectMonthByName(item.name)}
                activeOpacity={.7}
            >
                <View style={styles.monthContainer}>
                    <View 
                        style={[styles.checkBox, {
                            backgroundColor: (selectedMonth && selectedMonth.name == item.name)
                            ? colors.white
                            : item.color 
                        }]}
                    />

                    <Text 
                        style={[
                            styles.name, 
                            {
                                color: (selectedMonth && selectedMonth.name == item.name)
                                ? colors.white
                                : colors.blue_dark
                            }
                        ]}
                    >
                        {item.name}
                    </Text>
                </View>

                <View style={styles.labelContainer}>
                    <Text 
                        style={[
                            styles.label, {
                            color: (selectedMonth && selectedMonth.name == item.name)
                                ? colors.white
                                : colors.blue_dark
                            }
                        ]}
                    >
                        R$ {item.y.toFixed(2).replace('.', ',')} - {item.label}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    )
};