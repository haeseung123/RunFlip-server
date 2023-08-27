type returnType = 'success' | 'failed' | 'not-found';

import express, { Router, Request, Response } from 'express'

const router : Router = express.Router()

import { User } from '../dataFactory'
import { getUserData } from '../dataCenter';

const loginHandler =async (req : Request, res : Response) : Promise<void> => {
    if(req.body) {
        const {inputId, inputPass} = req.body
        try {
            const data = await getUserData(inputId, inputPass)
            if(data!=undefined) {
                const userData : User = {
                    profile : data.profile
                }
                const result : returnType = 'success'
                res.status(200).json(
                    {
                        result,
                        userData,
                        code: 200,
                        message: '로그인에 성공 하셨습니다'
                    }
                )
                console.log('로그인 요청 처리 결과: ', result)
            }
            else {
                const result : returnType = 'failed'
                res.status(404).json(
                    {
                        result,
                        userData: {},
                        code: 404,
                        message: '아이디와 비밀번호가 일치하는지 한번 더 확인 해 주세요.'
                    }
                )
                console.log('로그인 요청 처리 결과: ', result)
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
                userData: {},
                code: 404,
                message: '아이디를 찾을 수 없습니다'
            }
        )
        console.log('로그인 요청 처리 결과: ', result)
    }
} 

router.post('/', loginHandler)

module.exports = router