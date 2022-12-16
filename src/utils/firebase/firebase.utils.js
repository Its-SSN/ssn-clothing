// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCyIWZiPa1JjnyCDDCH-dk8C9TkuvQsun0",
  authDomain: "ssn-clothing.firebaseapp.com",
  projectId: "ssn-clothing",
  storageBucket: "ssn-clothing.appspot.com",
  messagingSenderId: "927692210567",
  appId: "1:927692210567:web:7555f98255b421008bd322"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserFromAuth = async (userAuth)=>{
    const  userDocRef = doc( db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        })
      } catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userDocRef;
}