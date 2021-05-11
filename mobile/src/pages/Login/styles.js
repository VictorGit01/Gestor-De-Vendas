import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import colors from '../../styles/colors';

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.blue_light,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 20
    },

    scrollContent: {
        height: height - StatusBar.currentHeight,
        justifyContent: 'space-between',
    },

    header: {
        width: '100%',
        marginTop: 40,
    },

    greeting: {
        fontSize: 32,
        color: colors.white,
        fontFamily: 'Roboto_700Bold',
        lineHeight: 40,
        marginBottom: 10
    },

    info: {
        fontSize: 18,
        color: colors.white,
        fontFamily: 'Roboto_400Regular',
        lineHeight: 30,
    },

    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    action: {
        width: '100%',
    },

    label: {
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        color: colors.white,
        alignSelf: 'flex-start',
        marginTop: 20,
        marginBottom: 10
    },

    input: {
        height: 52,
        width: '100%',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.rose,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },

    footer: {
        width: '100%',
        marginVertical: 40,
    }
});

export default styles;