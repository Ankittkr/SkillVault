import { Routes, Route, Navigate, } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { ToastContainer } from "react-toastify"
import getCurrentUser from "./customHooks/getCurrentUser"
import { useSelector } from "react-redux"
import Profile from "./pages/Profile"
import ForgetPassword from "./pages/ForgetPassword"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Educator/Dashboard"
import Courses from "./pages/Educator/Courses"
import CreateCourses from "./pages/Educator/CreateCourses"
import getCreatorCourse from "./customHooks/getCreatorCourse"
import EditCourses from "./pages/Educator/EditCourses"
import getPublishedCourse from "./customHooks/getPublishedCourse"
import AllCourses from "./pages/AllCourses"
import { CreateLectures } from "./pages/Educator/CreateLectures"
import { EditLectures } from "./pages/Educator/EditLectures"
import ViewCourses from "./pages/ViewCourses"
import { ViewLectures } from "./pages/ViewLectures"
import ProtectedCourseRoute from "./components/ProtectedCourseRoute"
import { MyCourses } from "./pages/MyCourses"
import { getAllReviews } from "./customHooks/getAllReviews"
import { SearchWithAi } from "./pages/SearchWithAi"
function App() {
  getCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  getAllReviews()
  const userdata = useSelector((state) => state.user.userData)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={!userdata ? <SignUp /> : <Navigate to={'/'} />} />
        <Route path="/profile" element={userdata ? <Profile /> : <Navigate to={'/signup'} />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/viewcourses/:courseId" element={<ViewCourses />} />
        <Route path="/viewlectures/:courseId"
          element={
            <ProtectedCourseRoute>

              <ViewLectures />

            </ProtectedCourseRoute>

          }
        />
        <Route path="/my-courses" element={userdata ?  <MyCourses/> : <Navigate to={'/signup'} />} />
        <Route path="/dashboard" element={userdata?.role === 'educator' ? <Dashboard /> : <Navigate to={'/signup'} />} />
        <Route path="/managecourses" element={userdata?.role === 'educator' ? <Courses /> : <Navigate to={'/signup'} />} />
        <Route path="/createcourses" element={userdata?.role === 'educator' ? <CreateCourses /> : <Navigate to={'/signup'} />} />
        <Route path="/editcourses/:courseId" element={userdata?.role === 'educator' ? <EditCourses /> : <Navigate to={'/signup'} />} />
        <Route path="/createlectures/:courseId" element={userdata?.role === 'educator' ? <CreateLectures /> : <Navigate to={'/signup'} />} />
        <Route path="/editlecture/:courseId/:lectureId" element={userdata?.role === 'educator' ? <EditLectures /> : <Navigate to={'/signup'} />} />
        <Route path="/search" element={<SearchWithAi/>} />
      </Routes>
    </>
  )
}

export default App
