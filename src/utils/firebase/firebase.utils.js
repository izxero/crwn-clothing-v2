import { initializeApp }  from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth)=>{
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email} = userAuth;
    const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName, email, createdAt
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
// export default firebaseApp