import React, { useEffect, useState } from 'react'
import {
  FaBookOpen,
  FaPlus,
  FaEdit,
  FaBars,
  FaTimes,
  FaImage,
} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { setCreatorCourseData, setPulishedCourseData } from '../../features/course/courseSlice';
const EditCourses = () => {
  const userdata = useSelector((state) => state.user.userData)
  const publishcoursedata = useSelector(state => state.course.publishCourseData)
  const creatorCourseData = useSelector((state) => state.course.creatorCourseData)
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const { courseId } = useParams()
const [pageLoading, setPageLoading] = useState(true);
const [saveLoading, setSaveLoading] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: null,
    isPublished: false,
  });
  const [preview, setPreview] = useState(courseData?.thumbnail || "");
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

  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCourseData({
        ...courseData,
        thumbnail: e.target.files[0],
      });

      setPreview(URL.createObjectURL(file))

    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handlePublish = () => {
    setCourseData((prev) => ({
      ...prev,
      isPublished: !prev.isPublished
    }))
  }

  const getCoursebyId = async () => {
    try {
      setPageLoading(true)
      const res = await api.get(`/course/getcoursebyid/${courseId}`);
      setCourseData({
        title: res.data.data.title || "",
        subtitle: res.data.data.subtitle || "",
        category: res.data.data.category || "",
        level: res.data.data.level || "",
        price: res.data.data.price || "",
        description: res.data.data.description || "",
        isPublished: res.data.data.isPublished || false,
        thumbnail: res.data.data.thumbnail || null,
      })


      setPreview(res.data.data.thumbnail);
      setPageLoading(false);

    } catch (error) {
      console.log(error);
      setPageLoading(false)
    }
  }

  useEffect(() => {
    getCoursebyId()
  }
    , [])


  const handleEditCourse = async (e) => {
    e.preventDefault();
    setSaveLoading(true)
    const formData = new FormData();

    formData.append("title", courseData.title);
    formData.append("subtitle", courseData.subtitle);
    formData.append("description", courseData.description);
    formData.append("category", courseData.category);
    formData.append("level", courseData.level);
    formData.append("price", courseData.price);
    formData.append("isPublished", courseData.isPublished);

    // only append if new image selected
    if (courseData.thumbnail instanceof File) {
      formData.append("thumbnail", courseData.thumbnail);
    }

    try {
      const res = await api.patch(`/course/editcourse/${courseId}`, formData)

      // Update creator courses
      const updatedCourse = res.data.data
      const updatedCreatorCourses = creatorCourseData.map(course =>
  course._id === courseId ? updatedCourse : course
);
  dispatch(setCreatorCourseData(updatedCreatorCourses))

// Update published courses
let updatedPublishedCourses;

if (updatedCourse.isPublished) {

  // course should appear in published list
  const exists = publishcoursedata?.some(
    course => course._id === courseId
  );

  if (exists) {
    updatedPublishedCourses = publishcoursedata.map(course =>
      course._id === courseId ? updatedCourse : course
    );
  } else {
    updatedPublishedCourses = [
      ...(publishcoursedata || []),
      updatedCourse
    ];
  }

} else {

  // course should be removed from published list
  updatedPublishedCourses = (publishcoursedata || []).filter(
    course => course._id !== courseId
  );

}
dispatch(setPulishedCourseData(updatedPublishedCourses))



 
      setSaveLoading(false)
      console.log(res.data)

      toast.success(res.data.message)
      navigate('/managecourses')
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message)
      setSaveLoading(false)
      navigate('/managecourses')
    }


  }
  const handleRemoveCourse = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this course?"
    );
    if (!confirmDelete) return;
    try {

      setDeleteLoading(true);

      const res = await api.delete(
        `/course/removecourse/${courseId}`
      );

      const updatedCreatorCourses = creatorCourseData.filter(
        (course) => course._id !== courseId
      );

      dispatch(setCreatorCourseData(updatedCreatorCourses));

      const updatedPublishCoursedata = publishcoursedata.filter(
        (course) => course._id !== courseId
      )
      dispatch(setPulishedCourseData(updatedPublishCoursedata))

      setDeleteLoading(false)
      toast.success(res.data.message);

      navigate("/managecourses");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to remove course"
      );

    } finally {

      setDeleteLoading(false);

    }
  };
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

          <button onClick={() => navigate('/createcourses')} className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition  ">
            <FaPlus />
            Create New Course
          </button>
          <div className="bg-white/10 rounded-2xl overflow-hidden">
            <button onClick={() => navigate('/managecourses')} className=" mb-3 cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl w-full bg-white text-black font-medium">
              <FaEdit />
              Manage Courses
            </button>
            <div className="ml-11 mb-3 flex flex-col gap-2">

              <button
                onClick={() => navigate('/managecourses')}
                className="text-sm text-gray-300 hover:text-white text-left transition"
              >
                • All Courses
              </button>

              <button
                className="text-sm text-white font-medium text-left"
              >
                • Edit Course
              </button>

            </div>
          </div>

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
          <div className="rounded-2xl flex border-gray-400  flex-col lg:flex-row lg:justify-between border p-4 gap-2">


            <div>

              <h1 className="text-3xl font-black text-black">
                Edit: {courseData.title}
              </h1>

              <p className="text-gray-500 mt-2">
                Add detail information regarding the course
              </p>
            </div>

            <div className="flex flex-col h-fit gap-3">
              <div className='flex flex-col sm:flex-row gap-3'>
              <button onClick={handlePublish} className={`px-3 py-1 h-1/2 rounded-xl   transition cursor-pointer ${courseData.isPublished ? "bg-red-600/5 text-red-700 border border-red-800" : "bg-green-600/5 text-green-700 border border-green-800"}`}>
                {courseData.isPublished ? "Click to Unpublish" : "Click to Publish"}
              </button>

              <button disabled={deleteLoading} onClick={handleRemoveCourse} className="px-3 py-1 h-1/2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition cursor-pointer">
                {deleteLoading ? <ClipLoader size={30} color='white'/> : "Remove Course"}
              </button>

              </div>

              <button onClick={()=>navigate(`/createlectures/${courseId}`)} className=" px-3 py-1 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition duration-300 cursor-pointer">
            Go to Lectures Page →
          </button>
              
            </div>
          </div>

          {/* FORM */}
          <div className="p-4 sm:p-6">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-6 sm:p-8">

              <form
                onSubmit={handleEditCourse}
                className="space-y-6"
              >

                {/* TITLE + SUBTITLE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                  {/* TITLE */}
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

                  {/* SUBTITLE */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>

                    <input
                      type="text"
                      value={courseData.subtitle}
                      onChange={handleChange}
                      name="subtitle"
                      placeholder="Enter course subtitle"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                  </div>

                </div>

                {/* CATEGORY + LEVEL + PRICE */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

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

                      <option value="" disabled>
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

                  {/* LEVEL */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Level
                    </label>

                    <select
                      name='level'
                      value={courseData.level}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value={""} disabled>
                        Select level
                      </option>
                      <option value={"Beginner"}>
                        Beginner
                      </option>

                      <option value={"Intermediate"}>
                        Intermediate
                      </option>

                      <option value={"Advanced"}>
                        Advanced
                      </option>

                    </select>

                  </div>

                  {/* PRICE */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>

                    <input
                      name='price'
                      value={courseData.price}
                      onChange={handleChange}
                      type="number"
                      placeholder="₹ Enter price"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                  </div>

                </div>

                {/* DESCRIPTION */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description
                  </label>

                  <textarea
                    rows="5"
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    placeholder="Write course description..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  />

                </div>

                {/* THUMBNAIL */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Course Thumbnail
                  </label>

                  <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-black transition">

                    {
                      !preview ? <FaImage className="text-4xl text-gray-400 mb-3" /> : <img src={preview} alt="thumbnail" className="w-32 h-32  object-fit border-4 border-white shadow-md" />
                    }

                    <p className="text-gray-600 text-sm">
                      Click to upload thumbnail
                    </p>

                    <input
                      type="file"
                      hidden
                      onChange={handleThumbnail}
                    />

                  </label>

                  {
                    courseData.thumbnail && (
                      <p className="mt-3 text-sm text-black font-medium">
                        {courseData.thumbnail.name}
                      </p>
                    )
                  }

                </div>


                {/* FOOTER BUTTONS */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">

                  <button
                    onClick={() => navigate('/managecourses')}
                    type="button"
                    className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition cursor-pointer"
                    disabled={saveLoading}
                  >
                    {saveLoading ? <ClipLoader size={30} color='white' /> : "Save Changes"}
                  </button>

                </div>

              </form>
            </div>
          </div>

        </div>

      </div>

    </div>)
}

export default EditCourses