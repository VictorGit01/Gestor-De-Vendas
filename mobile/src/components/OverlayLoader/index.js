import React from 'react';
import { Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import loadAnimation from '../../assets/loading.json';

import styles from './styles';

export default function OverlayLoader({ isVisible }) {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    return (
        <Modal
            style={styles.container}
            isVisible={isVisible}
            backdropOpacity={.9}
            backdropColor="transparent"
            // onBackdropPress={}
            animationIn="fadeIn"
            animationOut="fadeOut"
            coverScreen={false}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            hideModalContentWhileAnimating
        >
            {/* <View style={styles.loadContainer}> */}
                <LottieView
                    source={loadAnimation}
                    autoPlay
                    loop
                    speed={2}
                    style={styles.animation}
                />
            {/* </View> */}
        </Modal>
    )
}