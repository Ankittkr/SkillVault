import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoPlayCircle, IoArrowBack, IoCheckmarkCircle } from "react-icons/io5";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import { useSelector } from "react-redux";
import { PageLoader } from "../components/PageLoader";


export  const ViewLectures = () => {

    const { courseId } = useParams();
    const navigate = useNavigate()
    const [course, setCourse] = useState({});
    const [activeLecture, setActiveLecture] = useState([]);
    const [pageLoading , setPageLoading] = useState(false)

    useEffect(() => {

        const getCourse = async () => {

            try {
                setPageLoading(true)
                const res = await api.get(
                    `/course/getwatchcourselecture/${courseId}`
                );

                setCourse(res.data.data);

                setActiveLecture(
                    res.data.data.lectures[0]
                );


            } catch (error) {
                console.log(error);
            }
            finally{
                setPageLoading(false)
            }

        };


        getCourse();


    }, [courseId]);




    const changeLecture = (lecture) => {
        setActiveLecture(lecture);
    };

if(pageLoading){
    return <PageLoader/>
}

    return (

        <div className="min-h-screen bg-gray-50">

            <Navbar/>


            <div className="
            max-w-7xl
            mx-auto
            px-6
            py-8
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
            ">



                {/* LEFT VIDEO SECTION */}


                <div className="
                lg:col-span-2
                bg-white
                rounded-2xl
                shadow
                p-6
                ">


                    <div className="
                    flex
                    items-center
                    gap-3
                    mb-4
                    ">


                        <IoArrowBack className="cursor-pointer" onClick={()=>navigate(-1)} size={25}/>


                        <div>

                        <h1 className="
                        text-3xl
                        font-bold
                        ">
                            {course.title}
                        </h1>


                        <p className="
                        text-gray-500
                        text-sm
                        mt-1
                        ">

                        Category: {course.category}
                        &nbsp; • &nbsp;
                        Level: {course.level}

                        </p>

                        </div>


                    </div>




                    {/* VIDEO */}


                    <div className="
                    rounded-xl
                    overflow-hidden
                    bg-black
                    aspect-video
                    ">


                    {
                        activeLecture?.videoUrl ?


                        <video

                        src={activeLecture.videoUrl}

                        controls

                        controlsList="nodownload"

                        className="
                        w-full
                        h-full
                        object-contain
                        "

                        />


                        :


                        <div className="
                        text-white
                        flex
                        items-center
                        justify-center
                        h-full
                        ">
                            Select lecture
                        </div>

                    }


                    </div>





                    <h2 className="
                    text-2xl
                    font-bold
                    mt-5
                    ">

                    {activeLecture?.lectureTitle}

                    </h2>




                    <div className="
                    mt-5
                    border-b
                    pb-5
                    flex
                    justify-between
                    items-center
                    ">


                    <div>

                    <h3 className="
                    font-semibold
                    ">
                    About this lecture
                    </h3>


                    <p className="
                    text-gray-500
                    mt-2
                    ">
                    This is a course lecture.
                    </p>


                    </div>



                    <button className="
                    flex
                    gap-2
                    items-center
                    border
                    px-5
                    py-3
                    rounded-lg
                    ">

                    <IoCheckmarkCircle/>

                    Mark as complete

                    </button>



                    </div>





                    {/* NAV BUTTONS */}


                    <div className="
                    flex
                    justify-between
                    mt-6
                    ">


                    <button className="
                    border
                    px-5
                    py-3
                    rounded-lg
                    ">

                    ← Previous Lecture

                    </button>




                    <button className="
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    ">

                    Next Lecture →

                    </button>


                    </div>



                </div>







                {/* RIGHT SIDEBAR */}


                <div className="
                bg-white
                rounded-2xl
                shadow
                p-6
                h-fit
                ">


                <h2 className="
                text-2xl
                font-bold
                mb-5
                ">

                All Lectures

                </h2>





                {
                    course.lectures?.map((lecture)=>(


                    <div

                    key={lecture._id}


                    onClick={()=>changeLecture(lecture)}


                    className={`

                    flex
                    justify-between
                    items-center
                    p-4
                    rounded-xl
                    border
                    mb-3
                    cursor-pointer

                    ${
                    activeLecture?._id === lecture._id
                    ?
                    "bg-gray-200"
                    :
                    "hover:bg-gray-100"

                    }

                    `}


                    >


                    <span className="
                    font-medium
                    ">

                    {lecture.lectureTitle}

                    </span>


                    <IoPlayCircle size={25}/>


                    </div>


                    ))

                }





                <hr className="
                my-6
                "/>



                {/* INSTRUCTOR */}



                <h3 className="
                text-xl
                font-bold
                mb-4
                ">

                Instructor

                </h3>



                <div className="
                flex
                items-center
                gap-4
                ">


{
                        course?.creator?.photoUrl ? (

                                            <div className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition">
                                                <img
                                                    src={selectedCourse?.creator?.photoUrl}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                        ) : (

                                            <div className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition">
                                                <div className="w-full h-full rounded-full flex justify-center items-center font-bold bg-black text-white">
                                                    {course?.creator?.name[0].toUpperCase()}
                                                </div>
                                            </div>

                                        )
                    }
 



                <div>


                <p className="
                font-semibold
                ">

                {course.creator?.name}

                </p>


                <p className="
                text-gray-500
                text-sm
                ">

                {course.creator?.email}

                </p>


                </div>



                </div>



                </div>





            </div>


        </div>


    )
}


