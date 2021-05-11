import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import  Svg from 'react-native-svg';

import SalesSummary from './SalesSummary';
import { AuthContext } from '../../contexts/auth';
import { SalesContext } from '../../contexts/sales';

import styles from './styles';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { first_semester, second_semester } from '../../localData/monthsData';
import { processMonthsDataToDisplay, percentageDifference } from '../../functions/chart';

const { height, width } = Dimensions.get('window');

export default function Chart({ selectedSemester }) {
    const [ semesterData, setSemesterData ] = useState([]);
    const [ selectedMonth, setSelectedMonth ] = useState(null);
    const { setSalesInfo } = useContext(SalesContext);

    useEffect(() => {
        let data = selectedSemester.index <= 1
        ? first_semester()
        : second_semester()

        setSemesterData(data);
    }, [selectedSemester])

    useEffect(() => {
        console.log('VALOR DE PERCENTAGE DIFFERENCE:');
        percentageDifference(semesterData, setSalesInfo);
    }, [semesterData])  

    function setSelectMonthByName(name) {
        let month = semesterData.filter(a => a.name == name);
        setSelectedMonth(month[0]);
    }

    let chartData = processMonthsDataToDisplay(semesterData);
    let colorScales = chartData.map((item) => item.color);
    let totalSalesCount = chartData.reduce((a, b) => a + (b.salesCount || 0), 0);
    // let salesSummaryData = processMonthsDataToDisplay(semesterData);

    return (
        <>
            <View style={styles.container}>
                <Svg 
                    height={400} 
                    
                    width={width * 0.8}
                    // viewBox={`0 0 ${width * 0.8} ${width * 0.8}`} 
                    style={{ 
                        // flex: 1,
                        // width: '100%', 
                        // height: 400, 
                        // backgroundColor: 'tomato', 
                        // justifyContent: 'center', 
                        // alignItems: 'center'
                        marginTop: 20
                    }}
                >
                    <VictoryPie
                        standalone={false}
                        data={chartData}
                        colorScale={colorScales}
                        labels={(datum) => `${datum.y}`}
                        radius={({datum}) => (selectedMonth && selectedMonth.name == datum.name) ? width * 0.4 : width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { 
                                fill: colors.white, 
                                fontSize: 16, 
                                fontFamily: fonts.text,
                            },
                            parent: {
                                ...styles.shadow,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                // marginTop: 20
                                // backgroundColor: '#000',
                            },
                        }}
                        width={width * 0.8}
                        heigh={height * 0.8}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let monthName = chartData[props.index].name;
                                            setSelectMonthByName(monthName);
                                        }
                                    }]
                                }
                            }
                        }]}
                    />

                    <View style={styles.middleContainer}>
                        <Text style={styles.middleNumber}>{totalSalesCount}</Text>
                        <Text style={styles.middleText}>Vendas</Text>
                    </View>
                </Svg>

            </View>
            <SalesSummary 
                data={chartData}
                selectedMonth={selectedMonth}
                setSelectMonthByName={setSelectMonthByName}
            />
        </>
    )
};