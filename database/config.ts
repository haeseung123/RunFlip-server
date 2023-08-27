import { FirebaseApp, initializeApp } from 'firebase/app'
import { FirebaseOptions } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig : FirebaseOptions = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
}

const app : FirebaseApp = initializeApp(firebaseConfig)

export const db : Firestore = getFirestore(app)