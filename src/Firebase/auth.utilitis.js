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
//  prods
// const storage = firebase.storage();

// export const uploadHandler = async (file) => {
//   try {
//     const storageRef = await storage.ref();
//     const uploadTask = await storageRef
//       .child('images/' + file.name + Date.now())
//       .put(file);
//     const dlUrl = await uploadTask.snapshot.ref.getDownloadURL();
//     console.log(dlUrl);
//     return dlUrl;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };
