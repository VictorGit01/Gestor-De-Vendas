import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        margin: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    box: {
        minHeight: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue_semi_dark,
        padding: 10
    },
    
    boxError: {
        backgroundColor: colors.red,
    },

    boxAlert: {
        backgroundColor: '#FFD700'
    },

    message: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.white,
        textAlign: 'center',
        // margin: 20,
    }
});

export default styles;