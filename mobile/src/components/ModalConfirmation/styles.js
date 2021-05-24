import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    
    box: {
        // height: 155,
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 25,
    },

    buttonClose: {
        position: 'absolute',
        top: 5,
        right: 5,
    },

    title: {
        fontSize: 20,
        fontFamily: fonts.heading,
        color: colors.blue_dark,
        marginBottom: 10,
        textAlign: 'center'
    },

    buttons: {
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    buttonPrimary: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.violet,
        borderRadius: 10,
        marginBottom: 15,
    },

    buttonSecondary: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.violet,
        borderRadius: 10,
    },

    buttonText: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.white,
    },

    buttonTextSecondary: {
        color: colors.violet,
    }
});

export default styles;