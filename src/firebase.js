import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMGH4DZuNILh0yO9VZe-NTDOkEtxljYvk",
  authDomain: "interasiastock.firebaseapp.com",
  projectId: "interasiastock",
  storageBucket: "interasiastock.appspot.com",
  messagingSenderId: "95854230591",
  appId: "1:95854230591:web:2e8f7e00323bfe6afa8c8a",
  measurementId: "G-K98DZ0SLWY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
