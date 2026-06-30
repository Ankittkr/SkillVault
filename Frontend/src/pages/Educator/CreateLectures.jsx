import React, { useState } from "react";
import {
  FaBookOpen,
  FaPlus,
  FaEdit,
  FaBars,
  FaTimes,
  FaPen,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../features/lecture/lectureSlice";
import { useEffect } from "react";
import { addLectureToCourse } from "../../features/course/courseSlice";

export function CreateLectures() {
  const userdata = useSelector((state) => state.user.userData)
  const [courseTitle, setCourseTitle] = useState("")
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const lecturedata = useSelector((state) => state.lecture.lectureData);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [lectureTitle, setLectureTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lectureTitle) {
      toast.error("Enter lecture title");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/course/createlecture/${courseId}`, { lectureTitle })
      console.log(res.data);
      dispatch(setLectureData([...lecturedata, res.data.data.lecture]))
      dispatch(
        addLectureToCourse({
          courseId,
          lecture: res.data.data.lecture
        })
      )
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    } finally {
      setLectureTitle("")
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCourseLecture = async () => {
      setPageLoading(true)
      try {
        const res = await api.get(`/course/getcourselecture/${courseId}`)
        dispatch(setLectureData(res.data.data.lectures))
        setCourseTitle(res.data.data.title)
        console.log(res.data.data);
        setPageLoading(false)

      } catch (error) {
        console.log(error);
        setPageLoading(false)
      }
    }
    getCourseLecture()
  }, [])

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}

      <div
        className={`fixed lg:static top-0 left-0 min-h-screen w-72 bg-black text-white z-50 transform transition-transform duration-300
${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-black cursor-pointer"
          >
            Skill Vault
          </h1>

          <button onClick={() => setMenuOpen(false)} className="lg:hidden">
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <FaBookOpen />
            Analytics
          </button>

          <button onClick={() => navigate('/createcourses')} className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition  ">
            <FaPlus />
            Create New Course
          </button>

          <div className="bg-white/10 rounded-2xl overflow-hidden">

            {/* Parent */}
            <button
              onClick={() => navigate('/managecourses')}
              className="mb-3 cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl w-full bg-white text-black font-medium"
            >
              <FaEdit />
              Manage Courses
            </button>


            {/* Child Routes */}
            <div className="ml-11 mb-3 flex flex-col gap-3">


              <button
                onClick={() => navigate('/managecourses')}
                className="text-sm text-gray-300 hover:text-white text-left transition"
              >
                • All Courses
              </button>



              <button
                onClick={() => navigate(`/editcourses/${courseId}`)}
                className="text-sm text-gray-300 hover:text-white text-left transition"
              >
                • Edit Course
              </button>



              <button
                className="text-sm text-white text-left "
              >
                • Add Lecture
              </button>


            </div>

          </div>
        </div>
      </div>

      {/* MAIN */}

      <div className="flex-1">
        {/* TOPBAR */}

        <div className="bg-white px-5 py-4 shadow flex justify-between items-center">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden">
            <FaBars size={24} />
          </button>

          <h1 className="text-3xl font-bold">
            {userdata?.name?.split(" ")[0]}'s Dashboard
          </h1>

          {userdata?.photoUrl ? (
            <img
              src={userdata.photoUrl}
              className="w-11 h-11 rounded-full object-cover"
            />
          ) : (
            <div className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center font-bold">
              {userdata?.name?.[0]}
            </div>
          )}
        </div>

        {/* main content */}
        <div className="bg-white m-6 rounded-2xl shadow p-8">
          <h1 className="text-3xl font-black">{courseTitle} </h1>
          <h1 className="text-xl font-black">Let's Add a Lecture</h1>

          <p className="text-gray-500 mt-2 mb-8">
            Enter the title and add your video lectures to enhance your course
            content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="e.g. Introduction to Mern Stack"
              className="
                                    w-full 
                                    px-5
                                    py-4
                                    border
                                    border-gray-300
                                    rounded-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-black
                                    "
            />

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/editcourses/${courseId}`)}
                className="px-6 py-3 rounded-xl bg-gray-200 font-semibold cursor-pointer">
                ← Back to Course
              </button>

              <button
                disabled={loading}
                type="submit"
                className="
px-7
py-3
rounded-xl
bg-black
text-white
font-semibold
"
              >
                {loading ? (
                  <ClipLoader size={25} color="white" />
                ) : (
                  <>
                    <FaPlus className="inline mr-2" />
                    Create Lecture
                  </>
                )}
              </button>
            </div>
          </form>

          {/* LECTURE LIST */}

          <div className="mt-8 space-y-3">
            {lecturedata.map((lecture, index) => (
              <div
                key={lecture._id}
                className="bg-gray-100 rounded-xl px-5 py-4 flex justify-between items-center"
              >
                <h3 className="font-semibold text-lg">
                  Lecture - {index + 1}: {lecture.lectureTitle}
                </h3>

                <button onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)} className="cursor-pointer" >
                  <FaPen className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}