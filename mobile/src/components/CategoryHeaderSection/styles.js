import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 24,
    },

    title: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.white,
    },

    subTitle: {
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.white_70_percent,
    },

    buttonsContainer: {
        flexDirection: 'row',
    },

    button: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    activeButton: {
        backgroundColor: colors.violet
    },

    icon: {
        fontSize: 20,
        color: colors.white
    }
});

export default styles;