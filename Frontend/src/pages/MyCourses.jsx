import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export const MyCourses = () => {

    const navigate = useNavigate();

    const enrolledCourses = useSelector(
        (state) => state.user.userData?.enrolledCourses || []
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-8">
                    My Courses
                </h1>

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-2xl font-semibold mb-6">
                        Course Overview
                    </h2>

                    {
                        enrolledCourses.length === 0 ? (

                            <div className="flex flex-col items-center justify-center py-20">

                                <div className="text-7xl mb-4">
                                    📚
                                </div>

                                <h3 className="text-3xl font-medium text-gray-700">
                                    You're not enrolled in any courses.
                                </h3>

                                <p className="text-gray-500 mt-3">
                                    Once you're enrolled in a course, it will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {
                                    enrolledCourses.map((course) => (

                                        <div
                                            key={course._id}
                                            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                                        >

                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-48 object-cover"
                                            />

                                            <div className="p-4">

                                                <h3 className="font-bold text-lg">
                                                    {course.title}
                                                </h3>

                                                <p className="text-gray-500 text-sm mt-1">
                                                    {course.category} • {course.level}
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/viewlectures/${course._id}`)
                                                    }
                                                    className="w-full mt-4 bg-black text-white py-3 rounded-lg"
                                                >
                                                    Watch Course
                                                </button>

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    );
};