import React, { useState } from "react";
import {
  FaBookOpen,
  FaPlus,
  FaEdit,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import getCreatorCourse from "../../customHooks/getCreatorCourse";


const COLORS = ["#000000", "#404040", "#737373", "#a3a3a3"];

const Dashboard = () => {
  const userdata = useSelector((state) => state.user.userData)
  const creatorcoursedata = useSelector((state) => state.course.creatorCourseData)

  const courseData = creatorcoursedata?.map((course) => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures?.length || 0,

  })) || []
  const EnrollData = creatorcoursedata?.map((course) => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudent?.length || 0,

  })) || []


  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
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

          <button onClick={() => navigate('/dashboard')} className=" cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-medium">
            <FaBookOpen />
            Analytics
          </button>

          <button onClick={() => navigate('/createcourses')} className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
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

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-4 sm:p-6">


          <div className="bg-black text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm opacity-70">
              Total Courses
            </h3>

            <p className="text-4xl font-black mt-3">
              {creatorcoursedata?.length || 0}
            </p>

            <p className="text-xs mt-2 opacity-70">
              Published courses
            </p>

          </div>



          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-gray-500 text-sm">
              Total Students
            </h3>

            <p className="text-4xl font-black mt-3">

              {
                creatorcoursedata?.reduce(
                  (total, course) =>
                    total + (course.enrolledStudent?.length || 0),
                  0
                )

              }

            </p>

            <p className="text-xs mt-2 text-gray-400">
              Active learners
            </p>

          </div>




          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-gray-500 text-sm">
              Total Lectures
            </h3>

            <p className="text-4xl font-black mt-3">

              {
                creatorcoursedata?.reduce(
                  (total, course) =>
                    total + (course.lectures?.length || 0),
                  0
                )

              }

            </p>

            <p className="text-xs mt-2 text-gray-400">
              Content created
            </p>

          </div>




          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-gray-500 text-sm">
              Revenue
            </h3>

            <p className="text-4xl font-black mt-3">
              ₹
              {
                creatorcoursedata?.reduce(
                  (total, course) =>
                    total + ((course.price || 0) * (course.enrolledStudent?.length || 0)),
                  0
                )

              }

            </p>

            <p className="text-xs mt-2 text-gray-400">
              Course earnings
            </p>

          </div>


        </div>


        {/* CHARTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 px-4 sm:px-6 pb-10">



          {/* LECTURES BAR */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h2 className="text-xl font-bold mb-6">
              Lecture Analytics
            </h2>


            <div className="h-[350px]">


              <ResponsiveContainer width="100%" height="100%">


                <BarChart data={courseData}>


                  <CartesianGrid
                    strokeDasharray="4 4"
                  />


                  <XAxis
                    dataKey="name"
                  />


                  <YAxis />

                  <Tooltip />


                  <Bar

                    dataKey="lectures"

                    fill="#000"

                    radius={[8, 8, 0, 0]}

                  />


                </BarChart>


              </ResponsiveContainer>



            </div>


          </div>







          {/* STUDENT CHART */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">


            <h2 className="text-xl font-bold mb-6">

              Student Enrollment

            </h2>


            <div className="h-[350px]">


              <ResponsiveContainer width="100%" height="100%">


                <LineChart data={EnrollData}>


                  <CartesianGrid
                    strokeDasharray="4 4"
                  />


                  <XAxis dataKey="name" />

                  <YAxis />


                  <Tooltip />


                  <Line

                    type="monotone"

                    dataKey="enrolled"

                    stroke="#000"

                    strokeWidth={3}

                    dot={{ r: 5 }}

                  />


                </LineChart>



              </ResponsiveContainer>


            </div>


          </div>







          {/* COURSE DISTRIBUTION */}

          <div className="bg-white rounded-2xl p-6 shadow-sm xl:col-span-2">


            <h2 className="text-xl font-bold mb-6">

              Course Distribution

            </h2>



            <div className="h-[350px]">


              <ResponsiveContainer width="100%" height="100%">


                <PieChart>


                  <Pie

                    data={courseData}

                    dataKey="lectures"

                    nameKey="name"

                    outerRadius={120}

                    label

                  >


                    {
                      courseData.map((item, index) => (

                        <Cell

                          key={index}

                          fill={COLORS[index % COLORS.length]}

                        />

                      ))

                    }


                  </Pie>


                  <Tooltip />


                  <Legend />


                </PieChart>


              </ResponsiveContainer>


            </div>


          </div>



        </div>

      </div>

    </div>
  );
};

export default Dashboard;