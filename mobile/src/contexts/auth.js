import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/firebase_config';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@sales-manager:user');

            if (storageUser)
                setUser(JSON.parse(storageUser));
        }

        loadStorageData();
    }, []);

    function onAuthStateChanged() {
        // auth().onAuthStateChanged(async newUser => {
        //     // console.log(newUser)
        //     if (newUser && !user) {
        //         console.log('ON_AUTH_STATE_CHANGED USER?')
        //         // await new Promise(resolve => setTimeout(resolve, 2000));
        //         setUser({ user: newUser });
        //     }
        // })
    }

    useEffect(() => {
        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // return subscriber;
    }, [])

    async function signIn(response) {
        await AsyncStorage.setItem('@sales-manager:user', JSON.stringify(response.user));
        await new Promise(resolve => setTimeout(resolve, 2000));

        setUser(response.user);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};