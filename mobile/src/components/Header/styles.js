import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue_light,
        padding: 24,
    },

    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        color: colors.white,
    },

    subTitle: {
        fontSize: 16,
        fontFamily: fonts.mean,
        color: colors.white_70_percent,
    },

    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
    },

    iconContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 25,
    },

    calendarIcon: {
        fontSize: 20,
        color: colors.shape,
    },

    infoContainer: {
        marginLeft: 24
    },

    date: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.white,
    },

    statistic: {
        fontSize: 16,
        color: colors.white_70_percent,
    },

    // Clients and Products:
    searchContainer: {
        alignItems: 'stretch',
        backgroundColor: colors.shape,
        // padding: 24,
    },

    searchContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 24
    },
    
    amount: {
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.white,
    },

    inputContainer: {
        width: '70%',
        // alignItems: 'flex-end',
        // backgroundColor: 'tomato'
    },

    input: {
        height: 46,
        width: '100%',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.rose,
        borderRadius: 23,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark,
    },

    searchIconContainer: {
        height: 46,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.rose,
        borderRadius: 23,
        position: 'absolute',
        right: 0
    },

    defaultIcon: {
        fontSize: 20,
        color: colors.white,
    },

});

export default styles;