import React, { useState } from 'react'
import logo from '../assets/logo.jpeg'
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners"
import api from '../utils/axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../features/user/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
const SignUp = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student");
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch();
  const handleSignUp =  async () => {
    setLoading(true)
    try {
      const result = await api.post("/auth/signup", 
        {name ,email , password , role} , {withCredentials:true})
       console.log(result.data.data);
       dispatch(setUserData(result.data.data))
       setLoading(false)
       navigate("/")
      toast.success("SignUp Successfully")
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error(error.response.data.message)
      dispatch(setUserData(null))
      
    }
  }
  const handleGoogleSignUp = async () => {
    try {
      const res = await signInWithPopup(auth , provider)
      console.log(res);
      let user = res.user
      let gname = user.displayName
      let gemail = user.email

      const result = await api.post("/auth/googlesignup" , {
        name : gname, email: gemail , role
      }, {withCredentials : true})
        dispatch(setUserData(result.data.data))
       navigate("/")
      toast.success("SignUp Successfully")

    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-6 overflow-y-auto">

      <div className="w-full max-w-6xl min-h-[720px] lg:h-[92vh] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl bg-white">

        {/* LEFT SIDE */}
        <div className="relative bg-black flex flex-col justify-between p-6 lg:p-8">

          {/* Logo */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-center text-white">
              SKILL VAULT
            </h1>
          </div>

          {/* Image */}
          <div className="flex items-center justify-center flex-1 py-6">

            <div className="w-full max-w-md h-[260px] sm:h-[300px] lg:h-[360px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">

              <img
                src={logo}
                alt="Learning"
                className="w-full h-full object-cover opacity-90"
              />

            </div>

          </div>

          {/* Bottom Text */}
          <div className="text-center mt-4">

            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Learn. Teach. Grow.
            </h2>

            <p className="text-zinc-400 mt-3 text-sm leading-relaxed max-w-sm mx-auto">
              Join Skill Vault and unlock a modern learning experience
              for students and educators.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden mb-6 text-center">

              <h1 className="text-4xl font-black text-black">
                SKILL VAULT
              </h1>

            </div>

            {/* Heading */}
            <div className="mb-6">

              <h2 className="text-3xl font-bold text-black">
                Let's get started
              </h2>

              <p className="text-zinc-600 mt-1 text-sm">
                Create your account
              </p>

            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-5">

              <button
                onClick={() => setRole("student")}
                className={`py-3 rounded-xl border transition font-medium ${role === "student"
                    ? "bg-black text-white border-black"
                    : "border-zinc-300 text-black hover:bg-black hover:text-white"
                  }`}
              >
                Student
              </button>

              <button
                onClick={() => setRole("educator")}
                className={`py-3 rounded-xl border transition font-medium ${role === "educator"
                    ? "bg-black text-white border-black"
                    : "border-zinc-300 text-black hover:bg-black hover:text-white"
                  }`}
              >
                Educator
              </button>

            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={e=> e.preventDefault}>

              {/* Name */}
              <div>

                <label
                  htmlFor='name'
                  className="block text-sm text-zinc-700 mb-1.5"
                >
                  Name
                </label>

                <input
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                />

              </div>

              {/* Email */}
              <div>

                <label
                  htmlFor='email'
                  className="block text-sm text-zinc-700 mb-1.5"
                >
                  Email Address
                </label>

                <input
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                />

              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor='password'
                  className="block text-sm text-zinc-700 mb-1.5"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-zinc-100 border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

              </div>


              {/* Create Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-700 transition duration-300"
                disabled={loading}
                onClick={handleSignUp}
              >
                {loading ? <ClipLoader size={30} color='white'/>  : "Create Account"}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">

              <div className="flex-1 h-px bg-zinc-300"></div>

              <span className="text-zinc-500 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-zinc-300"></div>

            </div>

            {/* Google Login */}
            <button onClick={handleGoogleSignUp} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-zinc-300 bg-white text-black hover:bg-zinc-100 transition duration-300">

              <FcGoogle size={20}  />

              Continue with Google

            </button>

            {/* Footer */}
            <p className="text-center text-zinc-500 mt-6 text-sm">

              Already have an account?{" "}

              <span onClick={() => navigate("/login")} className="text-black hover:underline cursor-pointer font-medium">
                Login
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default SignUp