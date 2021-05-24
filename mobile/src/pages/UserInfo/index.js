import React, { useState, useContext } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import { isAfter, format } from 'date-fns';

import { MessageContext } from '../../contexts/message';

import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import OverlayLoader from '../../components/OverlayLoader';

import styles from './styles';

import colors from '../../styles/colors';

function UserInfo() {
    const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
    const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS == 'ios');
    const [ loading, setLoading ] = useState(false);

    const { updateMessage } = useContext(MessageContext);

    const navigation = useNavigation();
    const circles = [1, 2, 3, 4, 5];

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

    function navigateToNewPassword() {
        navigation.navigate('NewPassword');
    }

    function handleInformationUpdate() {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            updateMessage('Sua infomações foram atualizadas');
        }, 3000);
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Suas Informações" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.infoBar}>
                    <Text style={styles.title}>E-mail cadastrado</Text>
                    <Text style={styles.subTitle}>rosiane@gmail.com</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.action}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            value="Rosiane Duarte"
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
                            // <TextInput
                            //     style={styles.input}
                            //     value="01/01/1991"
                            // />
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
                                onPress={navigateToNewPassword}
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

                            <Text style={styles.buttonText}>
                                SAIR DA CONTA
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Button title="Salvar" onPress={handleInformationUpdate} />
                    </View>
                </View>
            </ScrollView>

            <OverlayLoader isVisible={loading} />
        </SafeAreaView>
    )
};

export default UserInfo;