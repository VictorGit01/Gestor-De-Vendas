import React, { useEffect, useState, useRef, useContext } from 'react';
import { 
    SafeAreaView, 
    View, 
    ScrollView,
    Text,
    Image,
    BackHandler,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';

import { MessageContext } from '../../contexts/message';

import NavBar from '../../components/NavBar';
import ModalAscending from '../../components/ModalAscending';
import ModalConfirmation from '../../components/ModalConfirmation';
import Loader from '../../components/Loader';

import styles from './styles';

function ProductDetails() {
    const [ loading, setLoading ] = useState(false);
    const [ modalConfirmationVisible, setModalConfirmationVisible ] = useState(false);

    const { updateMessage } = useContext(MessageContext);

    const route = useRoute();
    const { product } = route.params;

    const navigation = useNavigation();

    const modalizeRef = useRef();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBack);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBack);
        }
    }, [loading]);

    function onBack() {
        if (loading)
            return true;

        return false;
    }

    function openModalAscending() {
        modalizeRef.current?.open();
    }

    function closeModalAscending() {
        modalizeRef.current.close();
    }

    function openModalConfirmation() {
        setModalConfirmationVisible(true);
    }

    function closeModalConfirmation() {
        setModalConfirmationVisible(false);
    }

    function handleConfirmationOpening() {
        closeModalAscending()
        openModalConfirmation();
    }

    function handleDeleteProduct() {
        setLoading(true);
        closeModalConfirmation();

        setTimeout(() => {
            updateMessage('Produto excluído', true);
            navigation.goBack();
        }, 3000);
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar 
                title="Detalhes do produto"
                page='product_details'
                openModal={openModalAscending}
                buttonsEnabled={!loading}
            />

            {!loading ?
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={{ uri: product.photo }}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.product}>{product.name}</Text>
                        <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, styles.available]}>{product.available ? 'Disponível' : 'Indisponível'}</Text>
                            <Text style={styles.label}>{product.amount} unidades</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.title}>Descrição</Text>
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.title}>Categorias</Text>
                        <Text style={styles.description}>{product.category}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.title}>Datas</Text>
                        <View style={styles.labelContainer}>
                            <Text style={styles.description}>Criado em:</Text>
                            <Text style={styles.description}>17/02/2021</Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.description}>Atualizado em:</Text>
                            <Text style={styles.description}>17/02/2021</Text>
                        </View>
                    </View>
                </ScrollView> 
                : 
                <Loader />
            }

            <ModalAscending 
                modalizeRef={modalizeRef}
                onEdit={closeModalAscending}
                onDelete={handleConfirmationOpening}
            />

            <ModalConfirmation 
                title="Quer mesmo remover esse produto do estoque?"
                isVisible={modalConfirmationVisible}
                onCancel={closeModalConfirmation}
                onConfirm={handleDeleteProduct}
            />
        </SafeAreaView>
    )
};

export default ProductDetails;