import { StyleSheet, useColorScheme } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        height: 40,
        // width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        paddingHorizontal: 14,
        marginHorizontal: 5,
    },

    containerActive: {
        backgroundColor: colors.rose_light,
    },

    text: {
        fontFamily: fonts.text,
        color: colors.gray_input,
    },

    textActive: {
        fontFamily: fonts.heading,
        color: colors.rose,
    }
});

export default styles;