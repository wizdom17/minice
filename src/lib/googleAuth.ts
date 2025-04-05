import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

export async function signUpWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user; // Extract user details
    const splitName = user?.displayName?.split(" ") || [];
    const cred = GoogleAuthProvider.credentialFromResult(res);
    const userData = {
      token: cred?.accessToken,
      uid: user.uid,
      email: user.email,
      firstName: splitName[0] || "",
      lastName: splitName[1] || "",
    };
    console.log(user);
    const response = await axios.post("/api/register", userData);
    if (response.status === 200) {
      window.location.href = "/dashboard";
    }
  } catch (error: any) {
    console.log(error);
  }
}
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const cred = GoogleAuthProvider.credentialFromResult(res);
    const user = res.user; // Extract user details
    const userData = {
      uid: user.uid,
      token: cred?.accessToken,
    };
    const responsePromise = axios.post("/api/login", userData);
    const response = await responsePromise;
    if (response.status === 200) {
      window.location.href = "/dashboard";
    }
  } catch (error: any) {
    console.log(error);
  }
}
