// 必要な関数を import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC29t9VLXuG2W9VKwvUNtX_PEU5iGuN81k",
  authDomain: "my-project-b4ce7.firebaseapp.com",
  projectId: "my-project-b4ce7",
  storageBucket: "my-project-b4ce7.firebasestorage.app",
  messagingSenderId: "56178494872",
  appId: "1:56178494872:web:3495497c32cac633dc2fed",
  measurementId: "G-1JLP0GYZP0",
};

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig);
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app);
