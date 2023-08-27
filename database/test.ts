import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

interface User {
    name: string;
    age: number;
    email: string;
}
async function addUser(user: User): Promise<void> {
    try {
        const docRef = await addDoc(collection(db, 'users'), user);
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}

const newUser: User = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com'
};

// addUser(newUser)