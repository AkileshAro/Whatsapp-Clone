import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBW_V5HAvmEHg6PbsNfMQLd3FW9GhJKJ1o",
    authDomain: "whatsapp-dca6e.firebaseapp.com",
    databaseURL: "https://whatsapp-dca6e.firebaseio.com",
    projectId: "whatsapp-dca6e",
    storageBucket: "whatsapp-dca6e.appspot.com",
    messagingSenderId: "815124511930",
    appId: "1:815124511930:web:10fdf3f7b62a9112ef5683",
    measurementId: "G-EVGC12MELM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();