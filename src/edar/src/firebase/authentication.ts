import firebase from 'firebase/app';
import 'firebase/auth';

// firebaseConfig設定
export const firebaseApp = firebase.initializeApp({
    apiKey: process.env['REACT_APP_API_KEY'],
    authDomain: process.env['REACT_APP_AUTH_DOMAIN'],
    projectId: process.env['REACT_APP_PROJECT_ID'],
    storageBucket: process.env['REACT_APP_STORAGE_BUCKET'],
    messagingSenderId: process.env['REACT_APP_MESSAGING_SENDER_ID'],
    appId: process.env['REACT_APP_APP_ID'],
    measurementId: process.env['REACT_APP_MEASUREMENT_ID']
});

// googleアカウントでログイン
export function loginWithGoogle(): Promise<firebase.User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithPopup(provider)
            .then((response: firebase.auth.UserCredential | any) => {
                resolve(response.user);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// ログオフ処理
export const logout = () => {
    firebaseApp.auth().signOut()
}
