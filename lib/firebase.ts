// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Logout error:", error.message);
      throw new Error(error.message);
    }
    throw new Error("Unexpected error occurred during logout");
  }
}
