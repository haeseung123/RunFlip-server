import express, { Router } from 'express'
import cors from 'cors'

const router : Router = express.Router()
const loginCorsOptions : cors.CorsOptions = {
    origin: '*',
    methods: 'POST',
    optionsSuccessStatus: 200
}

router.use(cors(loginCorsOptions))
router.use('/save', require('./save'))
router.use('/delete', require('./delete'))

module.exports = router