import React, { useEffect, useState, useRef,  useContext } from 'react';
import { 
    SafeAreaView,
    Text,
    View,
    FlatList,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { PreloadContext } from '../../contexts/preload';

import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import CategoryButton from '../../components/CategoryButton';
import ProductCard from '../../components/ProductCard';
import FlyingButton from '../../components/FlyingButton';
import Load from '../../components/Load';
import Loader from '../../components/Loader';

import database from '../../services/database_test';
import * as products_categories_db from '../../services/database/products_categories_db';
import * as products_db from '../../services/database/products_db';

import styles from './styles';

function Products() {
    const [ search, setSearch ] = useState('');
    const [ categories, setCategories ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ filteredProducts, setFilteredProducts ] = useState([]);
    const [ categorySelected, setCategorySelected ] = useState(0);
    const [ primaryLoading, setPrimaryLoading ] = useState(true);
    const [ secondaryLoading, setSecondaryLoading ] = useState(true);

    const { preload, refreshData } = useContext(PreloadContext);

    const categoryRef = useRef();
    const navigation = useNavigation();
    const totalQuantityOfProducts = products.reduce((a, b) => a + b.amount, 0);

    useEffect(() => {
        let isActive = true;
        
        if (preload.refresh) {
            handleScrollToTop();
            setCategorySelected(0);
        }
        
        async function loadCategoriesData() {
            try {
                // const { products_categories : data } = database;
                const data = await products_categories_db.get();
        
                // const sortedData = data.sort((a, b) => (a.title > b.title) ? 1 : -1);
        
                if (isActive) {
                    setCategories([
                        {
                            id: 0,
                            title: "Todos",
                        },
                        ...data
                    ]);
                }

            } catch(error) {
                console.log(error);
            }
        }

        loadCategoriesData();

        return () => {
            isActive = false;
        }
    }, [preload.refresh]);

    useEffect(() => {
        let isActive = true;

        if (preload.refresh)
            setSecondaryLoading(true);
        
        async function loadProductsData() {
            try {
                // const { products: data } = database;
                const data = await products_db.get();
                
                // const sortedData = data.sort((a, b) => (a.name > b.name) ? 1 : -1);
                
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                if (isActive && preload.refresh) {
                    console.log('TELA DE PRODUTOS CHAMADA');
                    // if (preload.refresh || preload.refresh === undefined) {
                        setProducts(data);
                        setFilteredProducts(data);
                        preload.refresh && refreshData(false);
                    // }
                    setPrimaryLoading(false);
                    setSecondaryLoading(false);
                }

            } catch(error) {
                console.log(error);
            }
        }

        loadProductsData();

        return () => {
            isActive = false;
        }
    }, [preload.refresh])

    function finishLoadData() {
        setTimeout(() => {
            setSecondaryLoading(false);
        }, 1500)
    }
    
    function handleCategorySelected(category) {
        setSecondaryLoading(true);
        setCategorySelected(category);
        setSearch('')

        // if (category == 5)
        //     return setFilteredProducts(products);
        if (category == 0) {
            finishLoadData();
            return setFilteredProducts(products);
        }

        const filtered = products.filter(product => 
            product.categories.includes(category)
        );

        setFilteredProducts(filtered);
        finishLoadData();
    }

    function handleSearchChange(value) {
        setSecondaryLoading(true);
        setSearch(value);

        const filtered = products.filter(product =>
            product.name.toUpperCase().includes(value.toUpperCase())
        );

        handleScrollToTop();
        setCategorySelected(0);
        setFilteredProducts(filtered);

        finishLoadData();
    };

    function handleSubmitSearch() {
        if (search.length) {
            setSecondaryLoading(true);

            const filtered = products.filter(product =>
                product.name.toUpperCase().includes(search.toUpperCase())
            );

            handleScrollToTop();
            setCategorySelected(0);
            setFilteredProducts(filtered);

            finishLoadData();
        }
        Keyboard.dismiss();
    }

    function handleScrollToTop() {
        categoryRef.current?.scrollToOffset({ offset: 0, x: 0 })
    }

    function navigateToProductDetails(product) {
        // let { title } = categories.find(category => category.id == product.categories[0]);
        // let data = { ...product, category: title };

        // navigation.navigate('ProductDetails', { product: data });
        navigation.navigate('ProductDetails', { id: product.id });
    }

    function navigateToCategories() {
        navigation.navigate('Categories');
    }

    function navigateToCreateProduct() {
        navigation.navigate('CreateProduct');
    }

    function renderTextInformation() {
        if (!filteredProducts.length && categorySelected !== 0 && !secondaryLoading)
            return (
                <Text style={styles.notFoundText}>
                    Me desculpe! {'\n'}
                    Mas parece que essa categoria não possui produtos.
                </Text>
            );

        if (!filteredProducts.length && products.length && !secondaryLoading)
            return (
                <Text style={styles.notFoundText}>
                    Ops!!! {'\n'}
                    Produto não encontrado.
                </Text>
            );
        
        if (!products.length && !secondaryLoading)
            return (
                <Text style={styles.notFoundText}>
                    Você não possui produtos no estoque. {'\n'}
                    Insira o primeiro.
                </Text>
            );
    }

    if (primaryLoading)
        return <Load type="products" />

    return (
        <SafeAreaView style={styles.container}>
            <NavBar 
                title="Produtos em estoque" 
                page="products" 
                rightPress={navigateToCategories} 
            />
            <Header 
                page="products" 
                search={search}
                handleSearchChange={handleSearchChange}
                handleSubmitSearch={handleSubmitSearch}
                amountProducts={totalQuantityOfProducts}
            >
                <FlatList
                    ref={categoryRef}
                    data={categories}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <CategoryButton 
                            title={item.title}
                            active={item.id === categorySelected}
                            enabled={!secondaryLoading}
                            onPress={() => handleCategorySelected(item.id)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                />
            </Header>

            <View style={styles.products}>
                {!secondaryLoading 
                    ? <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <ProductCard 
                                data={item}
                                onPress={() => navigateToProductDetails(item)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 60 }}
                        numColumns={2}
                    />
                    : <Loader />
                }
                {renderTextInformation()}
            </View>
            
            <FlyingButton onPress={navigateToCreateProduct} />
        </SafeAreaView>
    )
};

export default Products;