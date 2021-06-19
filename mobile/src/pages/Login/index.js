import React, { useEffect, useState, useContext, useRef } from 'react';
import { 
    Animated,
    View, 
    Text, 
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { format } from 'date-fns';

import { AuthContext } from '../../contexts/auth';
import { MessageContext } from '../../contexts/message';

import Button from '../../components/Button';
import OverlayLoader from '../../components/OverlayLoader';

import styles from './styles';
import colors from '../../styles/colors';

import * as auth from '../../services/auth';
import * as users_db from '../../services/database/users_db';

function Login() {
    const [ hours, setHours ] = useState(new Date().getHours());
    const [ minutes, setMinutes ] = useState(new Date().getMinutes());
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const { signIn } = useContext(AuthContext);
    const { updateMessage } = useContext(MessageContext);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const input_ref_2 = useRef();
    
    useEffect(() => {
        let isActive = true;

        try {
            fadeIn();
            
            setInterval(() => {
                const date = new Date();
                const newHours = date.getHours();
                const newMinutes = date.getMinutes();
                
                if (isActive) {
                    setHours(newHours);
                    setMinutes(newMinutes);
                }
            }, 1000);
        } catch(error){
            console.log(error);
        }

        return () => {
            isActive = false;
        }
    }, []);

    function fadeIn() {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }

    async function handleCreateUser(response) {
        const data = await users_db.getUserFake();

        users_db
            .createUser(data)
            .then(() => {
                signIn(response);
            })
            .catch(error => {
                setLoading(false);
                updateMessage(
                    `${error.code} - ${error.message}`,
                    true,
                    'error'
                );
            });
    }

    function handleSignIn() {
        setLoading(true);

        if (!email.trim()) {
            setLoading(false);
            return updateMessage(
                'Digite um email.',
                true,
                'error'
            );
        }
        if (!password.trim()) {
            setLoading(false);
            return updateMessage(
                'Digite uma senha.',
                true,
                'error'
            );
        }

        Keyboard.dismiss();

        auth
        .signIn(
            email, password, updateMessage
        )
        .then(async response => {
            const users = await users_db.getUsers();

            if (!users.length)
                return await handleCreateUser(response);
            
            signIn(response);
        })
        .catch(() => {
            setLoading(false);
        });
    }

    return (
        <Animated.View 
            style={[
                styles.container,
                { opacity: fadeAnim }
            ]}
        >
            <KeyboardAvoidingView
                style={styles.scrollContent}
                behavior="padding"
            >
                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá Rosiane!</Text>
                    <Text style={styles.info}>
                        {/* Agora são {`${hours}:${minutes}h`}. {'\n'} */}
                        Agora são {`${format(Date.now(), 'HH:mm')}h`}. {'\n'}
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
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => input_ref_2.current.focus()}
                            blurOnSubmit={false}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    
                    <View style={styles.action}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Sua senha'
                            placeholderTextColor={colors.rose_light}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            ref={input_ref_2}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button title='Entrar' onPress={handleSignIn} />
                </View>
            </KeyboardAvoidingView>
            <OverlayLoader isVisible={loading} />
        </Animated.View>
    );
};

export default Login;