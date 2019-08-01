import firebase from 'firebase';
import 'firebase/firebase-auth';

let login_status: firebase.auth.UserCredential | null = null;

export async function login() {
  let auth = firebase.auth();
  auth.languageCode = 'ja';
  let provider = new firebase.auth.GoogleAuthProvider();
  login_status = await auth.signInWithPopup(provider);
  return login_status;
}

export function logout() {
  login_status = null;
  firebase.auth().signOut();
}

export function checkLoggedIn() {
  return login_status !== null
}