import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';

import backIcon from '../../assets/icons/back.png';
import categoriesIcon from '../../assets/icons/categories.png';

import styles from './styles';

export default function NavBar({ 
    title, 
    page, 
    navigateToUserInformation, 
    openModal,
    rightPress,
    buttonsEnabled,
}) {
    const navigation = useNavigation();

    function goToPreviousScreen() {
        navigation.goBack()
    }

    return (
        <View 
            style={[
                styles.container, 
                {alignItems: page != "dashboard" ? 'center' : 'flex-end',}
            ]}
        >
            <StatusBar style='light' />
            {page != "dashboard" && (
                <>
                    <BorderlessButton
                        style={[styles.button, styles.buttonPrimary]}
                        hitSlop={{ horizontal: 20, vertical: 20 }}
                        enabled={buttonsEnabled}
                        onPress={goToPreviousScreen}
                    >
                        <Image source={backIcon} style={styles.defaultIcon} />
                    </BorderlessButton>
        
                    <Text style={styles.title}>{title}</Text>

                    {page == 'products' || page == 'product_details' ?
                    <BorderlessButton 
                        style={[styles.button, styles.buttonSecondary]}
                        enabled={buttonsEnabled}
                        onPress={page == 'product_details' 
                            ? openModal
                            : rightPress
                        }
                    >
                        {page == 'products' 
                        ? 
                        <Image 
                            source={categoriesIcon} 
                            style={styles.defaultIcon} 
                        />
                        : 
                        <FontAwesome 
                            name="ellipsis-v" 
                            style={styles.ellipsisIcon} 
                        />}
                    </BorderlessButton>
                    :
                    <View style={styles.defaultIcon} />}
                </>
            )}

            {page == "dashboard" && (
                <>
                    <TouchableOpacity 
                        style={styles.userButton}
                        activeOpacity={.7}
                        onPress={navigateToUserInformation}
                    >
                        <View style={styles.initialsRadius}>
                            <Text style={styles.initials}>
                                RD
                            </Text>
                        </View>
                        <Text style={styles.email}>
                            rosiane@gmail.com
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.powerButton} 
                        activeOpacity={.6}
                        onPress={() => {}}
                    >
                        <Feather name="power" style={styles.powerIcon} />
                    </TouchableOpacity>
                </>
            )}
    </View>)
}