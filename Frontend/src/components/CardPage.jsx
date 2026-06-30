
import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const CardPage = () => {
  const navigate = useNavigate()
  const coursedata = useSelector((state) => state.course.publishCourseData);
  const popularCourses = coursedata?.slice(0, 8) || [];

  return (
    <div className="py-12 md:px-20 px-6 bg-white flex flex-col items-center">

      {/* HEADING SECTION */}
      <h2 className="
        text-3xl 
        md:text-4xl 
        font-semibold 
        text-gray-800
        text-center
      ">
        Explore Popular Courses
      </h2>


      <p className="
        text-sm 
        md:text-base 
        text-gray-600 
        mt-3 
        max-w-2xl
        text-center
      ">
        Discover a wide range of courses from expert educators and improve
        your skills with industry-focused learning programs.
      </p>


      {/* COURSE GRID */}
      <div
        className="
        grid
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
        w-full
        px-2
        md:px-0
        md:my-14
        my-10
        gap-5
        "
      >

        {
          popularCourses.map((course)=>(
            <Card
              key={course._id}
              category={course.category}
              price={course.price}
              title={course.title}
              level={course.level}
              id={course._id}
              thumbnail={course.thumbnail}
              reviews = {course.reviews}
            />
          ))
        }

      </div>


      {/* BUTTON */}
      <button
       onClick={()=>{
        window.scrollTo(0, 0);
        navigate('/allcourses')}} 
        className="
        cursor-pointer
        mt-2
        border
        border-gray-400
        px-10
        py-3
        rounded-md
        text-gray-700
        hover:bg-black
        hover:text-white
        transition-all
        duration-300
        "
      >
        Browse All Courses
      </button>


    </div>
  );
};

export default CardPage;