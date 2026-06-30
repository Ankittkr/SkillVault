import mongoose from "mongoose"

export const connectDB = async()=>{
    console.log(process.env.MONGODB_URI);
    try {
       const connectInstance =  await  mongoose.connect(process.env.MONGODB_URI)
       
       console.log(`\n MongoDB connected !! DB HOST ${connectInstance.connection.host}` ,  );
    } catch (error) {
        console.log("MongoDB connection failed " , error);
        process.exit(1)
    }
}