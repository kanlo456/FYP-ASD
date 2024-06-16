import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpB1nF6-mhXXYdQ0c7jEtYTEqbmhdY93A",
  authDomain: "cu-fyp-asd.firebaseapp.com",
  databaseURL: "https://cu-fyp-asd-default-rtdb.firebaseio.com",
  projectId: "cu-fyp-asd",
  storageBucket: "cu-fyp-asd.appspot.com",
  messagingSenderId: "170804155242",
  appId: "1:170804155242:web:377803ca21e41349dd0b13",
  measurementId: "G-F3N2B2J3CN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

