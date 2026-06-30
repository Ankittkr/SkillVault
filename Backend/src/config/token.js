import jwt from "jsonwebtoken"

const generateToken =  (userId) => {
    try {
        return jwt.sign(
            {
                _id: userId,
            },
            process.env.JWT_SCRET,
            {
                expiresIn: "7d"
            }
        )
    } catch (error) {
        console.log(error);
        
    }
}
export default generateToken