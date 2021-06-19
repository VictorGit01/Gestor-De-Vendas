import React from 'react';
import { 
    Dimensions, 
    Platform, 
    TouchableHighlight, 
    View,
    Text, 
} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import colors from '../../styles/colors';

export default function ModalConfirmation({ title, isVisible, onCancel, onConfirm }) {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    return (
        <Modal 
            style={styles.container}
            isVisible={isVisible}
            backdropOpacity={.9}
            backdropColor="transparent"
            onBackdropPress={onCancel}
            animationIn="fadeIn"
            animationOut="fadeOut"
            coverScreen={false}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            hideModalContentWhileAnimating
        >
            <View style={styles.box}>
                <Text style={styles.title}>
                    {title}
                </Text>
                
                <View style={styles.buttons}>
                    <TouchableHighlight 
                        style={styles.buttonPrimary}
                        underlayColor={colors.violet_dark}
                        onPress={onConfirm}
                    >
                        <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={styles.buttonSecondary}
                        underlayColor="rgba(0, 0, 0, .1)"
                        onPress={onCancel}
                    >
                        <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Cancelar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}