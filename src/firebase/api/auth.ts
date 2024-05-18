import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import { User } from "../../interface";
import { db } from "./firebase.config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const registerUser = async (data: User) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password as string);
    createUserInDb({
      uid: userCredentials.user.uid,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      role: "regular",
      favorites: [],
    });
    // navigate -> /login
  } catch (error: any) {
    throw new Error(error);
  }
};

async function createUserInDb(data: User) {
  await setDoc(doc(db, "users", data.uid), {
    uid: data.uid,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    role: data.role,
    favorites: [],
  });
  console.log("User registered");
}

export async function logInUser(data: User) {
  const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password as string);
  return fetchUser(userCredentials.user.uid);
}
export async function fetchUser(id: string) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.setItem("loggedUser", JSON.stringify(docSnap.data().uid as string));
      // localStorage.setItem("userCart", JSON.stringify(docSnap.data().cart));
      console.log("User exists");
      return docSnap.data();
    } else {
      console.log("User doesn't exist");
    }
  } catch (error) {
    console.error("Error auth user", error);
  }
}
export async function signOutUser() {
  await signOut(auth);
  console.log("User signed out");
}
export async function updateUser(updatedUser: User) {
  const docRef = doc(db, "users", updatedUser.uid);
  await updateDoc(docRef, updatedUser);
  console.log("User updated");
}
