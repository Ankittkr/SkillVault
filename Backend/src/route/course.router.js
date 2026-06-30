import { Router } from "express";
import verifyJWT from '../middleware/auth.middleware.js'
import { createCourse, editCourse, getCourseById, getCreatedCourses, getCreatorCourse, getPublishedCoursebyId, getPublishedCourses, removeCourse } from "../controller/course.controller.js";
import { upload, uploadVideoMiddleware } from "../middleware/multer.middleware.js";
import { createLecture, editLecture, getCourseLecture, getWatchCourseLecture, removeLecture } from "../controller/lecture.controller.js";


const courseRouter  = Router()


courseRouter.route('/createcourse').post(verifyJWT , createCourse)
courseRouter.route('/getpublishedcourses').get(getPublishedCourses)
courseRouter.route('/getcreatedcourses').get( verifyJWT,getCreatedCourses)
courseRouter.route('/editcourse/:courseId').patch( verifyJWT ,upload.single('thumbnail'),editCourse)
courseRouter.route('/getcoursebyid/:courseId').get(verifyJWT , getCourseById)
courseRouter.route('/removecourse/:courseId').delete(verifyJWT , removeCourse)
courseRouter.route('/getpublishedcoursebyId/:courseId').get(getPublishedCoursebyId)

courseRouter.route('/createlecture/:courseId').post(verifyJWT , createLecture)
courseRouter.route('/getcourselecture/:courseId').get(verifyJWT , getCourseLecture)
courseRouter.route('/editlecture/:lectureId').patch(verifyJWT , uploadVideoMiddleware , editLecture)
courseRouter.route('/removelecture/:lectureId').delete(verifyJWT , removeLecture )

courseRouter.route('/getcreatorcourse').post( getCreatorCourse )
courseRouter.route('/getwatchcourselecture/:courseId').get(verifyJWT , getWatchCourseLecture )

export default courseRouter



