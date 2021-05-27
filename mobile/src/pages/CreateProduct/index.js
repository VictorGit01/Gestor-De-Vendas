import React, { useState, useRef, useContext } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    View, 
    Image, 
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
    Keyboard,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CurrencyInput from 'react-native-currency-input';

import { MessageContext } from '../../contexts/message';

import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import OverlayLoader from '../../components/OverlayLoader';

import addImageIcon from '../../assets/icons/image-add.png';
import editImageIcon from '../../assets/icons/image-edit.png';

import styles from './styles';
import colors from '../../styles/colors';

function CreateProduct() {
    const [ image, setImage ] = useState(null);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ selectedCategory, setSelectedCategory ] = useState({});
    const [ present_in_stock, setPresentInStock ] = useState(true);
    const [ buttonPressed, setButtonPressed ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const [ isFocused, setIsFocused ] = useState({
        name: false,
        description: false,
        price: false,
        amount: false,
    });
    const [ isFilled, setIsFilled ] = useState({
        name: false,
        description: false,
        price: false,
        amount: false,
    });

    const { updateMessage } = useContext(MessageContext);
    
    const navigation = useNavigation();

    const input_ref_2 = useRef();
    const input_ref_3 = useRef();
    const input_ref_4 = useRef();

    async function handleCreateProduct() {
        if (!image)
            return updateMessage(
                'Selecione uma imagem.',
                true,
                'error',
            )

        if (!name)
            return updateMessage(
                'Digite o nome do produto.',
                true,
                'error',
            );
        
        if (!price)
            return updateMessage(
                'Informe um preço.',
                true,
                'error',
            );

        if (!amount)
            return updateMessage(
                'Digite o nome do produto.',
                true,
                'error',
            );
        
        if (!selectedCategory.id)
            return updateMessage(
                'Selecione uma categoria',
                true,
                'error',
            );

        Keyboard.dismiss();
        setLoading(true);

        setTimeout(() => {
            navigation.goBack();
            updateMessage('Produto criado com sucesso!');
        }, 3000);
    }

    async function handleImageSelect() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            updateMessage(
                'Ops! Precisamos de acesso às suas fotos',
                true,
                'alert',
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (result.cancelled) {
            return;
        }

        const { uri } = result;

        setImage(uri);
        setIsFilled({
            ...isFilled,
            image: true
        });
    }

    function handleInputBlur(field, value) {
        setIsFocused({
            ...isFocused,
            [field]: false
        });
        setIsFilled({
            ...isFilled,
            [field]: !!value
        });
    }

    function handleInputFocus(field) {
        setIsFocused({
            ...isFocused,
            [field]: true
        });
    }

    function handleInputChange(field, value, setValue) {
        setIsFilled({
            ...isFilled,
            [field]: !!value
        });
        setValue(value);
    }

    function onAmountChange(value) {
        const cleaned = ('' + value).replace(/\D/g, '');

        setAmount(cleaned);
    }

    function handleSelectCategory() {

    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Novo produto" />
            <ScrollView 
                contentContainerStyle={styles.scrollForm}
                keyboardShouldPersistTaps={buttonPressed ? "always" : "handled"}
            >
                <TouchableOpacity 
                    style={[
                        styles.imageContainer,
                        image && { borderColor: colors.green }
                    ]}
                    activeOpacity={.7}
                    onPress={handleImageSelect}
                >
                    {image ? 
                    <>
                        <Image
                            style={styles.image}
                            source={{ uri: image }}
                        />
                        <View style={styles.editImageContainer}>
                            <Image
                                style={styles.editImage}
                                source={editImageIcon}
                            />
                            <Text style={styles.editImageText}>Trocar</Text>
                        </View>
                    </>
                    :
                    <Image
                        style={styles.addImage}
                        source={addImageIcon}
                    />}
                </TouchableOpacity>

                <View style={styles.action}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={[
                            styles.input,
                            (isFocused.name || isFilled.name) &&
                            { borderColor: colors.green }
                        ]}
                        returnKeyType="next"
                        onSubmitEditing={() => input_ref_2.current.focus()}
                        blurOnSubmit={false}
                        onBlur={() => handleInputBlur('name', name)}
                        onFocus={() => handleInputFocus('name')}
                        value={name}
                        onChangeText={(text) => handleInputChange(
                            'name', text, setName
                        )}
                    />
                </View>

                <View style={styles.action}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[
                            styles.input, 
                            styles.descriptionInput,
                            (isFocused.description || isFilled.description) &&
                            { borderColor: colors.green }
                        ]}
                        placeholder="Opcional"
                        placeholderTextColor={colors.gray_input}
                        multiline
                        maxLength={300}
                        value={description}
                        // returnKeyType="next"
                        ref={input_ref_2}
                        // onSubmitEditing={() => input_ref_3.current.focus()}
                        blurOnSubmit={false}
                        onBlur={() => handleInputBlur('description', description)}
                        onFocus={() => handleInputFocus('description')}
                        onChangeText={(text) => handleInputChange(
                            'description', text, setDescription
                        )}
                    />
                    <Text style={styles.tag}>{description.length}/300 caracteres</Text>
                </View>

                <View style={styles.action}>
                    <Text style={styles.label}>Preço</Text>
                    <CurrencyInput
                        style={[
                            styles.input,
                            (isFocused.price || isFilled.price) &&
                            { borderColor: colors.green },
                            { color: price == 0 ? colors.gray_input : colors.blue_dark }
                        ]}
                        placeholder="R$ 0,00"
                        // unit="$"
                        prefix="R$ "
                        delimiter="."
                        separator=","
                        precision={2}
                        returnKeyType="next"
                        ref={input_ref_3}
                        onSubmitEditing={() => input_ref_4.current.focus()}
                        blurOnSubmit={false}
                        onBlur={() => handleInputBlur('price', price)}
                        onFocus={() => handleInputFocus('price')}
                        value={price}
                        onChangeValue={(text) => handleInputChange(
                            'price', text, setPrice
                        )}
                        onChangeText={value => console.log(value)}
                    />
                </View>

                <View style={styles.action}>
                    <Text style={styles.label}>Quantidade</Text>
                    <TextInput
                        style={[
                            styles.input,
                            (isFocused.amount || isFilled.amount) &&
                            { borderColor: colors.green }
                        ]}
                        keyboardType="numeric"
                        returnKeyType="next"
                        ref={input_ref_4}
                        onBlur={() => handleInputBlur('amount', amount)}
                        onFocus={() => handleInputFocus('amount')}
                        value={amount}
                        onChangeText={(text) => handleInputChange(
                            'amount', text, onAmountChange
                        )}
                    />
                </View>

                <View style={styles.action}>
                    <Text style={styles.label}>Categoria</Text>
                    <TouchableOpacity
                        style={[
                            styles.input, 
                            styles.buttonSelect,
                            selectedCategory.id && { borderColor: colors.green }
                        ]}
                        activeOpacity={1}
                    >
                        <Text style={[
                            styles.buttonText,
                            { color: selectedCategory.id 
                                ? colors.blue_dark 
                                : colors.gray_input }
                        ]}>
                            {selectedCategory.id ? selectedCategory.title : 'Selecione uma categoria'}
                        </Text>
                        <Entypo name="chevron-small-down" style={styles.arrowDownIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Presente no estoque?</Text>
                    <Switch
                        thumbColor={colors.white}
                        trackColor={{ false: colors.gray, true: colors.green }}
                        value={present_in_stock}
                        onValueChange={setPresentInStock}
                    />
                </View>

                <View style={styles.footer}>
                    <Button 
                        title="Criar produto" 
                        onPress={handleCreateProduct} 
                        onBegan={() => setButtonPressed(true)}
                        onEnded={() => setButtonPressed(false)}
                    />
                </View>
            </ScrollView>
            <OverlayLoader isVisible={loading} />
        </SafeAreaView>
    );
};

export default CreateProduct;