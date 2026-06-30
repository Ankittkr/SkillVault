import React from "react";

const CourseRowCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition">

      <div className="flex flex-col md:flex-row gap-6">

        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-60 h-40 object-cover rounded-lg"
        />

        <div className="flex-1">

          <h2 className="text-2xl font-bold">
            {course.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {course.category}
          </p>

          <div className="flex gap-2 mt-3">
            <span className="bg-green-600 text-white text-sm px-2 rounded">
              4.8 ★
            </span>

            <span className="text-gray-500 text-sm">
              1200 Students
            </span>
          </div>

          <ul className="mt-4 text-gray-700 space-y-1">
            <li>• {course.level}</li>
            <li>• Lifetime Access</li>
            <li>• Certificate Included</li>
            <li>• Projects Included</li>
          </ul>

        </div>

        <div className="md:w-40">

          <h3 className="text-3xl font-bold">
            ₹{course.price}
          </h3>

          <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
            View Course
          </button>

        </div>

      </div>

    </div>
  );
};

export default CourseRowCard;