import {Router} from 'express'
import verifyJWT from '../middleware/auth.middleware.js'
import { createReview, getReviews } from '../controller/review.controller.js'

const reviewRouter = Router()


reviewRouter.route('/createreview/:courseId').post(verifyJWT , createReview )
reviewRouter.route('/getreviews').get(getReviews)
export default reviewRouter
