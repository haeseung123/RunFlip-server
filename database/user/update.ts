type returnType = 'success' | 'failed' | 'not-found';

import express, { Router, Request, Response } from 'express'

const router : Router = express.Router()


import { updateUserData } from '../dataCenter';
import { DocumentReference } from '@firebase/firestore';

const updateHandler =async (req: Request, res : Response) : Promise<void> => {
    if(req.body) {
        try{
            // const {userId, ...profileData} = req.body
            const userId = req.body.userId
            const profileData = req.body

            console.log(userId)
            console.log(profileData)

            const updateDoc : DocumentReference | undefined = await updateUserData(userId, profileData)

            if(updateDoc) {
                const result : returnType = 'success'
                res.status(200).json(
                    {
                        result,
                        code: 200,
                        message: '프로필 업데이트에 성공했습니다.'
                    }
                )
                console.log('프로필 업데이트 처리 결과: ', result)
            }
            else {
                const result : returnType = 'failed'
                console.log('프로필 업데이트 처리 결과: ', result)
                throw new Error('데이터가 없습니다.')
            }
        }
        catch(e) {
            console.log(e)
        }
    }
    else {
        const result : returnType = 'not-found'
        res.status(404).json(
            {
                result,
                code: 404,
                message: '웅앵웅 초키포기'
            }
        )
    }
}

router.post('/', updateHandler)

module.exports = router