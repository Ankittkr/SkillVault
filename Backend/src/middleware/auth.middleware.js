import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/ayncHandler.js";
import jwt from "jsonwebtoken"
const verifyJWT = asyncHandler(async (req, _, next) => {

    try {

        const token = req.cookies?.token 
            
        if (!token) {
            throw new ApiError(401, "Access denied. Unauthorized access No token provided.")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SCRET)

        if (!decodedToken) {
            throw ApiError(401, "Invalid  token")
        }

        req.userId = decodedToken?._id
        next()

    } catch (error) {
        throw new ApiError(401 , error?.message || "invalid access token")
    }

})
export default verifyJWT