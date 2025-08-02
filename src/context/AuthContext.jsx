import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";
import Spinner from "../components/Spinner";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = { user, isAuthChecking };

  if (isAuthChecking) return <Spinner />;

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
