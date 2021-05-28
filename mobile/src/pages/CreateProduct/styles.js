import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
    },

    scrollForm: {
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    imageContainer: {
        height: 240,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.blue_light,
        borderStyle: 'dashed',
        borderRadius: 10,
        marginBottom: 20,
        // Faz com que a image/conteúdo fique por trás do container:
        overflow: 'hidden',
    },

    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    addImage: {
        height: 40,
        resizeMode: 'contain',
    },

    editImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        bottom: 10,
    },

    editImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        right: 10
    },

    editImageText: {
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.blue,
    },

    action: {
        width: '100%',
        marginTop: 20,
    },

    label: {
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.gray,
        // marginTop: 20,
        // marginBottom: 10,
    },
    
    input: {
        height: 52,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_line,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark,
        marginTop: 10,
    },

    descriptionInput: {
        height: 110,
        textAlignVertical: 'top'
    },

    tag: {
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.blue_semi_dark,
        alignSelf: 'flex-end',
        marginTop: 5,
    },

    buttonSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.gray_input,
    },

    arrowDownIcon: {
        fontSize: 24,
        color: colors.gray_input,
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    footer: {
        width: '100%',
        marginVertical: 40,
    }
});

export default styles;