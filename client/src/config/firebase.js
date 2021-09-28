// import core firebase client (required)
import firebase from "@firebase/app";

// import Firebase Authentication (optional)
import "@firebase/auth";

// import Firebase Realtime Database (optional)
import "@firebase/database";

// import Cloud Firestore (optional)
import "@firebase/firestore";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from "@firebase/app";

import secrets from "../../../secrets.json";

const firebaseConfig = {
    apiKey: secrets.apiKey,
    authDomain: secrets.authDomain,
    projectId: secrets.projectId,
    storageBucket: secrets.storageBucket,
    messagingSenderId: secrets.messagingSenderId,
    appId: secrets.appId,
    measurementId: secrets.measurementId,
};
const app = initializeApp(firebaseConfig);
// const db = getFirestore();

// eslint-disable-next-line import/no-anonymous-default-export
export default app;
