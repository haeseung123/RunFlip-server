import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app: Express = express()
const corsOptions: cors.CorsOptions = {
    origin: 'https://adminpage.com',
    methods: 'GET,POST,PATCH,DELETE',
    optionsSuccessStatus: 200
}

app.disable('x-powered-by')

app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())


app.use('/user', require('./database/user'))
app.use('/record', require('./database/record'))
app.get('/' , (req: Request, res: Response) => {
    
    res.send('하이')
})

app.listen(3000, async function () {
    console.log(`
    ####오이시쿠 나래 오이시쿠 나래###########
    #######모에 모에#################큥!#########
    `)
})
