import {
  AUTH_LOGGEDIN,
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
} from '../types/index';
import { firebase } from '../../firebase';
import { setToken } from '../../utils';
const auth = firebase.auth();
const firestore = firebase.firestore();

// Fn to authenticate user with email and password
export const authenticate = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN });
  try {
    const authenticate = await auth.signInWithEmailAndPassword(email, password);
    if (authenticate.user) {
      const token = await auth.currentUser.getIdToken();
      setToken(token);
      const user = await getUserDetails(authenticate.user.uid)();
      dispatch({
        type: AUTH_LOGGEDIN,
        payload: user,
      });
    }
  } catch (e) {
    if (e.message) dispatch({ type: AUTH_LOGIN_ERROR, payload: e.message });
  }
};

// Fn to signout current logged in firebase user
export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: AUTH_LOGOUT });
  localStorage.removeItem('FBIdToken');
};

// Fn to set auth credentials to redux store
export const setAuth = (user) => async (dispatch) => {
  dispatch({
    type: AUTH_LOGGEDIN,
    payload: user,
  });
};

// Fn to fetch userDetails with current logged in user uid
export const getUserDetails = (uid) => () => {
  return new Promise(async (resolve) => {
    const userSnapShot = await firestore.collection('users').doc(uid).get();
    resolve(userSnapShot.data());
  });
};
