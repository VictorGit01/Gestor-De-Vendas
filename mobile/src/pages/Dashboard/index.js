import React, { useEffect, useState, useContext } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import NavBar from '../../components/NavBar/';
import Header from '../../components/Header';
import CategoryHeaderSection from '../../components/CategoryHeaderSection';
import PickerSelect from '../../components/PickerSelect';
import Chart from '../../components/Chart';
// import SalesSummary from '../../components/SalesSummary';
import Buttons from '../../components/Buttons';

import styles from './styles';
import colors from '../../styles/colors';

function Dashboard() {
    const [ selectedView, setSelectedView ] = useState('chart');
    const [ selectedSemester, setSelectedSemester ] = useState({
        value: 1, index: 1
    });

    const navigation = useNavigation();

    function navigateToUserInformation() {
        navigation.navigate('UserInformation');
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar 
                page="dashboard" 
                navigateToUserInformation={navigateToUserInformation} 
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
                        {/* <SalesSummary /> */}
                    </View>
                }
                {
                    selectedView == 'buttons' &&
                    <View>
                        <Buttons />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;