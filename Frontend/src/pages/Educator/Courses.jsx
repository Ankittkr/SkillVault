import React, { useState } from 'react'
import { FaBars, FaBookOpen, FaEdit, FaEye, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import empty from "../../assets/empty.jpg"
import getCreatorCourse from '../../customHooks/getCreatorCourse';
import api from '../../utils/axios';
import { ClipLoader } from 'react-spinners';
import {  setCreatorCourseData, setPulishedCourseData } from '../../features/course/courseSlice';


const Courses = () => {
    const userdata = useSelector((state) => state.user.userData)
    const publishcoursedata = useSelector(state=> state.course.publishCourseData)
    
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()
    getCreatorCourse()
    const [loading, setloading] = useState(false)
    const creatorCourseData = useSelector((state) => state.course.creatorCourseData)
    console.log(creatorCourseData);
    const dispatch = useDispatch()
    const handleRemoveCourse = async (courseId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this course?"
        );
        if (!confirmDelete) return;
        try {

            setloading(true);

            const res = await api.delete(
                `/course/removecourse/${courseId}`
            );

            const updatedCreatorCourseData = creatorCourseData.filter(
                (course) => course._id !== courseId
            );

            dispatch(setCreatorCourseData(updatedCreatorCourseData));

            const updatedPublishedCoursedata = publishcoursedata.filter(
              (course)=> course._id !== courseId
            )
            dispatch(setPulishedCourseData(updatedPublishedCoursedata))
            toast.success(res.data.message);

            navigate("/managecourses");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to remove course"
            );

        } finally {

            setloading(false);

        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* SIDEBAR */}
            <div
                className={`fixed lg:static top-0 left-0 min-h-screen w-72 bg-black text-white z-50 transform transition-transform duration-300
        ${menuOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }`}
            >

                <div className="flex items-center justify-between p-6 border-b border-white/10">

                    <h1 onClick={() => navigate("/")} className="cursor-pointer text-2xl font-black">
                        Skill Vault
                    </h1>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="lg:hidden"
                    >
                        <FaTimes size={24} />
                    </button>

                </div>

                <div className="flex flex-col p-5 gap-3">

                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-xl  hover:bg-white/10 transition">
                        <FaBookOpen />
                        Analytics
                    </button>

                    <button onClick={() => navigate('/createcourses')} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
                        <FaPlus />
                        Create New Course
                    </button>

                    <button onClick={() => navigate('/managecourses')} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium  bg-white text-black  ">
                        <FaEdit />
                        Manage Courses
                    </button>

                </div>

            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 w-full overflow-hidden">

                {/* TOPBAR */}
                <div className="bg-white px-4 sm:px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-40">

                    <button
                        onClick={() => setMenuOpen(true)}
                        className="lg:hidden p-2.5"
                    >
                        <FaBars size={24} />
                    </button>
                    <div className="flex justify-between w-full items-center  gap-4">


                        <div className="text-2xl sm:text-3xl font-bold text-black">
                            {userdata?.name.split(" ")[0]}'s Dashboard
                        </div>
                        {
                            userdata ? (

                                userdata?.photoUrl ? (

                                    <div className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition">
                                        <img
                                            src={userdata?.photoUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                ) : (

                                    <div className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition">
                                        <div className="w-full h-full rounded-full flex justify-center items-center font-bold bg-black text-white">
                                            {userdata?.name[0].toUpperCase()}
                                        </div>
                                    </div>

                                )

                            ) : (

                                <div className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition">
                                    <IoPersonCircleSharp className="w-11 h-11" />
                                </div>

                            )
                        }

                    </div>

                </div>


                {/* MOBILE VIEW */}
                <div className="block lg:hidden p-4 space-y-5">

                    {creatorCourseData?.map((course) => (

                        <div
                            key={course._id}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        >

                            <img
                                src={course.thumbnail || empty}
                                alt={course.title}
                                className="w-full h-44 object-cover"
                            />

                            <div className="p-5">

                                <h3 className="text-lg font-bold text-black">
                                    {course.title}
                                </h3>

                                <div className="flex items-center justify-between mt-4">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Students
                                        </p>

                                        <p className="font-semibold text-black">
                                            &#8377;{course.price || "NA"}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                    ${course.isPublished
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {course.isPublished ? "Publish" : "Draft"}
                                    </span>

                                </div>

                                <div className="flex items-center gap-3 mt-5">

                                    <button onClick={() => navigate(`/editcourses/${course?._id}`)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition">

                                        <FaEdit />

                                        Edit

                                    </button>

                                    <button className="p-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                                        <FaEye />
                                    </button>

                                    <button disabled={loading} onClick={handleRemoveCourse} className="p-3 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 transition">
                                        {loading ? <ClipLoader size={30} color='red'/> : <FaTrash />}
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}






                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden lg:block p-6">

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-100">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Thumbnail
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Title
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Students
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {creatorCourseData?.map((course) => (

                                        <tr
                                            key={course._id}
                                            className="border-t border-gray-100"
                                        >

                                            <td className="px-6 py-5">

                                                <img
                                                    src={course.thumbnail || empty}
                                                    alt={course.title}
                                                    className="w-24 h-16 rounded-lg object-cover"
                                                />

                                            </td>

                                            <td className="px-6 py-5 font-medium text-black">
                                                {course.title}
                                            </td>

                                            <td className="px-6 py-5 text-gray-600">
                                                &#8377;{course.price || "NA"}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium
                          ${course.isPublished
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {course.isPublished ? "Publish" : "Draft"}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <button onClick={() => navigate(`/editcourses/${course._id}`)} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition text-sm">

                                                        Edit

                                                    </button>

                                                    <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                                                        <FaEye />
                                                    </button>

                                                    <button disabled={loading} onClick={() => handleRemoveCourse(course._id)} className="p-2 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition">
                                                       {loading ? <ClipLoader size={30} color='red'/> : < FaTrash />}  
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Courses
