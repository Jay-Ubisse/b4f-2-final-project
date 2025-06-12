
import Express from 'express'

import { register } from '../controllers/user.controller.ts'
import { getMe } from '../controllers/user.controller.ts'
import { authentionToken } from '../middleware/auth.Middleware.ts'
export const router = Express.Router()
router.post('/register', register)
router.get('/me',authentionToken,getMe)

