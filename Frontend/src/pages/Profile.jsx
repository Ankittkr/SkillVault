import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cover from "../assets/hero.png";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import { setUserData } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Profile = () => {

  const userdata = useSelector((state) => state.user.userData);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: userdata?.name || "",
    email: userdata?.email || "",
    description: userdata?.description || "",
    photoUrl : null,
  });

  const [preview, setPreview] = useState(userdata?.photoUrl || "");
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch()
  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData({
        ...formData,
        photoUrl: file,
      });

      setPreview(URL.createObjectURL(file));

    }

  };

  // HANDLE SUBMIT
  const handleUpdateProfile = async (e) => {

    e.preventDefault();
    setLoading(true)
    const updatedData = new FormData();

    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    updatedData.append("description", formData.description);

    if (formData.photoUrl) {
      updatedData.append("photoUrl", formData.photoUrl);
    }

    console.log("FINAL DATA");

    try {
      const res = await api.patch('/user/updateprofile' , updatedData)

      dispatch(setUserData(res.data.data))
      setLoading(false)
      setEditMode(false)
      toast.success(res.data.message)
      
    } catch (error) {
      setLoading(false);
      setEditMode(false)
      console.log(error);
      toast.error(error.response.data.message)
      
    }

    // API CALL HERE

  };

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full fixed top-0 z-50">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gray-100 pt-20 px-4">

        <div className="max-w-4xl mx-auto py-4">

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* COVER */}
            <div className="h-40 sm:h-52 bg-black relative">

              <img
                src={cover}
                alt="cover"
                className="w-full h-full object-cover opacity-70"
              />

            </div>

            {/* CONTENT */}
            <div className="px-6 sm:px-10 pb-10">

              {/* TOP */}
              <div className="-mt-16 flex flex-col sm:flex-row sm:items-end gap-5">

                {/* PROFILE IMAGE */}
                <div className="relative z-40">

                  {
                    preview ? (

                      <img
                        src={preview}
                        alt="profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                      />

                    ) : (

                      <div className="w-32 h-32 rounded-full bg-black text-white flex justify-center items-center text-5xl font-bold border-4 border-white shadow-md">
                        {userdata?.name?.charAt(0).toUpperCase()}
                      </div>

                    )
                  }

                  {/* IMAGE EDIT */}
                  {
                    editMode && (
                      <label className="absolute bottom-1 right-1 bg-black text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-gray-800 transition">

                        Edit

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />

                      </label>
                    )
                  }

                </div>

                {/* NAME + BUTTONS */}
                <div className="flex-1 flex flex-col gap-4">

                  <div>

                    <h1 className="text-3xl font-bold text-black">
                      {userdata?.name}
                    </h1>

                    <p className="text-gray-600 mt-1 capitalize">
                      {userdata?.role}
                    </p>

                  </div>

                  {/* TOGGLE BUTTONS */}
                  <div className="flex gap-3 flex-wrap">

                    <button
                      onClick={() => setEditMode(false)}
                      className={`px-5 py-2.5 rounded-xl border transition cursor-pointer ${
                        !editMode
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => setEditMode(true)}
                      className={`px-5 py-2.5 rounded-xl border transition cursor-pointer ${
                        editMode
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      Edit Profile
                    </button>

                  </div>

                </div>

              </div>

              {/* PROFILE VIEW */}
              {
                !editMode ? (

                  <>
                    {/* INFO */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">

                      <div>

                        <h2 className="text-sm text-gray-500 mb-1">
                          Email
                        </h2>

                        <p className="text-black font-medium">
                          {userdata?.email}
                        </p>

                      </div>

                      <div>

                        <h2 className="text-sm text-gray-500 mb-1">
                          Role
                        </h2>

                        <p className="text-black font-medium capitalize">
                          {userdata?.role}
                        </p>

                      </div>

                      <div>

                        <h2 className="text-sm text-gray-500 mb-1">
                          Courses Enrolled
                        </h2>

                        <p className="text-black font-medium">
                          {userdata?.enrolledCourses?.length || 0}
                        </p>

                      </div>

                    </div>

                    {/* BIO */}
                    <div className="mt-8">

                      <h2 className="text-lg font-semibold text-black mb-3">
                        About
                      </h2>

                      <p className="text-gray-600 leading-relaxed">
                        {userdata?.description || "No discription added"}
                      </p>

                    </div>

                  </>

                ) : (

                  /* EDIT FORM */
                  <form
                    onSubmit={handleUpdateProfile}
                    className="mt-10 space-y-6"
                  >

                    {/* NAME */}
                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                      />

                    </div>

                    {/* EMAIL */}
                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        readOnly
                        value={formData.email}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50"
                      />

                    </div>

                    {/* BIO */}
                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        About / Bio
                      </label>

                      <textarea
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      ></textarea>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-4">

                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                        disabled={loading}
                      >
                        {loading ? <ClipLoader size={30} color="white"/>  :  "Save Changes"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                )
              }

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Profile;