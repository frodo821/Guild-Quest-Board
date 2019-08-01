import firebase from 'firebase';
import 'firebase/firebase-firestore';
import config from './firebase.env'
import { User } from './datatype';

/**
 * Firebase SDKの初期化
 */
export function initialize() {
  firebase.initializeApp(config);
}

/**
 * ユーザーの認証情報からユーザーのデータを取得
 * @param authInfo ユーザーの認証情報
 */
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

/**
 * ユーザーデータを更新
 * @param user 新しいユーザーデータ
 */
export async function updateUserData(user: User) {
  let {id, ...data} = user;
  await firebase.firestore().collection('users').doc(id).set(data);
}