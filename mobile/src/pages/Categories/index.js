import React, { useEffect, useState, useContext } from 'react';
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

import { MessageContext } from '../../contexts/message';

import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import OverlayLoader from '../../components/OverlayLoader';
import ModalConfirmation from '../../components/ModalConfirmation'

import styles from './styles';
import colors from '../../styles/colors';

import database from '../../services/database';

function Categories() {
    const [ name, setName ] = useState('');
    const [ currentId, setCurrentId ] = useState(null);
    const [ deleteId, setDeleteId ] = useState(null);
    const [ mergedCategories, setMergedCategories ] = useState([]);
    const [ loadingData, setLoadingData ] = useState(true);
    const [ loadingActions, setLoadingActions ] = useState(false);
    const [ confirmationVisible, setConfirmationVisible ] = useState(false);
    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);

    const { updateMessage } = useContext(MessageContext);

    useEffect(() => {
        const { products_categories: data } = database;

        const sortedData = data.sort((a, b) => (a.title > b.title) ? 1 : -1);

        setTimeout(() => {
            setMergedCategories(sortedData);
            setLoadingData(false);
        }, 2000);
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

    function handleAddOrUpdateCategory() {
        if (!name.length) {

            updateMessage(
                'Por favor, digite um nome de categoria', 
                true, 
                'error'
            );

        } else if (currentId) {

            setLoadingActions(true);
            const obj = mergedCategories.find(a => a.id == currentId);

            obj.title = name;
            obj.updated_at = new Date();

            const updatedData = mergedCategories.map(category => {
                if (category.id == currentId)
                    category = obj;

                return category;
            });

            Keyboard.dismiss()
            
            setTimeout(() => {
                setMergedCategories(updatedData);
                setName('');
                setCurrentId(null);
                setLoadingActions(false);
                updateMessage('Categoria atualizada');
            }, 2000);

        } else {

            setLoadingActions(true);
            const id = mergedCategories.length;

            let obj = {
                id: id + 1,
                title: name,
                amount_products: 0,
                created_at: new Date(),
                updated_at: new Date(),
            }
            
            Keyboard.dismiss();
            
            setTimeout(() => {
                setMergedCategories([
                    ...mergedCategories,
                    obj,
                ]);

                setName('');
                setLoadingActions(false);
                updateMessage('Categoria criada com sucesso');
            }, 2000);

        }
    }

    function handleClickEdit(id) {
        const { title } = mergedCategories.find(a => a.id == id);

        setName(title);
        setCurrentId(id);
    }

    function handleClickDelete(id) {
        setDeleteId(id);
        setConfirmationVisible(true);
    }

    function handleCancelEditing() {
        setName('');
        setCurrentId(null);
    }

    function closeModalConfirmation() {
        setDeleteId(null);
        setConfirmationVisible(false);
    }

    function handleDeleteCategory() {
        setLoadingActions(true);
        setConfirmationVisible(false);

        const updatedData = mergedCategories.filter(a => a.id !== deleteId);

        setTimeout(() => {
            setMergedCategories(updatedData);
            setDeleteId(null);
            setLoadingActions(false);
            updateMessage('Categoria deletada');
        }, 3000);
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
                        {item.amount_products} {item.amount_products == 1 ? 'unidade' : 'unidades'}
                    </Text>
                </View>

                <View style={styles.extremityContainer}>
                    <Text style={styles.cardText}>Criada em:</Text>
                    <Text style={styles.cardText}>
                        {format(item.created_at.getTime(), 'dd-MM-yyyy').replace(/-/g, '/')}
                    </Text>
                </View>

                <View style={styles.extremityContainer}>
                    <Text style={styles.cardText}>Atualizada em:</Text>
                    <Text style={styles.cardText}>
                        {format(item.updated_at.getTime(), 'dd-MM-yyyy').replace(/-/g, '/')}
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
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        maxLength={14}
                        editable={!loadingData}
                        value={name}
                        onChangeText={handleInputChange}
                    />
                    <RectButton 
                        style={[styles.button, styles.buttonCreate]}
                        onPress={handleAddOrUpdateCategory}
                        enabled={!loadingData}
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
                {!loadingData ?
                <FlatList
                    data={mergedCategories}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderCategory}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listing}
                />
                :
                <Loader />}
                {!mergedCategories.length && !loadingData &&
                <Text style={styles.noDataText}>
                    Você não possui nenhuma categoria. {'\n'}
                    Crie a primeira.
                </Text>}
            </View>
            <OverlayLoader isVisible={loadingActions} />
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