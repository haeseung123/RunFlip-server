type returnType = 'success' | 'failed' | 'not-found';

import express, { Router, Request, Response } from 'express'

const router : Router = express.Router()

import { deleteRecordData } from '../dataCenter';

const deleteHandler = async (req : Request, res : Response) : Promise<void> => {
    if(req.body) {
        const {userId, data} = req.body
        const targetDate = data.endTime
        try {
            deleteRecordData(userId, targetDate)
            .then(() => {
                const result : returnType = 'success'
                res.status(200).json(
                    {
                        result,
                        code: 200,
                        message: '데이터베이스 삭제 성공'
                    }
                )
                console.log('데이터 삭제 처리 결과: ', result)
            })
            .catch((err) => {
                const result : returnType = 'failed'
                res.status(404).json(
                    {
                        result,
                        code: 404,
                        message: '데이터베이스 삭제 실패'
                    }
                )
                console.log(err, '데이터 삭제 처리 결과: ', result)
            })

        }
        catch (e) {
            console.log(e)
        }
    }
    else {
        const result : returnType = 'not-found'
        res.status(404).json({
            result,
            code: 404,
            message: '삭제할 데이터가 없습니다.'
        })
        console.log('데이터 삭제 처리 결과: ', result)

    }
    

}

router.post('/', deleteHandler)
module.exports = router