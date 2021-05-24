import React from 'react';
import { View, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function ModalAscending({ modalizeRef, onEdit, onDelete }) {

    return (
        <Modalize
            ref={modalizeRef}
            snapPoint={170}
            modalHeight={170}
            modalStyle={styles.container}
            // velocity={.5}
            closeAnimationConfig={{ 
                timing: { duration: 300 },
                spring: { speed: 4 },
            }}
        >
            <View style={styles.buttons}>
                <RectButton 
                    style={[styles.button, styles.buttonPrimary]} 
                    onPress={onEdit}
                >
                    <FontAwesome name="edit" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Editar</Text>
                </RectButton>
                
                <RectButton 
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={onDelete}
                >
                    <FontAwesome name="trash" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Remover</Text>
                </RectButton>
            </View>
        </Modalize>
    )
}