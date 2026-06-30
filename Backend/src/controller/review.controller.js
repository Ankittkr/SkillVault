import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/ayncHandler.js";
import { Course } from "../model/course.model.js";
import { Review } from "../model/review.model.js";


const createReview = asyncHandler(async (req , res) => {
    const userId = req.userId
    const {courseId} = req.params 
    const {rating , comment } = req.body
    
    if(!userId){
    throw new ApiError(401,"Login required")
}

    if(!rating || !comment){
        throw new ApiError(400,"Rating and comment required")
    }
    const course = await Course.findById(courseId)
    if(!course){
        throw new ApiError(404 , "Course Not found")
    }
    const alreadyReviewed = await Review.findOne({course : courseId , user : userId})
    if(alreadyReviewed){
        return res.status(400).json(
            new ApiResponse(400 , {} , "You have already reviewed this course")
        )
    }
    const review =  await Review.create({
        course : courseId,
        user : userId,
        rating,
        comment
    })

    course.reviews.push(review._id)
    await course.save()
    return res.status(201).json(
        new ApiResponse(200 , review , "Your review submitted successfully")
    )

    
})

const getReviews = asyncHandler(async (req , res) => {
    const reviews = await Review.find({})
    .populate('user' , "name photoUrl role")
    .populate('course' , "title")
    .sort({reviewAt : -1})
    .lean()


    if (!reviews || reviews.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, [], "No reviews found")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, reviews, "All reviews fetched successfully")
    );

})

export {
    createReview,
    getReviews
}