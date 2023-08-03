// AuthProvider.js
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase";
import { getAuth, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider,GithubAuthProvider, onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading state to true initially

  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  const facebookprovider = new FacebookAuthProvider();

  const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    
  };


  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubAuthProvider);
  };

  const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookprovider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('auth state change', currentUser);
      setUser(currentUser);
      setLoading(false); // Set loading to false when the authentication state is determined
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // If loading, you can show a loading spinner or a message instead of rendering the content
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once the authentication state is determined, render the content
  const authInfo = {
    user,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    signInWithGithub,
    signInWithFacebook,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
