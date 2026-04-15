import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCir1zpRr0jzy7R7LMtjkAqxYNCIeU9koc',
  authDomain: 'zacuaeats.firebaseapp.com',
  projectId: 'zacuaeats',
  storageBucket: 'zacuaeats.firebasestorage.app',
  messagingSenderId: '1071975306392',
  appId: '1:1071975306392:web:99ed0587bbd63c464baced',
  measurementId: 'G-DBY72SN17F',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

export { app, auth };
export default app;