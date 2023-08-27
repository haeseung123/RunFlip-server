import express, { Router } from 'express'
import cors from 'cors'

const router : Router = express.Router()
const loginCorsOptions : cors.CorsOptions = {
    origin: '*',
    methods: 'POST',
    optionsSuccessStatus: 200
}

router.use(cors(loginCorsOptions))
router.use('/login', require('./login'))
router.use('/update', require('./update'))

module.exports = router