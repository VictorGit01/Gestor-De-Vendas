import React, { 
    useEffect, 
    useCallback,
    useState, 
    useRef, 
    useContext 
} from 'react';

import { 
    SafeAreaView, 
    View, 
    ScrollView,
    Text,
    Image,
    BackHandler,
} from 'react-native';

import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/core';
import { format } from 'date-fns';

import { MessageContext } from '../../contexts/message';
import { PreloadContext } from '../../contexts/preload';

import NavBar from '../../components/NavBar';
import ModalAscending from '../../components/ModalAscending';
import ModalConfirmation from '../../components/ModalConfirmation';
import Loader from '../../components/Loader';

import styles from './styles';

import * as products_db from '../../services/database/products_db';
import * as products_categories_db from '../../services/database/products_categories_db';

function ProductDetails() {
    const [ loading, setLoading ] = useState(true);
    const [ modalConfirmationVisible, setModalConfirmationVisible ] = useState(false);
    const [ product, setProduct ] = useState({
        id: 0,
        photo: null,
        name: '',
        price: 0,
        available: false,
        amount: 1,
        description: '',
        category: '',
        created_at: Date.now(),
        updated_at: Date.now(),
    });

    const { updateMessage } = useContext(MessageContext);
    const { refreshData } = useContext(PreloadContext);

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const modalizeRef = useRef();

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            
            async function loadProductData() {
                try {
                    setLoading(true);
                    const products = await products_db.get();
                    const categories = await products_categories_db.get();
        
                    if (isActive) {
                        const currentProduct = products.find(product => product.id == id);
                        const category = categories.find(category => category.id == currentProduct.categories[0]);
                        
                        const updatedProduct = {
                            ...product,
                            ...currentProduct,
                            category: category.title,
                        }

                        setProduct(updatedProduct);
                        setLoading(false);
                    }
                } catch(error) {
                    console.log(error);
                } 
            }
    
            loadProductData();

            return () => {
                isActive = false;
            };
        }, [id]),
    );

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

        products_db
            .remove(product.id)
            .then(() => {
                updateMessage('Produto exclu??do', true);
                refreshData(true);
                navigation.goBack();
            });
    }

    function handleEditProduct() {
        closeModalAscending();
        navigation.navigate('CreateProduct', { product });
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
                <ScrollView 
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={product.photo}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.product}>{product.name}</Text>
                        <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
                        <View style={styles.labelContainer}>
                            <Text style={[
                                styles.label, 
                                product.available ? styles.available : styles.unavailable,
                            ]}>
                                {product.available ? 'Dispon??vel' : 'Indispon??vel'}
                            </Text>
                            <Text style={styles.label}>
                                {product.amount}
                                {product.amount == 1 ? ' unidade' : ' unidades'}
                            </Text>
                        </View>
                    </View>

                    {!!product.description &&
                    <View style={styles.card}>
                        <Text style={styles.title}>Descri????o</Text>
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                    </View>}

                    <View style={styles.card}>
                        <Text style={styles.title}>Categoria</Text>
                        <Text style={styles.description}>{product.category}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.title}>Datas</Text>
                        <View style={styles.labelContainer}>
                            <Text style={styles.description}>Criado em:</Text>
                            <Text style={styles.description}>
                                {format(product.created_at, 'dd-MM-yyyy').replace(/-/g, '/')}
                            </Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.description}>Atualizado em:</Text>
                            <Text style={styles.description}>
                                {format(product.updated_at, 'dd-MM-yyyy').replace(/-/g, '/')}
                            </Text>
                        </View>
                    </View>
                </ScrollView> 
                : 
                <Loader />
            }

            <ModalAscending 
                modalizeRef={modalizeRef}
                onEdit={handleEditProduct}
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