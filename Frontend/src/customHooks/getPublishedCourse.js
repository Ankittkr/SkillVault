import { useEffect } from "react"
import api from "../utils/axios"
import { useDispatch } from "react-redux"
import {  setPulishedCourseData } from "../features/course/courseSlice"

const getPublishedCourse = ()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        const getCourseData = async () => {
            try {
                const res = await api.get('/course/getpublishedcourses') 
                console.log(res.data.data);
                
                dispatch(setPulishedCourseData(res.data.data))
                console.log(res.data.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        getCourseData()
    } , [dispatch])
}

export default getPublishedCourse