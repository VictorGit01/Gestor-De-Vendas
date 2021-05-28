import React, { useEffect, useState, useRef } from 'react';
import { 
    SafeAreaView, 
    ScrollView,
    Text,
    View,
    FlatList,
    Button,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import CategoryButton from '../../components/CategoryButton';
import ProductCard from '../../components/ProductCard';
import FlyingButton from '../../components/FlyingButton';
import Load from '../../components/Load';
import Loader from '../../components/Loader';

import database from '../../services/database';

import styles from './styles';

function Products() {
    const [ search, setSearch ] = useState('');
    const [ categories, setCategories ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ filteredProducts, setFilteredProducts ] = useState([]);
    const [ categorySelected, setCategorySelected ] = useState(5);
    const [ loading, setLoading ] = useState(true);
    const [ loadingData, setLoadingData ] = useState(false);

    const categoryRef = useRef();
    const navigation = useNavigation();
    const totalQuantityOfProducts = products.reduce((a, b) => a + b.amount, 0)

    function finishLoadData() {
        setTimeout(() => {
            setLoadingData(false);
        }, 1500)
    }
    
    function handleCategorySelected(category) {
        setLoadingData(true);
        setCategorySelected(category);
        setSearch('')

        // if (category == 5)
        //     return setFilteredProducts(products);
        if (category == 5) {
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
        setLoadingData(true);
        setSearch(value);

        const filtered = products.filter(product =>
            product.name.toUpperCase().includes(value.toUpperCase())
        );

        handleScrollToTop();
        setCategorySelected(5);
        setFilteredProducts(filtered);

        finishLoadData();
    };

    function handleSubmitSearch() {
        if (search.length) {
            setLoadingData(true);

            const filtered = products.filter(product =>
                product.name.toUpperCase().includes(search.toUpperCase())
            );

            handleScrollToTop();
            setCategorySelected(5);
            setFilteredProducts(filtered);

            finishLoadData();
        }
        Keyboard.dismiss();
    }

    useEffect(() => {
        const { products_categories : data } = database;

        const sortedData = data.sort((a, b) => (a.title > b.title) ? 1 : -1);

        setCategories([
            {
                id: 5,
                title: "Todos",
            },
            ...sortedData
        ]);
    }, []);

    useEffect(() => {
        const { products: data } = database;
        
        const sortedData = data.sort((a, b) => (a.name > b.name) ? 1 : -1);

        setTimeout(() => {
            setProducts(sortedData);
            setFilteredProducts(sortedData);
            setLoading(false);
        }, 2000);
    }, []);

    function handleScrollToTop() {
        categoryRef.current.scrollToOffset({ offset: 0, x: 0 })
    }

    function navigateToProductDetails(product) {
        let { title } = categories.find(category => category.id == product.categories[0]);
        let data = { ...product, category: title };

        navigation.navigate('ProductDetails', { product: data });
    }

    function navigateToCategories() {
        navigation.navigate('Categories');
    }

    function navigateToCreateProduct() {
        navigation.navigate('CreateProduct');
    }

    function renderTextInformation() {
        if (!filteredProducts.length && products.length && !loadingData) {
            return (
                <Text style={styles.notFoundText}>
                    Ops!!! {'\n'}
                    Produto não encontrado.
                </Text>
            )
        } else if (!products.length && !loadingData) {
            return (
                <Text style={styles.notFoundText}>
                    Você não possui produtos no estoque. {'\n'}
                    Insira o primeiro.
                </Text>
            )
        }
    }

    if (loading)
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
                            onPress={() => handleCategorySelected(item.id)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                />
            </Header>

            <View style={styles.products}>
                {!loadingData 
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