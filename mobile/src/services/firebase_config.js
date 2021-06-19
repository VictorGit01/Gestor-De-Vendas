// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from '@react-native-firebase/app';
import firebase from 'firebase';
// import auth from '@react-native-firebase/auth';
import config from '../../enviromnent.config';

const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    databaseURL: config.DATABASE_URL,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    measurementId: config.MEASUREMENT_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth;
const database = firebase.database;
const storage = firebase.storage;

export { auth, database, storage };
export default firebase;