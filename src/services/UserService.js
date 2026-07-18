import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, db } from "../firebase/FirebaseConfig";
import AuthService from "./AuthService";
import UserModel from "../models/UserModel";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const dbPath = "users";

class UserService {

  // Customer Register
  async register(data) {

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      const newUser = new UserModel();

      newUser.id = user.uid;
      newUser.name = data.name;
      newUser.email = data.email;
      newUser.mobile = data.mobile;
      newUser.userType = 2;

      await setDoc(
        doc(db, dbPath, user.uid),
        { ...newUser }
      );

      await signOut(auth);

      return true;

    }
    catch (error) {

      throw error;

    }

  }


  // Customer Login
  async login(data) {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

    const user = userCredential.user;

    const userDoc = await getDoc(
      doc(db, dbPath, user.uid)
    );

    if (!userDoc.exists()) {

      await signOut(auth);

      throw new Error("REGISTER_FIRST");

    }

    const userData = userDoc.data();

    if (userData.userType !== 2) {

      await signOut(auth);

      throw new Error("Only Customer Login Allowed");

    }

    const authData = {

      id: user.uid,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      userType: userData.userType,
      token: user.accessToken,

    };

    await AuthService.setData(authData);

    return authData;

  }


  // Forgot Password
  async forgotPassword(email) {

    await sendPasswordResetEmail(auth, email);

    return true;

  }


  // Logout
  async logout() {

    await signOut(auth);

    await AuthService.removeData();

    return true;

  }

}

export default new UserService();