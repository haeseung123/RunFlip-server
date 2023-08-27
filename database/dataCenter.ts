type returnType = 'success' | 'failed' | 'not-found';

import { db } from "./config";
import { collection, addDoc, DocumentData, CollectionReference, DocumentReference, doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";

import { RunningData } from "./dataFactory";

export async function getUserData(userId : string | undefined, userPass : string) : Promise<DocumentData | undefined> {
    if(userId !== undefined) {
        const col : CollectionReference = collection(db, 'User')
        const userDoc : DocumentReference = doc(col, userId)
        const userData : DocumentSnapshot = await getDoc(userDoc)
        const data : DocumentData | undefined = userData.data()

        // console.log(data)

        if(data) {
            if(data.password === userPass) return data
            else return undefined
        }
        else return undefined

    }
    else {
        const err : Error = new Error('유저 아이디 변수에 값이 할당되지 않음')
        throw err
    }
}

import { updateDoc } from "firebase/firestore";

/**
 * 유저 프로필 정보 업데이트
 * @param userId 
 * @param nickName 
 * @param phone 
 * @param email 
 */

export async function updateUserData(userId : string | undefined, profileData : JSON) : Promise<DocumentReference|undefined>  {
    const col : CollectionReference = collection(db, 'User')
    const userDoc : DocumentReference = doc(col, userId)

    try {
        await updateDoc(userDoc, {
            profile: JSON.stringify(profileData)
        })
        console.log('업데이트된 profileData', profileData)
        return userDoc
    } catch (err) {
        console.log(err)
    }
}

export async function saveRecordData(userId : string, data : RunningData) {
    const date = new Date()
    const currentDate = data.endTime
    
    const userRecordCollection : CollectionReference = collection(doc(db, 'Records', userId), 'DataByDate')
    
    try {
        // 현재 날짜의 서브컬렉션에 데이터 저장
        await addDoc(userRecordCollection, {
            date: currentDate,
            data: JSON.stringify(data)
        })
        return userRecordCollection
    } catch (err) {
        console.log(err)
    }
    
}

import { query, where, deleteDoc, getDocs } from "firebase/firestore";

export async function deleteRecordData(userId : string, targetDate : string) {
    console.log('여기는 데이터센터',userId, targetDate)

    const userRecordCollection : CollectionReference = collection(doc(db, 'Records', userId), 'DataByDate')
    const q = query(userRecordCollection, where('date', '==', targetDate))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((docSnapshot) => {
        deleteDoc(doc(userRecordCollection, docSnapshot.id));
    })


}