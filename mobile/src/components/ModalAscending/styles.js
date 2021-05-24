import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,
    },

    button: {
        flexDirection: 'row',
        height: 52,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 10,
        marginHorizontal: 10,
    },

    buttonPrimary: {
        backgroundColor: colors.blue,
    },

    buttonSecondary: {
        backgroundColor: colors.red,
    },

    buttonIcon: {
        fontSize: 20,
        color: colors.white,
        marginRight: 10,
    },

    buttonText: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.white,
    },
});

export default styles;