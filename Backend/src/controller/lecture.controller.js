import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/ayncHandler.js";
import { uploadVideoOnCloudinary } from "../config/cloudinary.js";
import { Course } from "../model/course.model.js";
import { Lecture } from "../model/lecture.model.js";
import { User } from "../model/user.model.js";

const createLecture = asyncHandler(async (req , res) => {
    const {lectureTitle} = req.body
    const {courseId} = req.params

    if(!lectureTitle || !courseId){
        throw new ApiError(400 , "LectureTitle is required")
    }
    const course = await Course.findById(courseId)
    if(!course){
        throw new ApiError(404 , " Course Not Found")
    }

    const lecture = await Lecture.create({lectureTitle})
    course.lectures.push(lecture._id)
    await course.save()

    await course.populate('lectures')

    return res.status(201).json(
        new ApiResponse(201 , {lecture , course} , "Lecture created successfully")
    )

})

const getCourseLecture = asyncHandler(async (req , res) => {
    const {courseId} = req.params;
    
    const course = await Course.findById(courseId).populate('lectures').populate('creator')
    if(!course){
        throw new ApiError(500 , "Course not found")
    }

    return res.status(200).json(
        new ApiResponse(200 , course , "Lectures get successfully")
    )
})

const editLecture  = asyncHandler(async (req , res) => {
    const {lectureId} = req.params;

    const {lectureTitle , isPreviewFree} = req.body;

    const updateData = {
        lectureTitle,
        isPreviewFree: isPreviewFree === true || isPreviewFree === "true",
    };

    if(req.file){
        const uploadLecture = await uploadVideoOnCloudinary(req.file.path);
        if(!uploadLecture){
            throw new ApiError(500, "Video upload failed. Please use MP4/WebM format under 100MB.");
        }
        updateData.videoUrl = uploadLecture;
    }

    const lecture = await Lecture.findByIdAndUpdate(lectureId , updateData , {new : true})

    if(!lecture){
        throw new ApiError(400 , "Failed to edit lecture")
    }

    return res.status(200).json(
        new ApiResponse(200 , lecture , "Lecture updated successfully")
    )

})

const removeLecture = asyncHandler(async (req , res) => {
    
    const {lectureId} = req.params;

    const deletedLecture = await Lecture.findByIdAndDelete(lectureId);
    if(!deletedLecture){
        throw new ApiError(404 , "Lecture not found")
    }

     await Course.findOneAndUpdate(
        { lectures: lectureId }, // Finds the course holding this exact lecture ID
        { $pull: { lectures: lectureId } }
    );

    return res.status(200).json(
        new ApiResponse(200 , {} , "Lecture removed successfully")
    )

})


const getWatchCourseLecture = asyncHandler(async (req,res)=>{

    const {courseId} = req.params;


    const user = await User.findById(req.userId);


    if(!user){
        throw new ApiError(404,"User not found")
    }



    const enrolled = user.enrolledCourses.includes(courseId);



    if(!enrolled){

        throw new ApiError(
            403,
            "You are not enrolled in this course"
        )

    }



    const course = await Course.findById(courseId)
    .populate({
        path:"lectures",
        select:"lectureTitle videoUrl"
    })
    .populate("creator")



    if(!course){

        throw new ApiError(
            404,
            "Course not found"
        )

    }



    return res.status(200).json(

        new ApiResponse(
            200,
            course,
            "Course lectures fetched successfully"
        )

    )


})

export {
    createLecture,
    getCourseLecture,
    editLecture,
    removeLecture,
    getWatchCourseLecture,
}