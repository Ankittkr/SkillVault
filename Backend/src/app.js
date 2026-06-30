import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./route/auth.router.js"
import errorHandler from "./middleware/error.middleware.js"
import userRouter from "./route/user.router.js"
import courseRouter from "./route/course.router.js"
import paymentRouter from "./route/payment.route.js"
import reviewRouter from "./route/review.router.js"
import searchRouter from "./route/search.router.js"
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
})) 

app.use(express.json({limit : "16kb"}))  
app.use(express.urlencoded({extended:true , limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser()) 


app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/course" , courseRouter)
app.use("/api/v1/order" , paymentRouter)
app.use("/api/v1/review" , reviewRouter )
app.use("/api/v1/search" , searchRouter)
app.use(errorHandler)

export {app}