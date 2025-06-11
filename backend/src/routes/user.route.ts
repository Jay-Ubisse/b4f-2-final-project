import Express from 'express'
import { register, login } from '../controllers/auth.controller.ts'
import { getDetails } from '../controllers/user.controller.ts'


export const router = Express.Router()


router.post('/register', register)
router.post('/login', login)
router.get('/me',getDetails)