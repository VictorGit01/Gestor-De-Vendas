import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Fi from '@expo/vector-icons/Feather';

import backIcon from '../../assets/icons/back.png';

import styles from './styles';

export default function NavBar({ title, page, navigateToUserInfo }) {
    const navigation = useNavigation();

    function goToPreviousScreen() {
        navigation.goBack()
    }

    return (
        <View 
            style={[
                styles.container, 
                {alignItems: !page ? 'center' : 'flex-end',}
            ]}
        >
            {!page && (
                <>
                    <BorderlessButton
                        hitSlop={{ horizontal: 20, vertical: 20 }}
                        onPress={goToPreviousScreen}
                    >
                        <Image source={backIcon} style={styles.backIcon} />
                    </BorderlessButton>
        
                    <Text style={styles.title}>{title}</Text>

                    <View style={{ width: 30 }} />
                </>
            )}

            {page == "dashboard" && (
                <>
                    <TouchableOpacity 
                        style={styles.userButton}
                        activeOpacity={.7}
                        onPress={navigateToUserInfo}
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
                        <Fi name="power" style={styles.powerIcon} />
                    </TouchableOpacity>
                </>
            )}
    </View>)
}