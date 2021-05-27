import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import { MessageContext } from '../../contexts/message';

import styles from './styles';

export default function OverlayMessage() {
    const { 
        message: { visibility, title, type },
        updateMessage,
    } = useContext(MessageContext);

    useEffect(() => {
        if (visibility)
            setTimeout(() => {
                updateMessage( title, false );
            }, 3000);
    }, [visibility]);

    return (
        <Modal
            style={styles.container}
            isVisible={visibility}
            backdropOpacity={.9}
            backdropColor="transparent"
            hasBackdrop={false}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            coverScreen={false}
            // deviceWidth={deviceWidth}
            // deviceHeight={deviceHeight}
            hideModalContentWhileAnimating
        >
            <View style={[
                styles.box, 
                type == 'error' && styles.boxError,
                type == 'alert' && styles.boxAlert,
            ]} >
                <Text style={styles.message}>
                    { title }
                </Text>
            </View>
        </Modal>
    )
}