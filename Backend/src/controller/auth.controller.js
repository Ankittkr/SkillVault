import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/ayncHandler.js";
import sendMail from "../config/sendMail.js";
import generateToken from "../config/token.js";
import { User } from "../model/user.model.js";



const signUp = asyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body

    if (
        [name, password, email, role].some((field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new ApiError(409, "User already exist")
    }

    if (password.length < 8) {
        throw new ApiError(400, "Enter a strong password")
    }

    const createdUser = await User.create({
        name,
        email,
        password,
        role
    })

    const user = await User.findById(createdUser._id)
        .select("-password");
    const token = generateToken(user._id)


    return res
        .status(201)
        .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json(
            new ApiResponse(200, user, "user created successfully")
        )

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User Not found")
    }

    const isValidPassword = await user.isCorrectPassword(password)

    if (!isValidPassword) {
        throw new ApiError(400, "Invalid user credentals")
    }
    const loggedInUser = await User.findById(user._id)
        .select("-password");
    const token = generateToken(user._id)

    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json(
            new ApiResponse(200,
                loggedInUser,
                "User logined in Successfully"

            ))

})

const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("token")
        .json(
            new ApiResponse(200, {}, "User logged  out")
        )
})

const sendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    user.resetOTP = otp
    user.otpExpires = Date.now() + 5 * 60 * 1000
    user.isOtpVerfied = false

    await user.save()
    console.log(otp);

    await sendMail(email, otp)
    return res.status(200).json(
        new ApiResponse(200, {}, "OTP send successfully")
    )
})

const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body
    const user = await User.findOne({ email })
    if (!user || user.resetOTP != otp || user.otpExpires < Date.now()) {
        throw new ApiError(404, "Invalid OTP")
    }

    user.resetOTP = undefined
    user.otpExpires = undefined
    user.isOtpVerfied = true

    await user.save()
    return res.status(200).json(
        new ApiResponse(200, {}, "OTP Verified successfully")
    )

})

const resetPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.isOtpVerfied) {
        throw new ApiError(404, "Invalid OTP")
    }

    user.password = password
    user.isOtpVerfied = false
    await user.save()
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "password changed successfully"))
})

const googleSignUp = asyncHandler(async (req, res) => {
        const { name, email, role } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name,
                email,
                role
            })
        }
        const token = generateToken(user._id)

        return res
            .status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json(
                new ApiResponse(200, user, "user created successfully")
            )

})

export {
    signUp,
    login,
    logout,
    sendOTP,
    verifyOTP,
    resetPassword,
    googleSignUp
}