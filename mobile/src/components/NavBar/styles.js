import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        backgroundColor: colors.blue_light,
    },

    userButton: {
        height: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.violet,
        borderRadius: 21,
    },

    initialsRadius: {
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.violet,
        borderRadius: 21,
    },

    initials: {
        fontSize: 14,
        fontFamily: fonts.heading,
        color: colors.white,
    },

    email: {
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.white,
        paddingHorizontal: 10,
    },

    powerButton: {
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.violet,
        borderRadius: 8,
    },

    powerIcon: {
        fontSize: 20,
        color: colors.violet
    }
});

export default styles;