import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: 46,
        // width: '100%',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_input,
        borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderBottomLeftRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark
    },

    button: {
        height: 46,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray,
        borderRadius: 10,
        marginLeft: 5,
    },

    buttonCreate: {
        backgroundColor: colors.violet,
    },

    buttonCancel: {
        backgroundColor: colors.red
    },

    defaultIcon: {
        fontSize: 20,
        color: colors.white,
    },

    label: {
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.white,
        marginTop: 5,
        marginLeft: 15
        // position: 'absolute',
        // bottom: 0,
    },

    categories: {
        flex: 1,
        paddingHorizontal: 24,
    },

    listing: {
        paddingVertical: 10,
    },

    card: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
    },

    extremityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },

    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconButton: {
        marginLeft: 25
    },

    editIcon: {
        color: colors.blue,
        // marginRight: 20,
    },

    removeIcon: {
        color: colors.red,
    },

    cardTitle: {
        fontSize: 22,
        fontFamily: fonts.mean,
        color: colors.blue_dark,
    },

    cardText: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_semi_dark
    },

    noDataText: {
        fontSize: 18,
        fontFamily: fonts.heading,
        color: colors.blue_semi_dark,
        height: '100%',
        position: 'absolute',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

export default styles;