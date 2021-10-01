import { firebaseConfig } from './config';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/storage';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signinWithGoogle = () => auth.signInWithPopup(GoogleProvider);

//

export const firestore = firebase.firestore();

// Send User Info to DB (role)

export const SaveUser = (user) => {
  return firestore.doc(`users/${user.uid}`).set({
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

// Get User Info to DB (role)

export const GetUser = (uid) => {
  // console.log(uid);
  return firestore.collection('users').doc(uid).get();
};
// Auth with Email-Pass (Register)

export const RegWithEmail = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
// Auth with Email-Pass (Login)

export const LoginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const UnregisterEmail = () => {
  return firebase.auth().currentUser.delete();
};
