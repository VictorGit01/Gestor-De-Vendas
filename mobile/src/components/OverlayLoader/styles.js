import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
    container: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.overlay_opacity,
    },

    animation: {
        backgroundColor: 'transparent',
        height: 60,
        width: 60,
    }
});

export default styles;