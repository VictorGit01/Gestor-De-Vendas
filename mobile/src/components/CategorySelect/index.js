import React, { useState, useContext } from 'react';
import { 
    Dimensions, 
    StatusBar, 
    View, 
    Text, 
    ActivityIndicator,    
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import { MessageContext } from '../../contexts/message';

import styles from './styles';
import colors from '../../styles/colors';

// import database from '../../services/database_test';
import * as products_categories_db from '../../services/database/products_categories_db';

export default function CategorySelect({ 
    modalizeRef,
    closeModal,
    selectedId, 
    handleSelectId,
    verifiedId,
    setVerifiedId,
    setCategory,
    isEditable,
}) {
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const { updateMessage } = useContext(MessageContext);

    const { height } = Dimensions.get('window');
    const modalHeight = height - StatusBar.currentHeight;

    async function handleOpening() {
        setLoading(true);
        // const { products_categories: data } = database;
        const data = await products_categories_db.get();

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!verifiedId) {
            if (isEditable)
                return setVerifiedId(selectedId);

            handleSelectId('');
        } else {
            handleSelectId(verifiedId);
        }


        setCategories(data);
        setLoading(false);
    }

    async function handleConfirm() {
        // const { products_categories: data } = database;
        const data = await products_categories_db.get();

        const { title: name } = data.find(a => String(a.id) === selectedId);

        if (!selectedId)
            return updateMessage('Selecione uma categoria.', true, 'error');

        setVerifiedId(selectedId);
        setCategory(name);
        closeModal();
    }


    function headerComponent() {
        return (
            <View style={styles.headerContainer}>
                <BorderlessButton style={styles.headerButton} onPress={closeModal}>
                    <AntDesign name="close" style={styles.headerIcon} />
                </BorderlessButton>

                <Text style={styles.headerTitle}>Escolha uma categoria</Text>

                <BorderlessButton style={styles.headerButton} onPress={handleConfirm}>
                    <AntDesign name="check" style={styles.headerIcon} />
                </BorderlessButton>
            </View>
        )
    }

    function categoriesLoading() {
        if (loading)
            return <ActivityIndicator 
                size={50} 
                color={colors.blue_semi_dark} 
                style={styles.load} 
            />;

        return <View />;
    }

    function categoryItem({ item }) {
        return (
            <>
                <RectButton 
                    style={styles.buttonItem}
                    onPress={() => handleSelectId(item.id)}
                >
                    <View style={[
                        styles.radioButton,
                        selectedId == item.id &&
                        { borderColor: colors.blue }
                    ]}>
                        {selectedId == item.id && 
                        <View style={styles.radioButtonSelected}/>}
                    </View>
                    <Text style={styles.textItem}>{item.title}</Text>
                </RectButton>
                <View style={styles.separator}/>
            </>
        )
    }

    return (
        <Modalize
            ref={modalizeRef}
            onOpen={handleOpening}
            snapPoint={modalHeight}
            modalHeight={modalHeight}
            HeaderComponent={headerComponent}
            flatListProps={{
                contentContainerStyle: styles.listing,
                keyExtractor: (item) => String(item.id),
                data: !loading ? categories : [],
                renderItem: categoryItem,
                showsVerticalScrollIndicator: false,
                ListHeaderComponent: categoriesLoading,
            }}
        />
    );
};