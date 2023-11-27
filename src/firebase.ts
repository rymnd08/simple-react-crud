// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, deleteDoc, doc, getDocs, query  } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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

export async function checkIfUserExist(email: string, password: string){
  const q = query(collection(db, 'users'));
  let user = {
    email,
    isExist : false,
    userID: ''
  }

  try {
    const res = await getDocs(q);

    res.forEach((doc: any) => {
      if (doc.data().email === email && doc.data().password === password) {
        user.isExist = true
        user.userID = doc.id
      }
    });

    return user;
  } catch (error) {
    console.error('Error fetching data:', error);
    return user;
  }
}

//File Upload

export async function UploadFile(path: string, file: File, file2: File){
  try {

    const ext = getExtenstion(file.name).toLowerCase()
    const ext2 = getExtenstion(file2.name).toLowerCase()

    const filename = `${path}/IMG_${Date.now()}.${ext}`
    const filename2 = `${path}/File_${Date.now()}.${ext2}`

    const storageRef = ref(storage, filename);
    const storageRef2 = ref(storage, filename2 );

    await uploadBytes(storageRef, file)
    await uploadBytes(storageRef2, file2)

    return {thumbnail: filename, book: filename2}

  } catch (error) {}
}

function getExtenstion(filename: string){
  const split = filename.split('.')
  const ext = split[split.length-1]
  return ext
}

export function invalidThumbnail(file: File){
  const ext = getExtenstion(file.name).toLowerCase()
  const extensions =  ['jpg', 'png', 'jpeg', 'webp']

  if(!extensions.includes(ext)){
    return true
  }else{
    return false
  }

}
export function invalidBookFile(file2: File){
  const ext2 = getExtenstion(file2.name).toLowerCase()
  if(ext2 != 'pdf' ){
    return true
  }else{
    return false
  }
}
