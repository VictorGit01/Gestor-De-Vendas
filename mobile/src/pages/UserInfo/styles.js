import { 
    StyleSheet, 
    StatusBar,
    Dimensions,
} from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
    },

    scrollContent: {
        height: height - (StatusBar.currentHeight + 60),
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    infoBar: {
        // paddingVertical: 20,
        paddingBottom: 10
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
    },

    form: {
        width: '100%',
        alignItems: 'center',
    },

    action: {
        width: '100%',
        marginBottom: 20
    },

    label: {
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.gray,
        // marginTop: 20,
        marginBottom: 10,
    },

    input: {
        height: 52,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_line,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark,
    },

    inputText: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark,
    },

    passwordIconArea: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    circle: {
        height: 8,
        width: 8,
        backgroundColor: colors.gray,
        borderRadius: 4,
        marginLeft: 6,
    },

    changePass: {
        fontSize: 14,
        fontFamily: fonts.text,
        textDecorationLine: 'underline',
        color: colors.blue_light,
    },

    strong: {
        fontFamily: fonts.mean,
    },
    
    buttonLogout: {
        height: 52,
        width: 160,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colors.violet,
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    buttonText: {
        fontSize: 14,
        fontFamily: fonts.mean,
        color: colors.violet,
    },

    footer: {
        width: '100%',
        marginVertical: 40,
    }
});

export default styles;