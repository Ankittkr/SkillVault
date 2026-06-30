import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   reviewData : [],
   reviewLoading : true
}

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviewData: (state, action) => {
            state.reviewData = action.payload
        },
        setReviewLoading : (state , action)=>{
            state.reviewLoading = action.payload
        }

    }
})

export const { setReviewData , setReviewLoading } = reviewSlice.actions
export default reviewSlice.reducer