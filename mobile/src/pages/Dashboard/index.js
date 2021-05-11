import React, { useEffect, useState, useContext } from 'react';
import { Button, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import NavBar from '../../components/NavBar';
import Header from '../../components/DashboardHeader';
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.blue_light} style='light' />
            <NavBar />
            <Header />
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