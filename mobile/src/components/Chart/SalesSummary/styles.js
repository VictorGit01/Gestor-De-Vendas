import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },

    button: {
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    
    monthContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkBox: {
        width: 20,
        height: 20,
        // backgroundColor: colors.white,
        borderRadius: 5,
    },

    name: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.blue_dark,
        marginLeft: 8,
    },

    labelContainer: {
        justifyContent: 'center',
    },

    label: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.white,
    }
});

export default styles;