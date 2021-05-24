import { StyleSheet, StatusBar, Dimensions } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
    },

    scrollContent: {
        height: height - (StatusBar.currentHeight + 90),
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    header: {
        paddingVertical: 20,
    },

    title: {
        fontSize: 18,
        fontFamily: fonts.mean,
        color: colors.blue_semi_dark,
        lineHeight: 24,
    },

    subTitle: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_semi_dark,
        marginTop: 10,
    },

    form: {
        width: '100%',
        alignItems: 'center',
    },

    action: {
        width: '100%',
    },

    label: {
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.gray,
        marginTop: 20,
        marginBottom: 10,
    },

    inputContainer:{
        // backgroundColor: 'tomato'
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    input: {
        height: 52,
        width: '100%',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_line,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark,
    },

    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        zIndex: 9
    },

    eyeIcon: {
        fontSize: 18,
        color: colors.blue_dark,
    },

    footer: {
        width: '100%',
        marginVertical: 40,
    }
});

export default styles;