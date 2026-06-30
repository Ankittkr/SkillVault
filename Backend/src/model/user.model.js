import mongoose  from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    },
    role : {
        type : String,
        enum : ["student" , "educator"],
        required : true
    },
    photoUrl : {
        type : String,
        default : "",
    },
    enrolledCourses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
    ],

    resetOTP:{
        type:String
    },
    otpExpires:{
        type : Date
    },
    isOtpVerfied:{
        type:Boolean,
        default:false
    }


} , {timestamps : true})

userSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}





export const User = mongoose.model("User" , userSchema)