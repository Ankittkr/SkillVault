import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/user/userSlice.js"
import courseReducer from '../features/course/courseSlice.js'
import lectureReducer from "../features/lecture/lectureSlice.js"
import reviewReducer from "../features/review/reviewSlice.js"
export const store = configureStore({
    reducer : {
        user : userReducer,
        course : courseReducer ,
        lecture : lectureReducer,
        review : reviewReducer,
    },
})