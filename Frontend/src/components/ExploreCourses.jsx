import React from "react";
import {
  FaCode,
  FaPalette,
  FaMobileAlt,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaCube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const domains = [
  {
    title: "Web Development",
    icon: <FaCode size={28} />,
    bg: "bg-pink-100",
  },
  {
    title: "UI UX Designing",
    icon: <FaPalette size={28} />,
    bg: "bg-green-100",
  },
  {
    title: "App Development",
    icon: <FaMobileAlt size={28} />,
    bg: "bg-rose-100",
  },
  {
    title: "Ethical Hacking",
    icon: <FaShieldAlt size={28} />,
    bg: "bg-purple-100",
  },
  {
    title: "AI / ML",
    icon: <FaRobot size={28} />,
    bg: "bg-green-100",
  },
  {
    title: "Data Science",
    icon: <FaDatabase size={28} />,
    bg: "bg-pink-100",
  },
  {
    title: "Data Analytics",
    icon: <FaChartLine size={28} />,
    bg: "bg-purple-100",
  },
  {
    title: "AI Tools",
    icon: <FaCube size={28} />,
    bg: "bg-green-100",
  },
];

const ExploreCourses = () => {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#f5f5f5] py-14 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="max-w-lg">

          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-black">
            Explore <br /> Our Courses
          </h1>

          <p className="text-gray-600 mt-6 leading-relaxed text-base sm:text-lg">
            Discover industry-focused courses designed to help you master
            modern technologies, boost your skills, and grow your career with
            hands-on learning experiences.
          </p>

          <button onClick={()=>{
            window.scrollTo(0, 0);
            navigate('/allcourses')}} 
            className="mt-8 px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition duration-300 cursor-pointer">
            View All Courses →
          </button>

        </div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-4  md:grid-cols-4 gap-5 max-w-md md:max-w-full mx-auto">

          {domains.map((domain, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3"
            >

              <div
                className={`w-full aspect-square rounded-2xl ${domain.bg}
  flex items-center justify-center shadow-sm
  hover:scale-105 transition duration-300 cursor-pointer`}
              >
                <div className="text-black">
                  {domain.icon}
                </div>
              </div>

              <h2 className="text-xs sm:text-xs font-medium text-black">
                {domain.title}
              </h2>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ExploreCourses;