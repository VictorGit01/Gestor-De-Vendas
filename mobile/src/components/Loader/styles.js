import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.shape,
    },

    animation: {
        backgroundColor: 'transparent',
        height: 60,
        width: 60,
    }
});

export default styles;