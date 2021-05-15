import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { SalesContext } from '../../contexts/sales';

import styles from './styles';

export default function Header({ page }) {
    const { salesInfo } = useContext(SalesContext);

    const { percentageDifference } = salesInfo;

    const months = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Dezembro' ]

    const date = new Date();

    const currentDay = date.getDate();
    const monthNumber = date.getMonth();
    const currentMonth = monthNumber != 4 
    ? months[monthNumber].slice(0, 3) 
    : months[monthNumber];
    const currentYear = date.getFullYear();

    if (page == "dashboard") {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Minhas Vendas
                    </Text>
                    <Text style={styles.subTitle}>
                        Resumo (privado)
                    </Text>
                </View>
    
                <View style={styles.bottomContent}>
                    <View style={styles.iconContainer}>
                        <Entypo name="calendar" style={styles.icon} />
                    </View>
    
                    <View style={styles.infoContainer}>
                        <Text style={styles.date}>
                            {`${currentDay} ${currentMonth}, ${currentYear}`}
                        </Text>
                        <Text style={styles.statistic}>
                            {Math.abs(Number(percentageDifference))}% 
                            {Number(percentageDifference) >= 0 
                            ? ' a mais que no mês passado'
                            : ' a menos que no mês passado'}
                        </Text>
                    </View>
                </View>
    
            </View>
        )
    }
}