import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
    },

    content: {
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20
    },

    imageContainer: {
        height: 240,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
    },

    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },

    card: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 15
    },
    
    product: {
        fontSize: 28,
        fontFamily: fonts.mean,
        color: colors.blue_dark,
        lineHeight: 32,
    },

    price: {
        fontSize: 20,
        fontFamily: fonts.text,
        color: colors.blue_dark,
        lineHeight: 32,
        marginBottom: 10,
    },

    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    label: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark,
    },

    available: {
        color: colors.green,
    },

    unavailable: {
        color: colors.red,
    },

    title: {
        fontSize: 20,
        fontFamily: fonts.heading,
        color: colors.blue_dark,
        marginBottom: 10,
    },

    description: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_semi_dark,
        lineHeight: 30,
    },
});

export default styles;