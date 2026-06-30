import React, { useState } from 'react'
import {
    FaBookOpen,
    FaPlus,
    FaEdit,
    FaBars,
    FaTimes,
    FaImage,
} from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function CreateCourses() {
    const userdata = useSelector((state) => state.user.userData)
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const [courseData, setCourseData] = useState({
        title: "",
        category: "",
    });
    const [loading , setloading] = useState(false)
    const categories = [
        "Web Development",
        "AI & ML",
        "AI Tools",
        "Data Science",
        "Data Analytics",
        "Cyber Security",
        "UI UX Design",
        "Mobile Development",
        "Others"
    ];

    const handleChange = (e) => {

        const { name, value } = e.target;

        setCourseData({
            ...courseData,
            [name]: value,
        });
    };



    const handleSubmit = async (e) => {

        e.preventDefault();
        setloading(true)
        try {
            const res  = await api.post('/course/createcourse' , courseData)
            setloading(false)
            toast.success(res.data.message)
            navigate('/managecourses')
        } catch (error) {
            setloading(false)
            toast.error(error.response.data.message)
            navigate('/dashboard')
            console.log(error);
            
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

                    <h1 onClick={() => navigate('/')} className="cursor-pointer text-2xl font-black">
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

                    <button onClick={() => navigate('/dashboard')} className=" cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
                        <FaBookOpen />
                        Analytics
                    </button>

                    <button onClick={() => navigate('/createcourses')} className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-medium ">
                        <FaPlus />
                        Create New Course
                    </button>

                    <button onClick={() => navigate('/managecourses')} className=" cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
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

                <div className="bg-white px-4 sm:px-6  py-4 shadow-sm h-full ">
                    {/* HEADING */}
                    <div className="mb-8">

                        <h1 className="text-3xl font-black text-black">
                            Create New Course
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Add a new course to your platform
                        </p>

                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* COURSE TITLE */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={courseData.title}
                                onChange={handleChange}
                                placeholder="Enter course title"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            />

                        </div>

                        {/* CATEGORY */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={courseData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((category, index) => (

                                    <option
                                        key={index}
                                        value={category}
                                    >
                                        {category}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full sm:w-fit px-8 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
                        >
                           {loading ? <ClipLoader size={30} color='white' /> :  "Create Course"}
                        </button>

                    </form>

                </div>

            </div>

        </div>)
}

export default CreateCourses