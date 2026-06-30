import React, { useEffect, useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";

import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";

import {
    IoStar,
    IoStarHalf,
    IoPlayCircle,
    IoTimeOutline,
    IoBookOutline,
    IoCheckmarkCircle,
} from "react-icons/io5";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserData } from "../features/user/userSlice";
import { ClipLoader } from "react-spinners";
import { LuShieldAlert } from "react-icons/lu";
const ViewCourses = () => {
    const { courseId } = useParams();
    const userdata = useSelector((state) => state.user.userData)
    const [selectedCourse, setSelectedCourse] = useState({});
    const [pageLoading, setPageLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false)
    const [openLecture, setOpenLecture] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const [creatorCourse, setcreatorCourse] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [verifyLoading , setVerifyLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const calAvgRating = (reviews) => {
        if (!reviews || reviews?.length === 0) return 0

        const total = reviews.reduce((sum, review) => sum + review.rating, 0)
        return (total / reviews.length).toFixed(1)
    }
    const avgRating = calAvgRating(selectedCourse?.reviews)
    const checkEnrollement = () => {
        const verify = userdata?.enrolledCourses.some((course) => course._id == courseId)
        console.log(userdata);
        setIsEnrolled(verify);
    }
    useEffect(() => {
        if (userdata && courseId) {
            checkEnrollement()
        }
    }, [courseId, userdata])
    useEffect(() => {
        const getCourse = async () => {
            try {
                setPageLoading(true);

                const res = await api.get(`/course/getpublishedcoursebyId/${courseId}`);
                const result = await api.post(`/course/getcreatorcourse`, { userId: res.data.data.creator })
                console.log(res.data.data);
                console.log(result.data.data);

                setcreatorCourse(result.data.data)
                setSelectedCourse(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setPageLoading(false);
            }
        };

        if (courseId) {
            getCourse();
        }
    }, [courseId]);

    const randomCourses = useMemo(() => {
        return [...creatorCourse].sort(() => 0.5 - Math.random()).slice(0, 3);
    }, [creatorCourse]);

    const verifyPayment = async (paymentDetails) => {
        try {
            console.log(paymentDetails);

            const res = await api.post('/order/verify-payment', { ...paymentDetails })
            setVerifyLoading(true)
            setIsEnrolled(true)
            console.log(res.data.data);

            dispatch(setUserData(res.data.data))
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        finally{
            setVerifyLoading(false)
        }
    }

    const handleEnroll = async (userId, courseId) => {
        if (!userId) {
            toast.error('Login to Enroll in a course')
            navigate('/login')
            return
        }
        try {
            const orderData = await api.post('/order/razorpay-order', { userId, courseId })
            console.log(orderData);
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.data.amount,
                currency: orderData.data.currency,
                name: "Skill Vault",
                description: "COURSE ENROLLMENT PAYMENT",
                order_id: orderData.data.id,
                handler: async (res) => {
                    console.log(res);
                    verifyPayment({ userId, courseId, ...res })
                }
            }
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while enrolling.")
        }
    }

    const handleReview = async (e) => {
        e.preventDefault();

        if (!userdata) {
            toast.error("Please login to submit review");
            navigate("/login");
            return;
        }
        if (rating === 0) {
            toast.error("Please select a star rating.")
            return;
        }

        try {
            setReviewLoading(true)
            const res = await api.post(`/review/createreview/${courseId}`, {
                rating,
                comment
            });

            toast.success(res.data.message)
        } catch (err) {
            console.error("Error submitting review:", err);
            toast.error(err.response.data.message)
        }
        finally {
            setComment("")
            setRating(0);
            setReviewLoading(false)
        }
    }

    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div
                className=" max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 "
            >
                {/* LEFT SECTION */}
                <div className="lg:col-span-2
order-2
lg:order-1">

                    <h1
                        className=" text-5xl flex items-center font-bold text-gray-900 leading-tight"
                    >
                        {selectedCourse.title}
                    </h1>
                    <h3 className="text-xl font-semibold text-gray-600 leading-tight">
                        {selectedCourse.subtitle}
                    </h3>
                    <p
                        className=" mt-5 text-lg text-gray-600 leading-relaxed"
                    >
                        {selectedCourse.description}
                    </p>

                    <div
                        className=" flex items-center gap-5 mt-6 "
                    >
                        <div
                            className=" flex text-yellow-500 "
                        >
                            {
                                [1, 2, 3, 4, 5].map((star) => {

                                    if (star <= Math.floor(avgRating)) {
                                        return <IoStar key={star} />
                                    }

                                    if (star - avgRating < 1) {
                                        return <IoStarHalf key={star} />
                                    }

                                    return <IoStar key={star} className="text-gray-300" />
                                })
                            }
                        </div>

                        <span className="font-semibold">{avgRating}</span>

                        <span className="text-gray-500">{`${selectedCourse?.reviews?.length} Reviews`}</span>
                    </div>

                    <p className="mt-5">
                        Course by
                        <span
                            className=" text-blue-600 underline ml-1 "
                        >
                            {selectedCourse?.creator?.name}
                        </span>
                    </p>

                    {/* CURRICULUM */}

                    <div className="mt-12">
                        <h2
                            className=" text-2xl font-bold mb-6"
                        >
                            Course Structure
                        </h2>

                        {selectedCourse.lectures?.map((lecture, index) => (
                            <div
                                key={lecture._id}
                                className=" border bg-white rounded-xl mb-4 overflow-hidden "
                            >
                                <div

                                    onClick={() =>
                                        (lecture.isPreviewFree || isEnrolled) && setOpenLecture(openLecture === index ? null : index)
                                    }
                                    disabled={!(lecture.isPreviewFree || isEnrolled)}

                                    className={`flex justify-between items-center p-5  ${(lecture.isPreviewFree || isEnrolled) ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    <div
                                        className=" flex items-center gap-3 "
                                    >
                                        {(lecture.isPreviewFree || isEnrolled) ? <IoPlayCircle size={25} /> : <FaLock />}

                                        <span className="font-semibold">
                                            {lecture.lectureTitle}
                                        </span>
                                    </div>

                                    <span className="text-gray-500">Lecture</span>
                                </div>

                                {(lecture.isPreviewFree || isEnrolled)  && openLecture === index && (
                                    <div
                                        className=" px-5 pb-5 text-gray-600 "
                                    >
                                        {lecture.videoUrl ? (
                                            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow-inner">
                                                <video
                                                    src={lecture.videoUrl}
                                                    controls
                                                    controlsList="nodownload"
                                                    className="w-full h-full object-contain"
                                                    poster={selectedCourse.thumbnail}
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">
                                                No preview video available for this lecture.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* DESCRIPTION */}

                    <div className="mt-12">
                        <h2
                            className=" text-2xl font-bold "
                        >
                            Course Description
                        </h2>

                        <p
                            className=" mt-4 text-gray-600 leading-relaxed "
                        >
                            {selectedCourse.description}
                        </p>
                    </div>

                    {/* Reviews */}
                    <div className="mt-10 p-6 bg-white rounded-b  border-black border-t-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            write your review
                        </h3>
                        <p className="text-sm text-gray-500 mb-5">
                            Your feedback helps other students make informed learning decisions.
                        </p>

                        <form
                            onSubmit={handleReview}
                            className="space-y-5"
                        >
                            {/* Star Rating Input Field */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    Your Rating
                                </label>

                                <div className="flex flex-row items-center justify-start gap-1 clear-both whitespace-nowrap">
                                    <Rating
                                        initialValue={rating}
                                        onClick={(newRating) => setRating(newRating)}
                                        size={28}
                                        allowFraction={true}
                                        transition={true}
                                        fillColor="#eab308"
                                        emptyColor="#e5e7eb"
                                        /* FORCE INLINE DISPLAY VIA STYLE INJECTIONS */
                                        SVGstyle={{ display: 'inline' }}
                                        style={{ display: 'flex', flexDirection: 'row' }}
                                    />
                                </div>
                            </div>

                            {/* Text Input Field */}
                            <div>
                                <label
                                    htmlFor="reviewComment"
                                    className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2"
                                >
                                    Review Details
                                </label>
                                <textarea
                                    id="reviewComment"
                                    name="reviewComment"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    rows="4"
                                    required
                                    placeholder="What did you like or dislike? How can the instructor improve this course content structure?"
                                    className="w-full text-sm p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-400 resize-none"
                                ></textarea>
                            </div>

                            {userdata ? (
                                <button
                                    type="submit"
                                    disabled={reviewLoading}
                                    className="px-6 py-3 bg-black text-white rounded-xl text-sm font-bold tracking-wide hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
                                >
                                    {reviewLoading ? <ClipLoader size={30} color="white" /> : "Submit Review"}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-black text-white rounded-xl text-sm font-bold tracking-wide hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={() => navigate("/login")}>
                                    Login to write review
                                </button>
                            )}

                        </form>
                    </div>

                    {/* OTHER COURSES BY EDUCATOR */}
                    <div className="mt-16">

                        <h2 className="
                    text-3xl
                    font-bold
                    mb-6
                    ">

                            Other Courses By This Educator

                        </h2>
                        {/* EDUCATOR PROFILE */}

                        <div className="
                    flex
                    items-center
                    gap-4
                    mt-6
                    pb-6
                    
                    ">


                            {
                                selectedCourse?.creator?.photoUrl ? (

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
                                            {selectedCourse?.creator?.name[0].toUpperCase()}
                                        </div>
                                    </div>

                                )
                            }




                            <div>


                                <p className="
                    text-sm
                    text-gray-500
                    ">

                                    Created By

                                </p>



                                <h3 className="
                    font-semibold
                    text-lg
                    text-gray-900
                    ">

                                    {
                                        selectedCourse.creator?.name ||
                                        "Educator"
                                    }

                                </h3>



                                <p className="
                    text-sm
                    text-gray-500
                    ">

                                    {
                                        selectedCourse.creator?.email ||
                                        "Course Instructor"
                                    }

                                </p>



                            </div>



                        </div>

                        <div className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                    ">


                            {
                                randomCourses
                                    ?.slice(0, 3)
                                    .map((course) => (


                                        <Card
                                            key={course._id}
                                            category={course.category}
                                            price={course.price}
                                            title={course.title}
                                            level={course.level}
                                            id={course._id}
                                            thumbnail={course.thumbnail}
                                            reviews={course.reviews}
                                        />


                                    ))


                            }



                        </div>


                    </div>

                </div>

                {/* RIGHT PURCHASE CARD */}

                <div className="order-1
lg:order-2">
                    <div
                        className=" bg-white rounded-2xl shadow-xl overflow-hidden sticky top-20 "
                    >
                        <img
                            src={selectedCourse.thumbnail}
                            className=" w-full h-64 object-cover "
                        />
                        {/* CATEGORY + LEVEL */}
                        <div className="flex gap-2 mt-2 px-6">

                            <span className="
          text-xs 
          bg-gray-100 
          px-2 
          py-1 
          rounded-md
          text-gray-700
          ">
                                {selectedCourse.category}
                            </span>


                            <span className="
          text-xs 
          bg-gray-100 
          px-2 
          py-1 
          rounded-md
          text-gray-700
          ">
                                {selectedCourse.level}
                            </span>

                        </div>
                        <div className="p-6">

                            <p
                                className=" text-red-500 flex items-center gap-2 "
                            >
                                ⏱ 5 days left at this price
                            </p>

                            <div
                                className=" flex items-center gap-4 mt-5 "
                            >
                                <h2
                                    className=" text-4xl font-bold "
                                >
                                    ₹{selectedCourse.price}
                                </h2>

                                <span
                                    className=" line-through text-gray-400 "
                                >
                                    ₹999
                                </span>

                                <span
                                    className=" text-red-500 "
                                >
                                    15% off
                                </span>
                            </div>

                            <div
                                className=" flex justify-between mt-8 text-gray-600 border-b-4 "
                            >
                                <div>
                                    <IoStar />
                                    4.5
                                </div>

                                <div
                                    className=" flex gap-1 items-center "
                                >
                                    <IoTimeOutline />
                                    10 hours
                                </div>

                                <div
                                    className=" flex gap-1 items-center "
                                >
                                    <IoBookOutline />{selectedCourse?.lectures?.length} lessons
                                </div>
                            </div>

                                                            <div className="mt-1.5 tex-xl flex gap-2">
                                    <LuShieldAlert size={50} className="text-red-500 " />
                                    USE DEMO VISA CARD :<br/> "4100 2800 0000 1007" to enroll in course
                                    
                                </div>
                            {isEnrolled ? <button
                                onClick={() => navigate(`/viewlectures/${courseId}`)}
                                className=" w-full bg-green-200 text-green-700 py-4 rounded-xl mt-8 font-semibold hover:bg-green-700 hover:text-green-200 cursor-pointer"
                            >
                                Watch Now
                            </button> : <button
                                onClick={() => handleEnroll(userdata?._id, courseId)}
                                className=" w-full bg-black text-white py-4 rounded-xl mt-8 font-semibold hover:bg-gray-800 "
                            >
                            {verifyLoading ?  <ClipLoader size={30} color="white"/> :  "Enroll Now"}

                            </button>}

                            <h3
                                className=" font-bold text-xl mt-8 "
                            >
                                What's in the course?
                            </h3>

                            <ul
                                className=" mt-4 space-y-4 text-gray-600 "
                            >

                                <li className="flex gap-2">
                                    <IoCheckmarkCircle className="text-gray-600" />
                                    Lifetime access
                                </li>

                                <li className="flex gap-2">
                                    <IoCheckmarkCircle className="text-gray-600" />
                                    Hands on projects
                                </li>

                                <li className="flex gap-2">
                                    <IoCheckmarkCircle className="text-gray-600" />
                                    Source code included
                                </li>

                                <li className="flex gap-2">
                                    <IoCheckmarkCircle className="text-gray-600" />
                                    Certificate completion
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ViewCourses;
