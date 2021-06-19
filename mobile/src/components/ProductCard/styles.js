import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // minHeight: 230,
        minHeight: 250,
        maxWidth: '45%',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 10,
    },

    photo: {
        flex: 2,
        width: '100%',
        minHeight: 143,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        resizeMode: 'cover'
    },

    labelContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: .5,
        borderColor: colors.gray_line,
    },

    text: {
        fontFamily: fonts.text,
        color: colors.blue_dark,
        marginBottom: 10
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'tomato'
    },

    price: {
        fontSize: 18,
        fontFamily: fonts.mean,
        color: colors.blue_dark,
    },

    icon: {
        fontSize: 20,
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 10,
    },

    availableIcon: {
        color: colors.green,
    },

    unavailableIcon: {
        color: colors.red,
    }
});

export default styles;