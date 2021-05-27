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
        minHeight: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue_semi_dark,
    },
    
    boxError: {
        backgroundColor: colors.red,
    },

    boxAlert: {
        backgroundColor: '#FFD700'
    },

    message: {
        fontSize: 16,
        fontFamily: fonts.mean,
        color: colors.white,
    }
});

export default styles;