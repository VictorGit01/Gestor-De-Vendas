import { database } from '../firebase_config';
import config from '../../../enviromnent.config';

export function getUsers() {
    return new Promise((resolve, reject) => {
        try {
            database()
            .ref('users')
            .on('value', snapshot => {
                const response = snapshot.val() || [];
                const data = response.filter(a => a !== undefined);

                resolve(data);
            });
        } catch(error) {
            reject(error);
        }
    })
}

export function getUserOn(id) {
    return new Promise((resolve, reject) => {
        try {
            database()
            .ref(`users/${id}`)
            .on('value', snapshot => {
                const data = snapshot.val() || {};

                resolve(data);
            });
        } catch(error) {
            reject(error);
        }
    })
}

export function getUserFake() {
    return new Promise((resolve, reject) => {
        try {
            const data = {
                name: config.USER_NAME,
                email: config.USER_EMAIL,
                birth_date: Number(config.USER_BIRTH),
            }

            resolve(data)
        } catch(error) {
            console.log(`${error.code} - ${error.message}`);
            reject(error);
        }
    })
}

export function createUser(newUser) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await getUsers();

            const lastId = users.length || 0;
            const id = lastId + 1;
    
            const data = {
                ...newUser,
                id,
                created_at: Date.now(),
                updated_at: Date.now(),
            };
            
            await database()
            .ref(`users/${id}`)
            .set(data);
            
            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(data);
        } catch(error) {
            reject(error);
        }
    })
}

export function updateUser(id, user) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {
                ...user,
                updated_at: Date.now(),
            }

            database()
            .ref(`users/${id}`)
            .update(data);

            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(data);
        } catch(error) {
            reject(error);
        }
    })
}