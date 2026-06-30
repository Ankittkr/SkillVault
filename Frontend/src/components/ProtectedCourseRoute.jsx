import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedCourseRoute = ({children}) => {


    const {courseId} = useParams();


    const userdata = useSelector(
        (state)=>state.user.userData
    );


    const loading = useSelector(
        (state)=>state.user.loading
    );



    // wait until user fetch completes
    if(loading){

        return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
        )

    }



    if(!userdata){
        return <Navigate to="/login"/>
    }



    const isEnrolled =
    userdata.enrolledCourses?.some((course)=> course._id == courseId);



    if(!isEnrolled){

        return (
            <Navigate 
            to={`/viewcourses/${courseId}`}
            />
        )

    }



    return children;

}


export default ProtectedCourseRoute;