import firebase from 'firebase';
import 'firebase/firebase-firestore';
import config from './firebase.env'
import { User } from './datatype';

export function initialize() {
  firebase.initializeApp(config);
}

export async function fetchUserData(authInfo: firebase.auth.UserCredential) {
  let ref = firebase.firestore().collection('users').doc(authInfo.user!!.uid);
  let doc = await ref.get();
  if(doc.exists) {
    return {user: Object.assign({id: doc.id}, doc.data()) as User, created: false}
  }
  let new_user: User = {
    id: doc.id,
    exp: 0,
    last_logged_in: new Date().valueOf(),
    login_streak: 0,
    name: '未設定'
  };
  ref.set(new_user);
  return {user: new_user, created: true};
}