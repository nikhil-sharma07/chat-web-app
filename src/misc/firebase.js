import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAWjGVCZrA-qRbd-sF-kRl5THaKhllkz3c',
  authDomain: 'chat-web-app-beeda.firebaseapp.com',
  databaseURL:
    'https://chat-web-app-beeda-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-web-app-beeda',
  storageBucket: 'chat-web-app-beeda.appspot.com',
  messagingSenderId: '265862383737',
  appId: '1:265862383737:web:f651d39e66f976913d2ca8',
};

const app = firebase.initializeApp(firebaseConfig);
export const auth=app.auth();
export const database=app.database();
export const storage=app.storage();