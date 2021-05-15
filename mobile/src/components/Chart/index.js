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

import { first_semester, second_semester, year_data } from '../../localData/monthsData';
import salesData from '../../localData/salesData';
import { processMonthsDataToDisplay, percentageDifference } from '../../functions/chart';

const { height, width } = Dimensions.get('window');
const defaultGraphicData = [
    {
      "color": "#D3E2E5",
      "id": 0,
      "label": "0%",
      "name": "Janeiro",
      "salesCount": 0,
      "y": 100,
    },
    {
      "color": "#993399",
      "id": 1,
      "label": "0%",
      "name": "Fevereiro",
      "salesCount": 0,
      "y": 0,
    },
    {
      "color": "#C8A2C8",
      "id": 2,
      "label": "0%",
      "name": "Março",
      "salesCount": 0,
      "y": 0,
    },
    {
      "color": "#00A000",
      "id": 3,
      "label": "0%",
      "name": "Abril",
      "salesCount": 0,
      "y": 0,
    },
    {
      "color": "#FF4040",
      "id": 4,
      "label": "0%",
      "name": "Maio",
      "salesCount": 0,
      "y": 0,
    },
    {
      "color": "#FFA500",
      "id": 5,
      "label": "0%",
      "name": "Junho",
      "salesCount": 0,
      "y": 0,
    },
];

export default function Chart({ selectedSemester }) {
    const [ semesterData, setSemesterData ] = useState([]);
    const [ selectedMonth, setSelectedMonth ] = useState(null);
    const [ graphicData, setGraphicData ] = useState(defaultGraphicData);
    const { setSalesInfo } = useContext(SalesContext);

    useEffect(() => {
        let data = selectedSemester.index <= 1
        ? first_semester()
        : second_semester()

        setSemesterData(data);
        setGraphicData( processMonthsDataToDisplay(data) );
        percentageDifference(data, setSalesInfo);
        // setTimeout(() => {
        // }, 1500)
    }, [selectedSemester])

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