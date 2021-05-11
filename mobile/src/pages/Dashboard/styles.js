import { StyleSheet, StatusBar } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
        paddingTop: StatusBar.currentHeight,
    }
});

export default styles;