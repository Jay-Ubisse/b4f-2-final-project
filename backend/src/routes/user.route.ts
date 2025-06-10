import Express from 'express'
import { register } from '../controllers/auth.controller.ts'
import { getDetails } from '../controllers/user.controller.ts'

export const router = Express.Router()

/*router.get("/details/:id", getDetails);8*/
router.post('/', register)
router.get('/',getDetails)
