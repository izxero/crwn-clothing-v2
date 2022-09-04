import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect
} from 'firebase/auth';

import {
  doc,
  getDoc, getFirestore, setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcvNbTd2CfPyCPjCwKlUSCU1-GoM-CmLg",
  authDomain: "crwn-clothing-db-fdaa6.firebaseapp.com",
  projectId: "crwn-clothing-db-fdaa6",
  storageBucket: "crwn-clothing-db-fdaa6.appspot.com",
  messagingSenderId: "639503329055",
  appId: "1:639503329055:web:f962c06f64fa884101722a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...additionalInformation
      });
    } catch (err) {
      console.log('error creating the user', err.message)
    }
  }
  //if user data does not exists
  return userDocRef;
  //create / set the document with the data from userAuth in my collection

  //if user data exists
  //return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)

}