import React, { useEffect, useState, useRef, useContext } from 'react';
import { 
    Animated,
    ScrollView, 
    View,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/core';

import { MessageContext } from '../../contexts/message';
import { AuthContext } from '../../contexts/auth';
import { PreloadContext } from '../../contexts/preload';

import NavBar from '../../components/NavBar/';
import Header from '../../components/Header';
import CategoryHeaderSection from '../../components/CategoryHeaderSection';
import PickerSelect from '../../components/PickerSelect';
import Chart from '../../components/Chart';
import Buttons from '../../components/Buttons';
import OverlayLoader from '../../components/OverlayLoader';

import styles from './styles';

import * as auth from '../../services/auth';
import * as users_db from '../../services/database/users_db';

function Dashboard() {
    const [ initials, setInitials ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ selectedView, setSelectedView ] = useState('chart');
    const [ selectedSemester, setSelectedSemester ] = useState({
        value: 1, index: 1
    });
    const [ loading, setLoading ] = useState(false);

    const { updateMessage } = useContext(MessageContext);
    const { signOut } = useContext(AuthContext);
    const { refreshData } = useContext(PreloadContext);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let isActive = true;

        try {
            if (isActive && isFocused)
                refreshData();

        } catch(error) {
            console.log(error);
        }

        return () => {
            isActive = false;
        }
    }, [isFocused])

    useEffect(() => {
        let isActive = true;
        
        async function loadUserData() {
            try {
                const user = await users_db.getUserOn(1);
                
                // if (!Object.keys(user).length)
                //     user = await data;
                
                const first_name = user.name.split(' ')[0];
                const second_name = user.name.split(' ')[1];
                const new_initials = first_name[0] + second_name[0];
                
                if (isActive) {
                    setInitials(new_initials);
                    setEmail(user.email);
                }
            } catch(error) {
                console.log(error);
            }

        }
        
        loadUserData();
        fadeIn();

        return () => {
            isActive = false;
        }
    }, []);

    function fadeIn() {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                // duration: 600,
                duration: 800,
                useNativeDriver: true
            }
        ).start();
    }

    function navigateToUserInformation() {
        navigation.navigate('UserInformation');
    }

    function handleSignOut() {
        setLoading(true);
        
        auth
        .signOut(updateMessage)
        .then(signOut);
    }

    return (
        <Animated.View 
            style={[
                styles.container,
                { opacity: fadeAnim }
            ]}
        >
            <NavBar 
                page="dashboard" 
                initials={initials}
                email={email}
                navigateToUserInformation={navigateToUserInformation} 
                handleSignOut={handleSignOut}
            />
            <Header page="dashboard" />
            <CategoryHeaderSection
                selectedView={selectedView}
                setSelectedView={setSelectedView}
            />
            <ScrollView>
                {
                    selectedView == 'chart' &&
                    <View>
                        <PickerSelect
                            selectedSemester={selectedSemester} 
                            setSelectedSemester={setSelectedSemester}
                        />
                        <Chart
                            selectedSemester={selectedSemester}
                        />
                    </View>
                }
                {
                    selectedView == 'buttons' &&
                    <View>
                        <Buttons />
                    </View>
                }
            </ScrollView>
            <OverlayLoader isVisible={loading} />
        </Animated.View>
    );
};

export default Dashboard;