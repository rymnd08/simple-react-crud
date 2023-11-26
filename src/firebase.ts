// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, deleteDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD02SLoU4LhvIehUqorSW648OyzcDicZLA",
  authDomain: "react-simple-web-1.firebaseapp.com",
  projectId: "react-simple-web-1",
  storageBucket: "react-simple-web-1.appspot.com",
  messagingSenderId: "16999401119",
  appId: "1:16999401119:web:b0ad0aa4023df0226a84aa",
  measurementId: "G-VVNKNMKP7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export function addToFireStore(collectionName: string, data: object){
  return addDoc(collection(db, collectionName), data)
}
export function deleteToFireStore(collectionName: string, id: string ){
  return deleteDoc(doc(db, collectionName, id))
}