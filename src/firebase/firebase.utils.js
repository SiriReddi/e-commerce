import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDotZ5cwiyZ_gWiawPfiG1Y7f8aQbqekcQ",
  authDomain: "e-clothing-4192a.firebaseapp.com",
  databaseURL: "https://e-clothing-4192a.firebaseio.com",
  projectId: "e-clothing-4192a",
  storageBucket: "e-clothing-4192a.appspot.com",
  messagingSenderId: "445052866719",
  appId: "1:445052866719:web:8170ff4ac9313084c212aa",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
