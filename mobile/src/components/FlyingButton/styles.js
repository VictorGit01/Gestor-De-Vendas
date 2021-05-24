import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.violet,
        borderRadius: 60 / 2,
        shadowRadius: 10,
        shadowColor: colors.violet,
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        position: 'absolute',
        right: 10,
        bottom: 24,
    },

    icon: {
        fontSize: 30,
        color: colors.white,
    }
});

export default styles;