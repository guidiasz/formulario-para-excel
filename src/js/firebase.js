import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA9PnC20-Z4G1hvWki2UXo5tI_-ZrlNF_A',
  authDomain: 'formulario-para-excel.firebaseapp.com',
  projectId: 'formulario-para-excel',
  storageBucket: 'formulario-para-excel.appspot.com',
  messagingSenderId: '443110829794',
  appId: '1:443110829794:web:d5a50c896411e39d7538bb',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
