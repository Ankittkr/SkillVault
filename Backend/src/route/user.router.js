import {Router} from 'express'
import verifyJWT from '../middleware/auth.middleware.js'
import { getCurrentUser, updateProfile } from '../controller/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'

const userRouter = Router()


userRouter.route('/getcurrentuser').get(verifyJWT , getCurrentUser)
userRouter.route('/updateprofile').patch(verifyJWT , upload.single('photoUrl') , updateProfile)

export default userRouter