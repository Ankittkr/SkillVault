import React, { useEffect, useState } from "react";
import { FaBookOpen, FaPlus, FaEdit, FaBars, FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../utils/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../features/lecture/lectureSlice";

export  function EditLectures() {
   const { courseId ,  lectureId } = useParams();
  const userdata = useSelector((state) => state.user.userData);
  const lecturedata = useSelector((state) => state.lecture.lectureData )
const selectedLecture =  lecturedata.find(lecture => lecture._id == lectureId)
const dispatch = useDispatch()
  const navigate = useNavigate();


  const [menuOpen, setMenuOpen] = useState(false);

  const [Updateloading, setUpdateLoading] = useState(false);
  const [Removeloading, setRemoveLoading] = useState(false);

  const [lectureFormData, setLectureFormData] = useState({
    lectureTitle:"",
    videoUrl:null,
    isPreviewFree:false
});

useEffect(()=>{
    if(selectedLecture){
        setLectureFormData({

            lectureTitle:selectedLecture.lectureTitle || "",

            videoUrl:null,

            isPreviewFree:selectedLecture.isPreviewFree || false

        })

    }
 } , [selectedLecture])
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLectureFormData({
      ...lectureFormData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      e.target.value = "";
      return;
    }

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Video must be smaller than 100MB");
      e.target.value = "";
      return;
    }

    setLectureFormData({
      ...lectureFormData,
      videoUrl: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdateLoading(true);

      const formData = new FormData();

      formData.append("lectureTitle", lectureFormData.lectureTitle);
      formData.append("isPreviewFree", lectureFormData.isPreviewFree);

      if (lectureFormData.videoUrl) {
        formData.append("videoUrl", lectureFormData.videoUrl);
      }

      const res = await api.patch(`/course/editlecture/${lectureId}`, formData, {
        timeout: 300000,
      });
    
        dispatch(
            setLectureData(
                lecturedata.map((lecture)=>lecture._id === lectureId ? res.data.data : lecture)
            )
        )


      toast.success(res.data.message);

      navigate(`/createlectures/${courseId}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleRemoveLecture = async () => {
    try {
      setRemoveLoading(true)
      const res = await api.delete(`/course/removelecture/${lectureId}`)
      dispatch(setLectureData(
        lecturedata.filter((lecture)=> lecture._id !== lectureId)
      ))
      toast.success(res.data.message)
      setRemoveLoading(false)
        
      navigate(`/createlectures/${courseId}`);
    
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      setRemoveLoading(false)
      navigate(`/createlectures/${courseId}`)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}

      <div
        className={`fixed lg:static top-0 left-0 min-h-screen w-72 bg-black text-white z-50 transform transition-transform duration-300

${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
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

          <button
            onClick={() => navigate("/createcourses")}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <FaPlus />
            Create New Course
          </button>

          <div className="bg-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => navigate("/managecourses")}
              className="flex items-center gap-3 px-4 py-3 w-full bg-white text-black rounded-xl font-medium"
            >
              <FaEdit />
              Manage Courses
            </button>

            <div className="ml-11 flex flex-col gap-3 mt-3 mb-4">
              <button
                onClick={() => navigate("/managecourses")}
                className="text-sm text-gray-300 text-left hover:text-white"
              >
                • All Courses
              </button>

              <button
                onClick={() => navigate(`/editcourses/${courseId}`)}
                className="text-sm text-gray-300 text-left hover:text-white"
              >
                • Edit Course
              </button>

              <button
                onClick={() => navigate(`/createlectures/${courseId}`)}
                className="text-sm text-gray-300 text-left hover:text-white"
              >
                • Add Lecture
              </button>

              <button className="text-sm text-white font-medium text-left">
                • Edit Lecture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}

      <div className="flex-1">
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
            <div className="w-11 h-11 rounded-full bg-black text-white flex justify-center items-center font-bold">
              {userdata?.name?.[0]}
            </div>
          )}
        </div>

        <div className="bg-white m-6 rounded-2xl shadow p-8">
          <h1 className="text-3xl font-black">Edit Lecture</h1>

          <p className="text-gray-500 mt-2 mb-8">
            Update lecture title, video and preview settings.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Lecture Title</label>

              <input
                type="text"
                name="lectureTitle"
                value={lectureFormData.lectureTitle}
                onChange={handleChange}
                placeholder="Enter lecture title"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Upload Video</label>

              <input
                type="file"
                accept="video/*"
                onChange={handleVideo}
                className="w-full px-4 py-3 border rounded-xl file:bg-gray-700 file:text-white file:text-sm file:border-0 hover:file:bg-gray-500 file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
                
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isPreviewFree"
                checked={lectureFormData.isPreviewFree}
                onChange={handleChange}
                className="w-5 h-5 accent-black"
              />

              <label>Make Preview Free</label>
            </div>

            <div className=" flex-col gap-4  flex lg:flex-row lg:justify-between">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/createlectures/${courseId}`)}    
                className="px-6 py-3 bg-gray-200 rounded-xl font-semibold"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={Updateloading}
                className="px-8 py-3 bg-black text-white rounded-xl font-semibold"
              >
                {Updateloading ? (
                  <ClipLoader size={25} color="white" />
                ) : (
                  "Update Lecture"
                )}
              </button>
            </div>
            {
                
                    <button type="button" disabled={Removeloading} onClick={handleRemoveLecture}  className="cursor-pointer px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all text-sm ">
               {Removeloading ? <ClipLoader size={30} color="white" /> : "Remove Lecture"}
            </button>
            }

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


