import { useDispatch } from "react-redux"
import api from "../utils/axios"
import { setLoading, setUserData } from "../features/user/userSlice"
import {  useEffect } from "react"

const getCurrentUser = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const res = await api.get("/user/getcurrentuser" , {withCredentials : true})
                dispatch(setUserData(res.data.data))
                
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null))
                
            }
            finally{
                dispatch(
                    setLoading(false)
                )
            }
        }
        fetchUser()
    } , [])
}

export default getCurrentUser