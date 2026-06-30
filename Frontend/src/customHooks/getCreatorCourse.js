import { useEffect } from "react"
import api from "../utils/axios"
import { useDispatch, useSelector } from "react-redux"
import { setCreatorCourseData } from "../features/course/courseSlice"

const getCreatorCourse = () => {
    const dispatch = useDispatch()
    return (
        useEffect(() => {
            const creatorCourse = async () => {
                try {
                    const res = await api.get('/course/getcreatedcourses');
                    console.log(res);
                    dispatch(setCreatorCourseData(res.data.data))
                } catch (error) {
                    console.log(error);
                    
                }
            }
            creatorCourse()
        }, [])
    )
}

export default getCreatorCourse