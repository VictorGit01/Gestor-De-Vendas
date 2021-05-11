import React from 'react';
import { View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';

import colors from '../../styles/colors';
import { semesters } from '../../localData/monthsData';

export default function PickerSelect({
    selectedSemester,
    setSelectedSemester,
}) {
    async function onValueChange(value, index) {
        let previous = JSON.parse(JSON.stringify(await selectedSemester));

        if (!value || index === 0) {
            // setSelectedSemester({ value: null, index: 0/*, color: '#999'*/ })
            setSelectedSemester(previous)
        } else {
            setSelectedSemester({ value, index/*, color: '#000'*/ })
        }
    }

    return (
        <View style={styles.pickerSelectContainer}>
            <RNPickerSelect
                items={semesters}
                onValueChange={onValueChange}
                style={{
                    inputAndroidContainer: styles.pickerSelect,
                    inputAndroid: styles.inputAndroid,
                    placeholder: {
                        color: colors.gray_input
                    },
                    iconContainer: {
                        alignSelf: 'center',
                        position: 'relative',
                        marginLeft: 20
                    },
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Entypo name="chevron-down" style={styles.arrowDownIcon} />}
                value={selectedSemester.value}
                key={selectedSemester.value}
                placeholder={{ label: 'Selecione um semestre', value: null, color: '#999' }}
            />
        </View>
    )
}