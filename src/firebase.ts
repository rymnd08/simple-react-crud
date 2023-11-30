// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, deleteDoc, doc, getDocs, query  } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

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
const storage = getStorage(app)

export function addToFireStore(collectionName: string, data: object){
  return addDoc(collection(db, collectionName), data)
}

export function deleteToFireStore(collectionName: string, id: string ){
  return deleteDoc(doc(db, collectionName, id))
}

export function getBooks(){
  return getDocs(query(collection(db, 'books')))
}

export  function getUsers(){
  const q = query(collection(db, 'users'));
  return  getDocs(q);
}



//File Upload
export function getDownloadImageURL(fileName: string){
  return getDownloadURL(ref(storage, fileName) )
}

export function UploadFile(file: File, fileName: string){
    const storageRef = ref(storage, fileName);
    return  uploadBytes(storageRef, file)
}

function getExtenstion(filename: string){
  const split = filename.split('.')
  const ext = split[split.length-1]
  return ext
}

export function invalidThumbnail(file: File){
  const ext = getExtenstion(file.name).toLowerCase()
  const extensions =  ['jpg', 'png', 'jpeg', 'webp', 'jfif']

  if(!extensions.includes(ext)){
    return true
  }else{
    return false
  }

}
export function invalidBookFile(file2: File){
  const ext2 = getExtenstion(file2.name).toLowerCase()
  const validFormat = ['pdf', 'epub', 'mobi','azw','txt','doc']
  if(!validFormat.includes(ext2)){
    return true
  }else{
    return false
  }
}

//delete file in bucket
export function deleteFileInStorage(fileName: string){
  const fileRef = ref(storage, fileName)
  return deleteObject(fileRef)
}
