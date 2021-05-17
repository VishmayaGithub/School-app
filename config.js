import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDnPnbDTw9bZ3CfLfVRziASkhku6MD3cXI',
  authDomain: 'myproject-7a4ab.firebaseapp.com',
  projectId: 'myproject-7a4ab',
  storageBucket: 'myproject-7a4ab.appspot.com',
  messagingSenderId: '1054688881577',
  appId: '1:1054688881577:web:d6c455a59e94f8d87832b8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
