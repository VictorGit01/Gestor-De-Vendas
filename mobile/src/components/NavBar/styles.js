import { StyleSheet, StatusBar } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: colors.blue_light,
        paddingHorizontal: 24,
        // marginTop: StatusBar.currentHeight
        paddingTop: StatusBar.currentHeight
    },

    button: {
        padding: 5,
    },

    buttonPrimary: {
        left: -5,
    },

    buttonSecondary: {
        right: -5,
    },

    defaultIcon: {
        height: 30,
        width: 30,
        // backgroundColor: 'tomato',
        resizeMode: "contain"
    },

    title: {
        fontSize: 20,
        fontFamily: fonts.heading,
        lineHeight: 32,
        color: colors.white,
    },
    
    ellipsisIcon: {
        fontSize: 20,
        color: colors.white,
        padding: 5,
    },

    // Dashboard:
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
    },
});

export default styles;