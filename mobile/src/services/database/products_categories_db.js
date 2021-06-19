import { database } from '../firebase_config';
// import * as products_db from './products_db';

export function get() {
    return new Promise((resolve, reject) => {
        try {
            database()
            .ref('products_categories')
            .on('value', snapshot => {
                const response = snapshot.val() || [];
                const categories = response.filter(category => category !== undefined);
                const sortedCategories = categories.sort((a, b) => (a.title > b.title) ? 1 : -1);

                // await new Promise(resolve => setTimeout(resolve, 2000));

                resolve(sortedCategories);
            })
        } catch(error) {
            reject(error);
        }
    });
}

export function create(category) {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await get();

            const reorderedCategories = categories.sort((a, b) => a.id - b.id);
            const lastId = reorderedCategories[reorderedCategories.length - 1]?.id || 0;
            const id = lastId + 1;

            const updatedCategory = {
                ...category,
                id,
                created_at: Date.now(),
                updated_at: Date.now(),
            };

            const updatedCategories = [ 
                ...reorderedCategories, 
                updatedCategory,
            ];

            const sortedCategories = updatedCategories.sort((a, b) => (a.title > b.title) ? 1 : -1);

            await database()
                .ref(`products_categories/${id}`)
                .set(updatedCategory);

            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(sortedCategories);
        } catch(error) {
            console.log('ERRO EM CATEGORIES')
            console.log(error);
            reject(error);
        }
    });
}

export function update(id, category) {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await get();

            const updatedCategory = {
                ...category,
                updated_at: Date.now(),
            };

            const updatedCategories = categories.map(category => {
                if (category.id == id)
                    category = { ...category, ...updatedCategory };

                return category;
            });

            const sortedCategories = updatedCategories.sort((a, b) => (a.title > b.title) ? 1 : -1);

            await database()
                .ref(`products_categories/${id}`)
                .update(updatedCategory);
            
            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(sortedCategories);
        } catch(error) {
            reject(error);
        }
    });
}

export function remove(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await get();
            // const products = await products_db.get();
            // const categoryProducts = products.map(product => product.categories[0] === id);

            // console.log('CATEGORY_PRODUCTS')
            // console.log(categoryProducts)

            await database()
                .ref(`products_categories/${id}`)
                .remove();

            const updatedCategories = categories.filter(a => Number(a.id) !== Number(id));

            const sortedCategories = updatedCategories.sort((a, b) => (a.title > b.title) ? 1 : -1);

            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(sortedCategories);
        } catch(error) {
            reject(error);
        }
    });
}