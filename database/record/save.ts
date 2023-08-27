type returnType = 'success' | 'failed' | 'not-found';

import express, { Router, Request, Response } from 'express'

const router : Router = express.Router()

import { saveRecordData } from '../dataCenter'

const recordHandler =async (req : Request, res : Response) : Promise<void> => {
    if(req.body) {
        const {userId, data} = req.body
        try {
            const recordData = await saveRecordData(userId, data)
            if(recordData!=undefined) {
                const result : returnType = 'success'
                res.status(200).json(
                    {
                        result,
                        code: 200,
                        message: '데이터베이스에 저장되었습니다.'
                    }
                )
                console.log('기록 데이터 저장 처리 결과: ', result)
            }
            else {
                const result : returnType = 'failed'
                res.status(404).json(
                    {
                        result,
                        code: 404,
                        message: '데이터베이스 저장 실패'
                    }
                )
                console.log('기록 데이터 저장 처리 결과: ', result)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    else {
        const result : returnType = 'not-found'
        res.status(404).json(
            {
                result,
                code: 404,
                message: '기록 데이터가 없습니다.'
            }
        )
        console.log('기록 데이터 저장 처리 결과: ', result)
    }
}

router.post('/', recordHandler)

module.exports = router