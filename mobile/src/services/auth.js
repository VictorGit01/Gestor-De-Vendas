import { auth } from './firebase_config';

export function signIn(email, password, updateMessage) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await 
                auth()
                .signInWithEmailAndPassword(
                    email, 
                    password
                );
            await new Promise(resolve => setTimeout(resolve, 2000));
                    
            resolve(user);
        } catch(error) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (error.code == 'auth/invalid-email') {
                updateMessage(
                    'Endereço de email inválido.',
                    true,
                    'error'
                );
            } else if (error.code == 'auth/weak-password') {
                updateMessage(
                    'Sua senha deve conter pelo menos 6 caracteres.',
                    true,
                    'error'
                );
            } else if (error.code == 'auth/wrong-password') {
                updateMessage(
                    'Senha incorreta.',
                    true,
                    'error'
                );
            } else if (error.code == 'auth/user-not-found') {
                updateMessage(
                    'Não existe usuário com este email.',
                    true,
                    'error'
                );
            } else if (error.code == 'auth/user-disabled') {
                updateMessage(
                    'Sua conta foi desativada pelo administrador.',
                    true,
                    'error'
                );
            } else if (error.code == 'auth/too-many-requests') {
                updateMessage(
                    'Ocorreu um erro! Tente mais tarde.',
                    true,
                    'error'
                );
            } else if (error.code == 'auth/network-request-failed') {
                updateMessage(
                    'Ocorreu um erro na conexão.',
                    true,
                    'error'
                );
            } else {
                updateMessage(
                    `${error.code} - ${error.message}`,
                    true,
                    'error'
                );
            }

            reject(error);
        }
    });
}

export function signOut(updateMessage) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await auth().signOut();

            await new Promise(resolve => setTimeout(resolve, 2000));

            resolve(response);
        } catch(error) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (error.code == 'auth/too-many-requests') {
                updateMessage(
                    'Ocorreu um erro! Tente mais tarde.',
                    true,
                    'error'
                );
            } else if (error.code == 'auth/network-request-failed') {
                updateMessage(
                    'Ocorreu um erro na conexão.',
                    true,
                    'error'
                );
            } else {
                updateMessage(
                    `${error.code} - ${error.message}`,
                    true,
                    'error'
                );
            }

            reject(error);
        }
    })
}

export function updatePassword(currentPassword, newPassword, updateMessage) {
    return new Promise(async (resolve, reject) => {
        try {
            const { currentUser: user } = auth();

            if (user) {
                const credential = auth.EmailAuthProvider.credential(
                    user.email,
                    currentPassword,
                );
    
                await user.reauthenticateWithCredential(credential);
                
                const response = await user.updatePassword(newPassword);
                
                resolve(response);
            }
        } catch(error) {
            if (error.code == 'auth/wrong-password') {
                updateMessage(
                    'A senha atual é inválida.',
                    true,
                    'error'
                )
            } else if (error.code == 'auth/weak-password') {
                updateMessage(
                    'A senha deve ter pelo menos 6 caracteres.',
                    true,
                    'error'
                )
            } else if (error.code == 'auth/too-many-requests') {
                updateMessage(
                    'Muitas tentativas sem êxito. Por favor, tente novamente mais tarde.',
                    true,
                    'error'
                )
            } else if (error.code == 'auth/network-request-failed') {
                updateMessage(
                    'Ocorreu um erro de rede (com o limite de tempo, conexão interrompida ou servidor inacessível).',
                    true,
                    'error'
                )
            } else {
                updateMessage(
                    `${error.code} - ${error.message}`,
                    true,
                    'error'
                )
            }

            reject(error);
            console.log(error.code);
            console.log(error.message)
        }
    });
}

export default auth;