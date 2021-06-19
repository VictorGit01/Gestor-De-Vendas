import React, { useState, useRef, useContext } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput, 
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import FontIcon from '@expo/vector-icons/FontAwesome5';

import { MessageContext } from '../../contexts/message';

import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import OverlayLoader from '../../components/OverlayLoader';

import styles from './styles';
import colors from '../../styles/colors';

import * as auth from '../../services/auth';

function UpdatePassword() {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ editableField, setEditableField ] = useState(true);

    const { updateMessage } = useContext(MessageContext);

    const [ visibility, setVisibility ] = useState({
        one: false,
        two: false,
        three: false,
    });
    const [ isFocused, setIsFocused ] = useState({
        one: false,
        two: false,
        three: false,
    });
    const [ isFilled, setIsFilled ] = useState({
        one: false,
        two: false,
        three: false,
    });

    // Referêcias dos inputs:
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const navigation = useNavigation();

    function handleInputBlur(notation, value) {
        setIsFocused({ 
            ...isFocused, 
            [notation]: false 
        });
        setIsFilled({
            ...isFilled, 
            [notation]: !!value
        });
    }

    function handleInputFocus(notation) {
        setIsFocused({
            ...isFocused,
            [notation]: true
        });
    }

    function handleInputChange(notation, value, setValue) {
        setIsFilled({
            ...isFilled, 
            [notation]: !!value
        });
        setValue(value);
    }

    function handleSavePassword() {
        setLoading(true);

        if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            setLoading(false);
            updateMessage(
                'Por favor, preencha os campos.', 
                true,
                'error'
            );
        } else if (newPassword !== confirmPassword) {
            setLoading(false);
            updateMessage(
                'As senhas não coincidem.',
                true,
                'error'
            );
        } else {
            auth
            .updatePassword(currentPassword, newPassword, updateMessage)
            .then(() => {
                updateMessage('Sua senha foi alterada.', true);
                navigation.goBack();
            })
            .catch(() => {
                setLoading(false);
            });
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Mudar Senha" />
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View styles={styles.header}>
                    <Text style={styles.title}>
                        Sua nova senha nova senha deve ter no mínimo 6 caracteres
                    </Text>
                    <Text style={styles.subTitle}>
                        É permitido utilizar letras maiúsculas e caracteres especiais
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.action}>
                        <Text style={styles.label}>Senha atual</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused.one || isFilled.one) &&
                                    { borderColor: colors.green }
                                ]}
                                autoCapitalize="none"
                                autoCorrenct={false}
                                secureTextEntry={!visibility.one}
                                returnKeyType="next"
                                editable={editableField}
                                onSubmitEditing={() => ref_input2.current.focus()}
                                blurOnSubmit={false}
                                onBlur={() => handleInputBlur('one', currentPassword)}
                                onFocus={() => handleInputFocus('one')}
                                value={currentPassword}
                                // onChangeText={setCurrentPassword}
                                onChangeText={text => handleInputChange(
                                    'one', text, setCurrentPassword
                                )}
                            />
                            <TouchableOpacity 
                                style={styles.iconButton}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                activeOpacity={.7}
                                onPress={() => setVisibility({ ...visibility, one: !visibility.one })}
                            >
                                <FontIcon name={visibility.one ? "eye-slash" : "eye"} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.action}>
                        <Text style={styles.label}>Nova senha</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused.two || isFilled.two) &&
                                    { borderColor: colors.green }
                                ]}
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={!visibility.two}
                                returnKeyType="next"
                                editable={editableField}
                                onSubmitEditing={() => ref_input3.current.focus()}
                                ref={ref_input2}
                                blurOnSubmit={false}
                                onBlur={() => handleInputBlur('two', newPassword)}
                                onFocus={() => handleInputFocus('two')}
                                value={newPassword}
                                onChangeText={text => handleInputChange(
                                    'two', text, setNewPassword
                                )}
                            />
                            <TouchableOpacity
                                style={styles.iconButton}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                activeOpacity={.7}
                                onPress={() => setVisibility({ ...visibility, two: !visibility.two })}
                            >
                                <FontIcon name={visibility.two ? "eye-slash" : 'eye'} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={styles.action}>
                        <Text style={styles.label}>Confirmar senha</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused.three || isFilled.three) &&
                                    { borderColor: colors.green }
                                ]}
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={editableField}
                                secureTextEntry={!visibility.three}
                                ref={ref_input3}
                                onBlur={() => handleInputBlur('three', confirmPassword)}
                                onFocus={() => handleInputFocus('three')}
                                value={confirmPassword}
                                onChangeText={text => handleInputChange(
                                    'three', text, setConfirmPassword
                                )}
                            />
                            <TouchableOpacity 
                                style={styles.iconButton}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                activeOpacity={.7}
                                onPress={() => setVisibility({ ...visibility, three: !visibility.three })}
                            >
                                <FontIcon name={visibility.three ? "eye-slash" : "eye"} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button title="Salvar" onPress={handleSavePassword} />
                </View>
            </ScrollView>
            <OverlayLoader isVisible={loading} /> 
        </SafeAreaView>
    )
};

export default UpdatePassword;