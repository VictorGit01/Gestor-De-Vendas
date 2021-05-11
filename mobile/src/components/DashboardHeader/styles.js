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

    icon: {
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
    }
});

export default styles;