import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from "./db/index.js";
import { app } from './app.js';

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("App error", error);
            throw error
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App listening at port ${process.env.PORT || 8000}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed , ERROR : ", err);
    })