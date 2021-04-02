import { useState, useEffect } from 'react';

import { firebase } from '../firebase';
const auth = firebase.auth();
const firestore = firebase.firestore();

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authenticating user on componentDidMount and setting current user to local state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userSnapShot = await firestore
          .collection('users')
          .doc(user.uid)
          .get();
        setCurrentUser(userSnapShot.data());
      }

      setLoading(false);
    });
    // Unsubscribing from firebase auth on componentWillUnmount
    return unsubscribe;
  }, []);

  return {
    currentUser,
    loading,
  };
};

export default useAuth;
