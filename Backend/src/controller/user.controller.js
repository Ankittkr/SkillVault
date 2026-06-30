import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/ayncHandler.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { User } from "../model/user.model.js";

export const getCurrentUser = asyncHandler(async (req , res) => {
    
    const user = await User.findById(req.userId).select("-password").populate('enrolledCourses');

    if(!user){
        throw new ApiError( 404 , "User Not Found")
    }

    return res.status(200).json(
        new ApiResponse(200 , user , "User found successfully")
    )

})

export const updateProfile = asyncHandler(async (req , res) => {
    const userId = req.userId;
    const {description , name} = req.body;

    const updateData = {
        name,
        description,
    };
    if(req.file){
        const uploadedPhoto  = await uploadOnCloudinary(req.file.path)
        updateData.photoUrl = uploadedPhoto
    }
    const user = await User.findByIdAndUpdate(userId , updateData, {new : true}).select("-password");

    if(!user){
        throw new ApiError(404 , "User not found");
    }
    return res.status(200).json(
        new ApiResponse(200 , user , "Profile updated successfully")
    )

})

