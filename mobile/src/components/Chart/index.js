import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import  Svg from 'react-native-svg';

import SalesSummary from './SalesSummary';
import { SalesContext } from '../../contexts/sales';

import styles from './styles';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import database from '../../services/database';
import { first_semester, second_semester } from '../../functions/periods';
import { processMonthsDataToDisplay, percentageDifference } from '../../functions/chart';

const { height, width } = Dimensions.get('window');
const { defaultGraphicData } = database;

export default function Chart({ selectedSemester }) {
    const [ semesterData, setSemesterData ] = useState([]);
    const [ selectedMonth, setSelectedMonth ] = useState(null);
    const [ graphicData, setGraphicData ] = useState(defaultGraphicData);
    
    const { setSalesInfo } = useContext(SalesContext);

    useEffect(() => {
        let formatData = processMonthsDataToDisplay(database.sales)
        // console.log('VALOR DE FIRST_SEMESTER')
        // let data = first_semester(formatData)
        percentageDifference(formatData, setSalesInfo);

        let data = selectedSemester.index <= 1
        ? first_semester(formatData)
        : second_semester(formatData)

        // setSemesterData(data);
        setGraphicData(data);
        // setTimeout(() => {
        // }, 1500)
        // console.log('FILTRANDO DADOS DE PROCESS_MONTHS_DATA_TO_DISPLAY');
        // console.log(processMonthsDataToDisplay(data))
    }, [selectedSemester]);

    useEffect(() => {
        
    }, [])

    // useEffect(() => {
    //     let data = [ ...first_semester(), ...second_semester() ];
    //     percentageDifference(data, setSalesInfo);
    // }, [semesterData]);

    // useEffect(() => {
    //     // setGraphicData(processMonthsDataToDisplay(semesterData))
    // }, [semesterData])

    function setSelectMonthByName(name) {
        // let month = semesterData.filter(a => a.name == name);
        let month = graphicData.filter(a => a.name == name);
        setSelectedMonth(month[0]);
    }

    // let graphicData = processMonthsDataToDisplay(semesterData);
    let colorScales = graphicData.map((item) => item.color);
    let totalSalesCount = graphicData.reduce((a, b) => a + (b.salesCount || 0), 0);
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
                        animate={{ easing: 'exp' }}
                        standalone={false}
                        data={graphicData}
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
                                            let monthName = graphicData[props.index].name;
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
                data={graphicData}
                selectedMonth={selectedMonth}
                setSelectMonthByName={setSelectMonthByName}
            />
        </>
    )
};