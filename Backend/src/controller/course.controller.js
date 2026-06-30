import { populate } from "dotenv";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/ayncHandler.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Course } from "../model/course.model.js";
import { User } from "../model/user.model.js";


const createCourse = asyncHandler(async (req , res) => {
    const {title , category} = req.body;

    if(!title || !category){
        throw new ApiError(400 , "All fields are required");
    }

    const course = await Course.create({
        title,
        category,
        creator : req.userId
    })
    return res.status(200).json(
        new ApiResponse(200 , course , "Course created successfully")
    )
})

const getPublishedCourses = asyncHandler(async (req , res) => {
    const courses = await Course.find({isPublished : true}).populate("reviews")
    if(!courses){
        return res.status(200).json(
            new ApiResponse(200 , {} , "No Published course found")
        )
    }

    return res.status(200).json(
        new ApiResponse(200 , courses , "Puslished courses found successfully")
    )
})

const getPublishedCoursebyId = asyncHandler(async (req, res) => {

    const { courseId } = req.params;


    const course = await Course.findOne({
        _id: courseId,
        isPublished:true
       
    })
    .populate("lectures")
    .populate("creator")
    .populate("reviews")


    if(!course){
        throw new ApiError(404, "Published course not found");
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            course,
            "Published course fetched successfully"
        )
    );

});


const getCreatedCourses = asyncHandler(async (req , res ) => {
    const userId = req.userId;
    const courses = await Course.find({creator : userId})
    if(!courses){
        return res.status(200).json(
            new ApiResponse(200 , {} , "No course created")
        )
    }

    return res.status(200).json(
        new ApiResponse(200 , courses , "Created course found successfully")
    )
})

const editCourse  = asyncHandler(async (req , res) => {
    const {courseId} = req.params;

    const {title , subtitle , description , category , level , price , isPublished} = req.body;

    const updateData = {
        title ,
        subtitle,
        description,
        category,
        level,
        price,
        isPublished
    }

    if(req.file){
        const uploadedThumbnail = await uploadOnCloudinary(req.file.path)
        updateData.thumbnail = uploadedThumbnail
    }

    const course = await Course.findByIdAndUpdate(courseId , updateData , {new : true} )

    if(!course){
        throw new ApiError(400 , "Failed to edit course")
    }

    return res.status(200).json(
        new ApiResponse(200 , course , "Course updated successfully")
    )

})

const getCourseById = asyncHandler(async (req , res) => {
    
    const {courseId} = req.params;
    
    const course = await Course.findById(courseId)

    if(!course){
        throw new ApiError(400 , "No course found")
    }

    return res.status(200).json(
        new ApiResponse(200 , course , "course get successfully" )
    )
})

const removeCourse = asyncHandler(async (req , res) => {
    
    const {courseId} = req.params;

    let course = await Course.findById(courseId)
    if(!course){
        throw new ApiError(400 , "Course not found")
    }
    course = await Course.findByIdAndDelete(courseId , {new: true})

    return res.status(200).json(
        new ApiResponse(200 , {} , "Course removed successfully")
    )


})

const getCreatorCourse = asyncHandler(async (req , res) => {
    const {userId} = req.body

    const creatorCourses = await Course.find({creator : userId , isPublished : true}).populate('reviews')

    if(!creatorCourses){
        throw new ApiError(404 , "No courses found")
    }

    return res.status(200).json(
        new ApiResponse(200 , creatorCourses , "user get successfully")
    )

})



export {
    createCourse,
    getPublishedCourses,
    getCreatedCourses,
    editCourse,
    getCourseById,
    removeCourse,
    getCreatorCourse,
   getPublishedCoursebyId

}