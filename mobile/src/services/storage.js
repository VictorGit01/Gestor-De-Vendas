import { storage } from './firebase_config';

export function uploadImage(image, folder, id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const metadata = {contentType: 'image/jpeg'};

            const ref = storage()
                .ref()
                .child(`images/${folder}/${id}.jpg`);

            const task = ref.put(blob, metadata);
            
            // SEMPRE QUE FOR MOSTRAR UMA MENSAGEM EM LOG, CONVERTA A RESPOSTA DA FUNÇÃO COM JSON.stringify.
            // PORQUE O EXPO ESTÁ CAUSANDO UM BUG INTERNO.
            task.on('state_changed', taskSnapshot => {
                console.log(
                    `${JSON.stringify(taskSnapshot.bytesTransferred)} 
                    trasnferred out of 
                    ${JSON.stringify(taskSnapshot.totalBytes)}`
                );
            });
            task.then(imageSnapshot => {
                console.log('Image Upload Successfully');
                resolve(imageSnapshot);
            })

        } catch(error) {
            reject(error);
            console.log(error);
        }
    });
}

export function downloadImage(id, folder) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = await storage()
                .ref(`images/${folder}/${id}.jpg`)
                .getDownloadURL();

            resolve(url);
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

export function deleteImage(id, folder) {
    return new Promise(async (resolve, reject) => {
        try {
            await storage()
                .ref(`images/${folder}/${id}.jpg`)
                .delete();

            resolve(true);
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}