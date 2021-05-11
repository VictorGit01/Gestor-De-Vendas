import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    pickerSelectContainer: { 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'flex-start',
        position: 'absolute',
        top: 0,
        paddingTop: 10,
        paddingLeft: 24,
        zIndex: 9
    },

    pickerSelect: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_line,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingLeft: 15,
        // position: 'absolute',
        // marginLeft: 10,
        // zIndex: 9
    },

    inputAndroid: {
        fontSize: 14,
        fontFamily: fonts.mean,
        color: colors.blue_dark,
    },

    // pickerText: {
    //     fontSize: 14,
    //     fontFamily: fonts.text,
    //     color: colors.blue_dark,
    //     // marginRight: 5
    // },

    arrowDownIcon: {
        fontSize: 20,
        color: colors.blue_dark,
    }
});

export default styles;