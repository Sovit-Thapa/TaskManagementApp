import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../firebase/config";

const auth = getAuth(app);
const db = getFirestore(app);

export const signupUser = async (email, password, displayName) => {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: displayName,
          createdAt: new Date(),
      });

      console.log("User signed up and data saved to Firestore");
  } catch (error) {
      throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
          console.log("User data retrieved from Firestore:", userDoc.data());
      } else {
          console.log("No user data found in Firestore");
      }

      console.log("User logged in");
  } catch (error) {
      throw error;
  }
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
