import React, { useContext } from 'react';
import {
    View, 
    Text, 
    TextInput
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Entypo, FontAwesome } from '@expo/vector-icons';

import { SalesContext } from '../../contexts/sales';

import styles from './styles';
import colors from '../../styles/colors';

export default function Header({
    page, 
    search,
    handleSearchChange, 
    handleSubmitSearch,
    amountProducts, 
    children,
}) {
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
                        <Entypo name="calendar" style={styles.calendarIcon} />
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
    } else if (page == ("products" || "clients")) {
        return (
            <View style={styles.searchContainer}>
                <View style={styles.searchContent}>
                    <Text style={styles.amount}>{amountProducts} unidades</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Buscar produto"
                            placeholderTextColor={colors.gray_input}
                            selectionColor={colors.rose}
                            returnKeyType="search"
                            onSubmitEditing={handleSubmitSearch}
                            value={search}
                            onChangeText={handleSearchChange}
                        />
                        <RectButton 
                            style={styles.searchIconContainer}
                            onPress={handleSubmitSearch}
                        >
                            <FontAwesome name="search" style={styles.defaultIcon} />
                        </RectButton>
                    </View>
                </View>

                {children}
            </View>
        )
    } else if (page == "categories") {
        return (
            <View style={styles.container}>
                {children}
            </View>
        )
    }
}