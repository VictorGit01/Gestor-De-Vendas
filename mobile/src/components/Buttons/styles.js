import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        paddingHorizontal: 40
    },

    button: {
        height: 160,
        width: '46%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between',
    },

    buttonPrimary: {
        backgroundColor: colors.violet,
    },

    buttonSecondary: {
        backgroundColor: colors.blue,
    },

    buttonText: {
        fontSize: 20,
        fontFamily: fonts.heading,
        color: colors.white,
    }
});

export default styles;