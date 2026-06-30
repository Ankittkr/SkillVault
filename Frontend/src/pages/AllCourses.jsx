import React, { useMemo, useState } from "react";
import { FaFilter, FaStar } from "react-icons/fa";
import CourseFilters from "../components/CourseFilters";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import getPublishedCourse from "../customHooks/getPublishedCourse";
import { useEffect } from "react";


export default function AllCourses() {
  getPublishedCourse()
  const allcourses = useSelector((state) => state.course.publishCourseData || [])
  const navigate = useNavigate()

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [selectedLevels, setSelectedLevels] =
    useState([]);

  const [mobileFilter, setMobileFilter] =
    useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const filteredCourses = useMemo(() => {
    let courses = [...allcourses];

    if (search) {
      courses = courses.filter((course) =>
        course.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      courses = courses.filter((course) =>
        selectedCategories.includes(course.category)
      );
    }

    if (selectedLevels.length > 0) {
      courses = courses.filter((course) =>
        selectedLevels.includes(course.level)
      );
    }

    if (sortBy === "low") {
      courses.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      courses.sort((a, b) => b.price - a.price);
    }

    return courses;
  }, [
    allcourses,
    search,
    selectedCategories,
    selectedLevels,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredCourses.length / coursesPerPage
  );


  const startIndex =
    (currentPage - 1) * coursesPerPage;


  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  useEffect(() => {

    setCurrentPage(1)

  }, [
    search,
    selectedCategories,
    selectedLevels,
    sortBy
  ])
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Mobile Header */}

        <div className="lg:hidden flex flex-wrap  gap-3 mb-4">

          <button
            onClick={() => setMobileFilter(true)}
            className="flex w-1/4 items-center gap-2 bg-white px-4 py-3 rounded-lg shadow"
          >
            <FaFilter />
            Filters
          </button>

          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 w-1/2 bg-white px-4 rounded-lg shadow outline-none"
          />

          {/* ASK AI MOBILE */}

          <button
            onClick={() => {
              navigate('/search')
            }}
            className="
          w-1/4
          h-12
          rounded-xl
          flex
          items-center
          justify-center
          shadow-md
          bg-gradient-to-r
          from-blue-500
          via-purple-500
          to-pink-500
          hover:scale-105
          transition
          "
          >


            <div
              className="
          w-7
          h-7
          rounded-full
          bg-white
          flex
          items-center
          justify-center
          "
            >

              <span
                className="
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-blue-500
          to-purple-600
          font-bold
          "
              >
                ✦
              </span>


            </div>


          </button>

        </div>

        <div className="lg:flex gap-6">

          {/* Sidebar */}

          <div className="w-72 shrink-0">

            <CourseFilters
              selectedCategories={selectedCategories}
              setSelectedCategories={
                setSelectedCategories
              }
              selectedLevels={selectedLevels}
              setSelectedLevels={
                setSelectedLevels
              }
              mobileFilter={mobileFilter}
              setMobileFilter={
                setMobileFilter
              }
            />

          </div>

          {/* Right Side */}

          <div className="flex-1">

            {/* Top Search + Sort */}
            <div className="
                hidden 
                lg:flex 
                bg-white 
                p-4 
                rounded-xl 
                shadow 
                mb-5 
                justify-between 
                gap-4
                items-center
                ">


              {/* SEARCH */}
              <div className="flex items-center gap-3 w-full">


                <input
                  type="text"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                            border
                            px-4
                            py-2
                            rounded-lg
                            w-full
                            max-w-md
                            outline-none
                            "
                />



                {/* ASK AI BUTTON */}

                <button
                  className="
flex
items-center
gap-2
px-5
py-2
rounded-xl
text-white
font-semibold
bg-gradient-to-r
from-blue-500
via-purple-500
to-pink-500
hover:scale-105
transition
shadow-md
"
                  onClick={() => {
                    // open ai search modal here
                    navigate("/search")
                  }}
                >


                  {/* AI LOGO */}

                  <div
                    className="
w-6
h-6
rounded-full
bg-white
flex
items-center
justify-center
"
                  >

                    <span
                      className="
text-transparent
bg-clip-text
bg-gradient-to-r
from-blue-500
to-purple-600
font-bold
"
                    >
                      ✦
                    </span>

                  </div>


                  Ask AI


                </button>


              </div>





              {/* SORT */}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  border
                  px-4
                  py-2
                  rounded-lg
                  "
              >


                <option value="">
                  Sort By
                </option>


                <option value="low">
                  Price Low → High
                </option>


                <option value="high">
                  Price High → Low
                </option>


              </select>


            </div>

            {/* Result Count */}

            <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl p-4 shadow mb-4">

              <h2 className="font-semibold text-lg">
                {filteredCourses.length} Courses Found
              </h2>

              {/* pagination UI below cards */}

              <div
                className="
flex
justify-center
items-center
gap-3
bg-gray-100
rounded-md
px-1.5
py-2.5
"
              >


                <button

                  disabled={currentPage === 1}

                  onClick={() => setCurrentPage(prev => prev - 1)}

                  className="
px-4
py-2
rounded-lg
bg-black
text-white
disabled:opacity-40
"
                >

                  Prev

                </button>



                {
                  Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  )
                    .map((page) => (


                      <button

                        key={page}

                        onClick={() => setCurrentPage(page)}

                        className={`
px-4
py-2
rounded-lg
border

${currentPage === page
                            ?
                            "bg-black text-white"
                            :
                            "bg-white"
                          }

`}

                      >

                        {page}

                      </button>


                    ))
                }



                <button

                  disabled={currentPage === totalPages}

                  onClick={() => setCurrentPage(prev => prev + 1)}

                  className="
px-4
py-2
rounded-lg
bg-black
text-white
disabled:opacity-40
"

                >

                  Next

                </button>



              </div>
            </div>

            {/* Courses */}

            <div className="grid  grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 my-4 gap-3 px-2 md:p-0">
              {currentCourses.map((course) => (
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


              ))}
            </div>

            {/* pagination UI below cards */}

              <div
                className="
flex
justify-center
items-center
gap-3
bg-gray-100
rounded-md
px-1.5
py-2.5
md:hidden
"
              >


                <button

                  disabled={currentPage === 1}

                  onClick={() => setCurrentPage(prev => prev - 1)}

                  className="
px-4
py-2
rounded-lg
bg-black
text-white
disabled:opacity-40
"
                >

                  Prev

                </button>



                {
                  Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  )
                    .map((page) => (


                      <button

                        key={page}

                        onClick={() => setCurrentPage(page)}

                        className={`
px-4
py-2
rounded-lg
border

${currentPage === page
                            ?
                            "bg-black text-white"
                            :
                            "bg-white"
                          }

`}

                      >

                        {page}

                      </button>


                    ))
                }



                <button

                  disabled={currentPage === totalPages}

                  onClick={() => setCurrentPage(prev => prev + 1)}

                  className="
px-4
py-2
rounded-lg
bg-black
text-white
disabled:opacity-40
"

                >

                  Next

                </button>



              </div>
          </div>

        </div>

      </div>

    </div>
  );
}