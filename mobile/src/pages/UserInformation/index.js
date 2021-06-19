import React, { useEffect, useState, useContext } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import { isAfter, format } from 'date-fns';

import { MessageContext } from '../../contexts/message';
import { AuthContext } from '../../contexts/auth';

import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import OverlayLoader from '../../components/OverlayLoader';

import styles from './styles';
import colors from '../../styles/colors';

import * as auth from '../../services/auth';
import * as users_db from '../../services/database/users_db';

function UserInfo() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
    const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS == 'ios');
    const [ primaryLoading, setPrimaryLoading ] = useState(true);
    const [ secondaryLoading, setSecondaryLoading ] = useState(false);

    const { updateMessage } = useContext(MessageContext);
    const { signOut } = useContext(AuthContext);

    const navigation = useNavigation();
    const circles = [1, 2, 3, 4, 5];

    useEffect(() => {
        async function getUser() {
            const user = await users_db.getUserOn(1);
            
            if (Object.keys(user).length) {
                setName(user.name);
                setEmail(user.email);
                setSelectedDateTime(new Date(user.birth_date));
            }

            await new Promise(resolve => setTimeout(resolve, 3000));

            setPrimaryLoading(false);
        }

        getUser();
    }, []);

    function handleChangeTime(event, dateTime) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime && isAfter(dateTime, new Date())) 
            return updateMessage('Escolha uma data no passado');
        
        if (dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    function navigateToUpdatePassword() {
        navigation.navigate('UpdatePassword');
    }

    function handleSignOut() {
        setSecondaryLoading(true);
        
        auth
        .signOut(updateMessage)
        .then(signOut);
    }

    async function handleInformationUpdate() {
        setSecondaryLoading(true);

        if (!name.trim()) {
            setSecondaryLoading(false);
            return updateMessage(
                'Digite seu nome.',
                true,
                'error'
            );
        }
        if (name.trim().indexOf(' ') === -1) {
            setSecondaryLoading(false);
            return updateMessage(
                'Digite seu segundo nome.',
                true,
                'error'
            );
        }

        const data = {
            name,
            birth_date: new Date(selectedDateTime).getTime(),
        }

        const users = await users_db.getUsers();

        if (users.length) {
            users_db
            .updateUser(1, data) 
            .then(() => {
                setSecondaryLoading(false);
                updateMessage('Sua infomações foram atualizadas.');
            })
            .catch(error => {
                setSecondaryLoading(false);
                updateMessage(
                    `${error.code} - ${error.message}`,
                    true,
                    'error'
                );
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Suas Informações" />

            {!primaryLoading ? (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={styles.infoBar}>
                        <Text style={styles.title}>
                            E-mail cadastrado
                        </Text>
                        <Text style={styles.subTitle}>
                            {email}
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.action}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.action}>
                            <Text style={styles.label}>Data de nascimento</Text>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={selectedDateTime}
                                    mode="date"
                                    display="calendar"
                                    onChange={handleChangeTime}
                                />
                            )}

                            {Platform.OS === 'android' && (
                                <TouchableOpacity
                                    style={styles.input}
                                    activeOpacity={1}
                                    onPress={handleOpenDateTimePickerForAndroid}
                                >
                                    <Text style={styles.inputText}>
                                        {format(selectedDateTime, 'dd-MM-yyyy').replace(/-/g, '/')}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.action}>
                            <Text style={styles.label}>Minha senha</Text>
                            <View
                                style={styles.input}
                            >
                                <View style={styles.passwordIconArea}>
                                    <SimpleLineIcons name="lock" size={20} color={colors.gray} />
                                    {circles.map(item => (
                                        <View 
                                            key={item} 
                                            style={styles.circle}
                                        />
                                    ))}
                                </View>
                                <TouchableOpacity
                                    hitSlop={{ top: 20, bottom: 20 }}
                                    activeOpacity={.7}
                                    onPress={navigateToUpdatePassword}
                                >
                                    <Text style={styles.changePass}>trocar senha</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <Text style={[styles.label, styles.strong]}>
                                Se deseja sair do seu perfil, clique no botão abaixo.
                            </Text>
                            <TouchableOpacity style={styles.buttonLogout}>
                                <Feather name="power" size={20} color={colors.violet} />

                                <Text style={styles.buttonText} onPress={handleSignOut}>
                                    SAIR DA CONTA
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Button title="Salvar" onPress={handleInformationUpdate} />
                        </View>
                    </View>
                </ScrollView>
            )
            :
            <Loader />}
            <OverlayLoader isVisible={secondaryLoading} />
        </SafeAreaView>
    )
};

export default UserInfo;