import razorpay from 'razorpay'
import { asyncHandler } from '../../utils/ayncHandler.js'
import { Course } from '../model/course.model.js'
import { ApiResponse } from '../../utils/ApiResponse.js'
import Razorpay from 'razorpay'
import { ApiError } from '../../utils/ApiError.js'
import { User } from '../model/user.model.js'


const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

export const RazorpayOrder = asyncHandler(async (req, res) => {
    const {courseId} = req.body
    
    const course = await Course.findById(courseId)

    if(!course){
        return res.status(404).json(
            new ApiResponse(404 , {} , "Course Not Found")
        )
    }

    const options = {
        amount : course.price * 100,  // amount in paisa
        currency : "INR",
        receipt : `${courseId}`
    }

    const order = await razorpayInstance.orders.create(options)
    return  res.status(200).json(order)

})

export const verifyPayment = asyncHandler(async (req , res) => {
    const {courseId , userId , razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
        let user = await User.findById(userId)
        if(!user.enrolledCourses.includes(courseId)){
            await user.enrolledCourses.push(courseId)
            await user.save()
        }
        const course = await Course.findById(courseId).populate('lectures')
        if(!course.enrolledStudent.includes(userId)){
            await course.enrolledStudent.push(userId)
            await course.save()
        }

        user = await User.findById(userId)
        .populate("enrolledCourses")

        return res.status(200).json(
            new ApiResponse(200 , user , "Payment verfied and enrollment successfull")
        )
    }
    else{
        throw new ApiError(400 , "Payment failed")
    }
})
