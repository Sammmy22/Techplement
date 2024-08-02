import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// import QUOTES from "./quotes.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export const uploadData = async () => {
//   const docRef = doc(db, "quotes", "quotes");
//   await setDoc(docRef, { quotes: QUOTES });
// };

export const getQuotes = async () => {
  const docRef = doc(db, "quotes", "quotes");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (!data) {
    return;
  }

  const { quotes } = data;

  return quotes;
};
