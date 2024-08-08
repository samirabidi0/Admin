import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCRtFp_tyiB9m4jakayy6aLdVC-zgQyx8o",
  authDomain: "fallehbledy.firebaseapp.com",
  projectId: "fallehbledy",
  storageBucket: "fallehbledy.appspot.com",
  messagingSenderId: "927588230691",
  appId: "1:927588230691:web:1ad6df0f752803a0e73396",
  measurementId: "G-ZENV8FDXN8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage}