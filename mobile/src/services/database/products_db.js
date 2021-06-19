import { database } from '../firebase_config';
import * as storage from '../storage';
import * as products_categories_db from './products_categories_db';

export function get() {
    return new Promise((resolve, reject) => {
        try {
            database()
                .ref('products')
                .on('value', async snapshot => {
                    const response = snapshot.val() || [];
                    const data = response.filter(a => a !== undefined);

                    // COLOQUEI O MÉTODO MAP DENTRO DESSA PROMISE PORQUE O MESMO NÃO ESTAVA ACEITANDO 'ASYNC' E 'AWAIT.'
                    const updatedData = await Promise.all(data.map(async product => {
                        const url = await storage.downloadImage(product.id, 'products');
                        const image = { uri: url };

                        product.photo = { ...image, db_uri: product.photo_uri };

                        return product;
                    }));

                    resolve(updatedData);
                })
        } catch(error) {
            reject(error);
        }
    });
}

export function create(product, image) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await get();
            const categories = await products_categories_db.get();

            const lastId = products[products.length - 1]?.id || 0;
            const id = lastId + 1;

            const updatedProduct = {
                ...product,
                id,
                created_at: Date.now(),
                updated_at: Date.now(),
            };

            const updatedProducts = [
                ...products,
                updatedProduct,
            ];
            
            const categoryId = product.categories[0];
            // const amount_products = categories[categories.length - 1].amount_products || 0;
            const updatedCategory = categories.find(category => category.id == categoryId);
            updatedCategory.amount_products++
            // const updatedCategory = {
            //     amount_products: category.amount_products + 1 
            // };

            await storage.uploadImage(image, 'products', id);

            await database()
                .ref(`products/${id}`)
                .set(updatedProduct);

            await products_categories_db.update(categoryId, updatedCategory);

            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(updatedProducts);
        } catch(error) {
            console.log('ERRO EM PRODUCTS')
            console.log(error);
            reject(error);
        }
    });
}

export function update(id, product, image = null) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await get();
            const categories = await products_categories_db.get();

            const updatedProduct = {
                ...product,
                updated_at: Date.now(),
            };

            const updatedProducts = products.map(product => {
                if (product.id == id)
                    product = { ...product, ...updatedProduct };

                return product;
            });

            const selectedCategoryId = product.categories[0];
            const currentCategoryId = products.find(product => Number(product.id) === Number(id)).categories[0];
            // const currentCategoryId = currentProduct.categories[0];

            const updatedCategories = categories.map((category, index, data) => {
                // const { amount_products } = category;
                if (category.id == selectedCategoryId)
                    data[index].amount_products += 1;
                    // data[index].amount_products = category.amount_products + 1

                if (category.id == currentCategoryId)
                    data[index].amount_products -= 1;
                    // data[index].amount_products = category.amount_products - 1

                return category;
            });

            const selectedCategory = updatedCategories.find(category => category.id == selectedCategoryId);
            const currentCategory = updatedCategories.find(category => category.id == currentCategoryId);

            if (image)
                console.log('PRODUCTS_DB: IMAGEM DIFERENTE DA ATUAL')

            if (image)
                await storage.uploadImage(image, 'products', id);
            
            await database()
                .ref(`products/${id}`)
                .update(updatedProduct);

            if (selectedCategoryId != currentCategoryId) {
                await products_categories_db.update(selectedCategoryId, selectedCategory);
    
                await products_categories_db.update(currentCategoryId, currentCategory);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(updatedProducts);
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

export function remove(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await get();
            const categories = await products_categories_db.get();

            const product = products.find(product => product.id === id);

            const updatedCategory = categories.find(category => category.id === product.categories[0]);
            updatedCategory.amount_products--;

            const updatedProducts = products.filter(a => Number(a.id) !== Number(id));

            const sortedProducts = updatedProducts.sort((a, b) => (a.name > b.name) ? 1 : -1);

            await database()
                .ref(`products/${id}`)
                .remove();

            await storage
                .deleteImage(id, 'products');

            await products_categories_db
                .update(updatedCategory.id, updatedCategory);

            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(sortedProducts);
        } catch(error) {
            console.log(error);
            reject(error);
        }
    })
}