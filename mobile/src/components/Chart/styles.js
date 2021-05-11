import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },

    middleContainer: {
        // position: 'absolute',
        marginTop: '50%',
        // top: '250%',
        // bottom: '-%50',
        alignSelf: 'center'
        // left: '42%',
    },

    middleNumber: {
        fontSize: 30,
        fontFamily: fonts.heading,
        color: colors.blue_dark,
        textAlign: 'center',
    },

    middleText: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_dark,
        textAlign: 'center',
    }
});

export default styles;