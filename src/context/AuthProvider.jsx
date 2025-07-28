import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "./AuthContext";

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const axiosPublic = useAxiosPublic();

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // ✅ updateUserProfile now refreshes user state
//   const updateUserProfile = async (name, photo) => {
//     if (auth.currentUser) {
//       await updateProfile(auth.currentUser, {
//         displayName: name,
//         photoURL: photo,
//       });

//       // ✅ Update the user state with new info
//       const updatedUser = {
//         ...auth.currentUser,
//         displayName: name,
//         photoURL: photo,
//       };
//       setUser(updatedUser);
//     }
//   };

//   // ✅ Ensure user info is always fresh on auth change
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       try {
//         if (currentUser?.email) {
//           await currentUser.reload(); // ✅ Refresh user data
//           const refreshedUser = auth.currentUser;
//           setUser(refreshedUser);

//           await axios.post(
//             `http://localhost:9000/auth/jwt`,
//             { email: refreshedUser.email },
//             { withCredentials: true }
//           );
//         } else {
//           setUser(null);
//           await axios.get(`http://localhost:9000/auth/logout`, {
//             withCredentials: true,
//           });
//         }
//       } catch (error) {
//         console.error("Auth state error:", error);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);
//   console.log("current user", user);
//   const authInfo = {
//     user,
//     setUser,
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     logOut,
//     updateUserProfile, // ✅ Updated version included
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// ...same imports as before

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      setUser({
        name,
        email: auth.currentUser.email,
        uid: auth.currentUser.uid,
        imageUrl: photo,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser?.email) {
          await currentUser.reload();
          const refreshedUser = auth.currentUser;

          setUser({
            name: refreshedUser.displayName || "",
            email: refreshedUser.email,
            uid: refreshedUser.uid,
            imageUrl: refreshedUser.photoURL || "",
          });

          await axios.post(
            `http://localhost:9000/auth/jwt`,
            { email: refreshedUser.email },
            { withCredentials: true }
          );
        } else {
          setUser(null);
          await axios.get(`http://localhost:9000/auth/logout`, {
            withCredentials: true,
          });
        }
      } catch (error) {
        console.error("Auth state error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  console.log("curerent", user);

 
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
