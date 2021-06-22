import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY="AIzaSyC2z19DbokJ4_7GbuZzLrjl5v-srzZvo0U",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN = "letmeask-d7cec.firebaseapp.com",
    databaseURL: process.env.REACT_APP_DATABASE_URL="https://letmeask-d7cec-default-rtdb.firebaseio.com",
    projectId: process.env.REACT_APP_PROJECT_ID="letmeask-d7cec",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET="letmeask-d7cec.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_IR="504414218836",
    appId: process.env.REACT_APP_APP_ID="1:504414218836:web:7f58f7f0911ea4770e9bc1"
  };


  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
