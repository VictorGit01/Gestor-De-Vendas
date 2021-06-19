import React, { useEffect, useState, useContext, useRef } from 'react';
import { 
    SafeAreaView, 
    TextInput, 
    View, 
    FlatList,
    Text,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import NetInfo from '@react-native-community/netinfo';

import { MessageContext } from '../../contexts/message';
import { PreloadContext } from '../../contexts/preload';

import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import OverlayLoader from '../../components/OverlayLoader';
import ModalConfirmation from '../../components/ModalConfirmation';

import styles from './styles';
import colors from '../../styles/colors';

import * as categories_db from '../../services/database/products_categories_db';
import * as products_db from '../../services/database/products_db';

function Categories() {
    const [ name, setName ] = useState('');
    const [ currentId, setCurrentId ] = useState(null);
    const [ deleteId, setDeleteId ] = useState(null);
    const [ mergedCategories, setMergedCategories ] = useState([]);
    const [ primaryLoading, setPrimaryLoading ] = useState(true);
    const [ secondaryLoading, setSecondaryLoading ] = useState(false);
    const [ confirmationVisible, setConfirmationVisible ] = useState(false);
    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);

    const { updateMessage } = useContext(MessageContext);
    const { refreshData } = useContext(PreloadContext);

    const input_ref = useRef();

    useEffect(() => {
        let isActive = true;
        console.log('CATGORIES SENDO CHAMADA DO LADO DE FORA')
        
        async function loadCategoriesData() {
            try {
            // const { products_categories: data } = database;
            const categories = await categories_db.get();

            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (isActive) {
                setMergedCategories(categories);
                setPrimaryLoading(false);
            }
                
            } catch(error) {
                console.log(error);
            }
        }

        loadCategoriesData();
        
        return () => {
            isActive = false;
        }
    }, []);

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleNoConnection() {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSecondaryLoading(false);
        updateMessage(
            'Sem conexão com a internet.', 
            true, 
            'error'
        );
    }

    async function handleAddOrUpdateCategory() {
        setSecondaryLoading(true);
        
        if (!name.trim()) {
            setSecondaryLoading(false);
            return updateMessage(
                'Por favor, digite um nome de categoria.', 
                true, 
                'error'
            );
        }
        if (currentId) {
            const state = await NetInfo.fetch();
                
            if (!state.isConnected)
                return handleNoConnection();

            const updatedCategory = {
                title: name,
            };
            
            Keyboard.dismiss();
            
            categories_db
                .update(currentId, updatedCategory)
                .then(updatedCategories => {
                    setName('');
                    setIsFilled(false);
                    setMergedCategories(updatedCategories);
                    setCurrentId(null);
                    setSecondaryLoading(false);
                    refreshData(true);
                    updateMessage('Categoria atualizada.');
                })
                .catch(error => {
                    updateMessage(`${error.error} - ${error.message}`);
                });

            return;
        }
        if (!currentId) {
            const state = await NetInfo.fetch();

            if (!state.isConnected)
                return handleNoConnection();

            const newCategory = {
                title: name,
                amount_products: 0,
            };
            
            Keyboard.dismiss();

            categories_db
                .create(newCategory)
                .then(updatedCategories => {
                    setMergedCategories(updatedCategories);
        
                    setName('');
                    setIsFilled(false);
                    setSecondaryLoading(false);
                    refreshData(true);
                    updateMessage('Categoria criada com sucesso!');
                })
                .catch(error => {
                    updateMessage(`${error.error} - ${error.message}`);
                });

            return;
        }
    }

    function handleClickEdit(id) {
        const { title } = mergedCategories.find(a => a.id == id);

        input_ref.current.focus();

        setIsFilled(true);
        setName(title);
        setCurrentId(id);
    }

    function handleClickDelete(id) {
        setDeleteId(id);
        setConfirmationVisible(true);
    }

    function handleCancelEditing() {
        Keyboard.dismiss();

        setIsFilled(false);
        setName('');
        setCurrentId(null);
    }

    function closeModalConfirmation() {
        setDeleteId(null);
        setConfirmationVisible(false);
    }

    async function handleDeleteCategory() {
        setSecondaryLoading(true);
        setConfirmationVisible(false);

        const state = await NetInfo.fetch();

        if (!state.isConnected)
            return handleNoConnection();

        const products = await products_db.get();
        
        const productsToDelete = products.map(product => {
            if (product.categories[0] === Number(deleteId))
                return product.id;
        }).filter(product => product !== undefined);

        // TIVE QUE CONSTRUIR ESTA FUNÇÃO PARA RODAR OS PROCESSOS UM APÓS O OUTRO:
        const startPromise = productsToDelete.reduce(async (product_promise, product_id) => {

            // EU ESTAVA RECENDO ERRO QUANDO TENTEI DELETAR OS PRODUTOS DA CATEGORIA
            // SOMENTE PERCORRENDO O ARRAY E USANDO O ASYNC E AWAIT.
            // ENTÃO CONSEGUI RESOLVER ESSE BUG PERCORRENDO A FUNÇÃO COM OS IDS DOS PRODUTOS
            // UTILIZANDO O REDUCE QUE RETORNARÁ UMA PROMISE DO JEITO QUE CONFIGUREI.
            await product_promise.then(async () => {
                await products_db.remove(product_id);
            })
            .catch(error => {
                updateMessage(`${error.error} - ${error.message}`);     
            });

        }, Promise.resolve());

        startPromise.then(async resposta => {
            console.log('FUNÇÃO O RETORNO DELA:')
            console.log(resposta);

            const updatedCategories = await categories_db
                .remove(deleteId);

            setMergedCategories(updatedCategories);
            setDeleteId(null);
            setIsFilled(false);
            setSecondaryLoading(false);
            refreshData(true);
            updateMessage('Categoria deletada');
        });
    }

    function renderCategory({ item }) {
        return (
            <View style={styles.card}>
                <View style={[styles.extremityContainer, { marginBottom: 10 }]}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity 
                            style={styles.iconButton}
                            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                            activeOpacity={.6}
                            onPress={() => handleClickEdit(item.id)}
                        >
                            <Feather name="edit-3" style={[styles.defaultIcon, styles.editIcon]} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.iconButton}
                            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                            activeOpacity={.6}
                            onPress={() => handleClickDelete(item.id)}
                        >
                            <Feather name="trash" style={[styles.defaultIcon, styles.removeIcon]} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.extremityContainer}>
                    <Text style={styles.cardText}>Nº de produtos:</Text>
                    <Text style={styles.cardText}>
                        {item.amount_products !== 0 ? 
                            `${item.amount_products} ${item.amount_products === 1 ? 'unidade' : 'unidades'}` 
                        : 'sem produtos'}
                    </Text>
                </View>

                <View style={styles.extremityContainer}>
                    <Text style={styles.cardText}>Criada em:</Text>
                    <Text style={styles.cardText}>
                        {/* {format(item.created_at.getTime(), 'dd-MM-yyyy').replace(/-/g, '/')} */}
                        {format(item.created_at, 'dd-MM-yyyy').replace(/-/g, '/')}
                    </Text>
                </View>

                <View style={styles.extremityContainer}>
                    <Text style={styles.cardText}>Atualizada em:</Text>
                    <Text style={styles.cardText}>
                        {/* {format(item.updated_at.getTime(), 'dd-MM-yyyy').replace(/-/g, '/')} */}
                        {format(item.updated_at, 'dd-MM-yyyy').replace(/-/g, '/')}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Categorias" />
            <Header page="categories" >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            (isFocused || isFilled) &&
                            { borderColor: colors.green }
                        ]}
                        placeholder="Nome da categoria"
                        placeholderTextColor={colors.gray_input}
                        selectionColor={colors.blue}
                        ref={input_ref}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        maxLength={14}
                        editable={!primaryLoading}
                        value={name}
                        onChangeText={handleInputChange}
                    />
                    <RectButton 
                        style={[styles.button, styles.buttonCreate]}
                        onPress={handleAddOrUpdateCategory}
                        enabled={!primaryLoading}
                    >
                        <Feather name={currentId ? "check" : "plus"} style={styles.defaultIcon} />
                    </RectButton>

                    {currentId && <RectButton 
                        style={[styles.button, styles.buttonCancel]}
                        onPress={handleCancelEditing}
                    >
                        <Feather name="x" style={styles.defaultIcon} />
                    </RectButton>}
                </View>
                <Text style={styles.label}>{name.length}/14 caracteres</Text>
            </Header>
            <View style={styles.categories}>
                {!primaryLoading ?
                <FlatList
                    data={mergedCategories}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderCategory}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listing}
                />
                :
                <Loader />}
                {!mergedCategories.length && !primaryLoading &&
                <Text style={styles.noDataText}>
                    Você não possui nenhuma categoria. {'\n'}
                    Crie a primeira.
                </Text>}
            </View>
            <OverlayLoader isVisible={secondaryLoading} />
            <ModalConfirmation 
                title="Deseja mesmo remover esta categoria? Se fizer isso irá deletar também todos os produtos incluídos nela."
                isVisible={confirmationVisible} 
                onCancel={closeModalConfirmation}
                onConfirm={handleDeleteCategory}
            />
        </SafeAreaView>
    );
};

export default Categories;