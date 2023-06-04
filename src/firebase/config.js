import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBLrBAGH2ycXKMKN3FADPBv4hZtBrkmGtA",
  authDomain: "menkuldegerler-8be4a.firebaseapp.com",
  projectId: "menkuldegerler-8be4a",
  storageBucket: "menkuldegerler-8be4a.appspot.com",
  messagingSenderId: "680942438061",
  appId: "1:680942438061:web:5a8b322e147d261121e824"
};

// init firebase
// bizi firebase backend'ine bağlar
firebase.initializeApp(firebaseConfig);

// init service
// firestore hizmetini başlatır
const fireProject = firebase.firestore();
const authFire = firebase.auth();

// timestamp
const zamanPulu = firebase.firestore.Timestamp

export { fireProject, authFire, zamanPulu };