import React, { useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.init";

import { AuthContext } from "./AuthContext";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("null");
  const [loading, setLoading] = useState(true);

  // Google Sign In
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

  // User Observer
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      setUser(null);
      setRole("null");
      setLoading(false);
      return;
    }

    setUser(currentUser);

    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `https://backend-ticket-server.vercel.app/users/${currentUser.email}`
        );

        setRole(res.data?.role || "user");
      } catch {
        setRole("user");
      }
    };

    await fetchRole();

    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const authInfo = {
    user,
    role,
    loading,
    googleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
