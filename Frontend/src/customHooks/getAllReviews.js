import React from 'react'
import { useEffect } from 'react'
import api from '../utils/axios'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../features/review/reviewSlice'

export const getAllReviews = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const allReviewa = async () => {
            try {
                const res  = await api.get('/review/getreviews')
                console.log(res.data.data);
                
                dispatch(setReviewData(res.data.data))

            } catch (error) {
                console.log(error);
            }
        }
        allReviewa()
    } , [])
}
