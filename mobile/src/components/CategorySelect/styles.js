import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 19,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: colors.gray_line,
    },

    headerTitle: {
        fontSize: 18,
        fontFamily: fonts.heading,
        color: colors.blue_semi_dark,
        textAlign: 'center'
    },

    headerIcon: {
        fontSize: 20,
        color: colors.blue_dark,
    },

    headerButton: {
        padding: 5,
    },

    input: {
        height: 46,
        borderWidth: 1,
        borderColor: colors.gray_line,
        borderRadius: 10,
    },

    listing: {
        flex: 1,
        width: '100%',
    },

    buttonItem: {
        flexDirection: 'row',
        height: 52,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.gray_line,
        paddingHorizontal: 24,
    },

    radioButton: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 10,
        marginRight: 10
    },

    radioButtonSelected: {
        height: '85%',
        width: '85%',
        backgroundColor: colors.blue,
        borderRadius: 10,
    },

    textItem: {
        fontSize: 16,
        fontFamily: fonts.mean,
        color: colors.blue_semi_dark,
    },

    separator: {
        height: 1,
        backgroundColor: colors.gray_line,
    }
});

export default styles;