import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    creatorCourseData: null,
    publishCourseData: null,

}

export const creatorCourseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCreatorCourseData: (state, action) => {
            state.creatorCourseData = action.payload
        },
        setPulishedCourseData: (state, action) => {
            state.publishCourseData = action.payload
        },

        addLectureToCourse: (state, action) => {

            const { courseId, lecture } = action.payload;


            const course = state.creatorCourseData.find(
                (course) => course._id === courseId
            );


            if (course) {

                course.lectures.push(lecture);

            }


        }

    }
})

export const { setCreatorCourseData } = creatorCourseSlice.actions
export const { setPulishedCourseData } = creatorCourseSlice.actions
export const { setSelectedCourseData ,  addLectureToCourse} = creatorCourseSlice.actions
export default creatorCourseSlice.reducer