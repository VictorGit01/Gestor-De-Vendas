import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.shape
    },

    productsAnimation: {
        backgroundColor: 'transparent',
        width: 300,
        height: 300,
    },
    
    costumersAnimation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    }
});

export default styles;