import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: colors.shape,
    },

    categoryList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        // marginLeft: 24,
        paddingHorizontal: 24,
        marginVertical: 20,
    },

    products: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        paddingHorizontal: 24,
    },

    notFoundText: {
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