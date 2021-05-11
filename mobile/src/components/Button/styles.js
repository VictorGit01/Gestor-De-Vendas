import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.violet,
        borderRadius: 10,
    },

    text: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.white,
    }
});

export default styles;