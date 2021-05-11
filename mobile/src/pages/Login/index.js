import React from 'react';
import { SafeAreaView, 
    View, 
    Text, 
    TextInput, 
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import styles from './styles';

import Button from '../../components/Button';

import colors from '../../styles/colors';

function Login() {
    const navigation = useNavigation();

    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    function navigateToDashboard() {
        navigation.navigate('Dashboard');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá Rosiane!</Text>
                    <Text style={styles.info}>
                        Agora são {`${hours}:${minutes}h`}. {'\n'}
                        Faça seu login para continuar.
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.action}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Seu e-mail'
                            placeholderTextColor={colors.rose_light}
                        />
                    </View>
                    
                    <View style={styles.action}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Sua senha'
                            placeholderTextColor={colors.rose_light}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button title='Entrar' onPress={navigateToDashboard} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;