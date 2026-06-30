import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState(["", "", "", ""]);

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // SEND OTP
    const handleSendOtp = async () => {
        setLoading(true)
        try {
            
            const res  = await api.post('/auth/sendotp' , {email} , {withCredentials : true})
            toast.success(res.data.message)
            setLoading(false)
            setStep(2)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setLoading(false);
        }
    };

    // VERIFY OTP
    const handleVerifyOtp = async () => {
        setLoading(true)
        try {

           const res = await api.post('/auth/verifyotp' , {email , otp: otp.join("")} , {withCredentials : true})
            toast.success(res.data.message)
            setLoading(false)
            setStep(3)


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setLoading(false);
        }
    };

    // RESET PASSWORD
    const handleResetPassword = async () => {
        if(password != confirmPassword){
           return toast.error("Confirm password:Passwords mismatch")
        }
        setLoading(true)
        try {
            const res = await api.post('/auth/resetpassword' , {email , password })
            setLoading(true);
            toast.success(res.data.message)
            navigate('/login')

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setLoading(false);
        }
    };

    // OTP INPUT HANDLE
    const handleOtpChange = (value, index) => {

        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];

        updatedOtp[index] = value;

        setOtp(updatedOtp);

        // AUTO FOCUS NEXT INPUT
        if (value && index < 3) {

            document.getElementById(
                `otp-${index + 1}`
            ).focus();
        }
    };

    return (

        <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-6 overflow-y-auto">

            <div className="w-full max-w-6xl min-h-[720px] lg:h-[92vh] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl bg-white">

                {/* LEFT SIDE */}
                <div className="relative bg-black flex flex-col justify-between p-6 lg:p-8">

                    {/* LOGO */}
                    <div>

                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-center text-white">
                            SKILL VAULT
                        </h1>

                    </div>

                    {/* IMAGE */}
                    <div className="flex items-center justify-center flex-1 py-6">

                        <div className="w-full max-w-md h-[260px] sm:h-[300px] lg:h-[360px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">

                            <img
                                src={logo}
                                alt="Forget Password"
                                className="w-full h-full object-cover opacity-90"
                            />

                        </div>

                    </div>

                    {/* TEXT */}
                    <div className="text-center mt-4">

                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                            Reset Your Password
                        </h2>

                        <p className="text-zinc-400 mt-3 text-sm leading-relaxed max-w-sm mx-auto">
                            Secure your account and continue your learning journey.
                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">

                    <div className="w-full max-w-md">

                        {/* MOBILE LOGO */}
                        <div className="lg:hidden mb-6 text-center">

                            <h1 className="text-4xl font-black text-black">
                                SKILL VAULT
                            </h1>

                        </div>

                        {/* HEADING */}
                        <div className="mb-8">

                            <h2 className="text-3xl font-bold text-black">

                                {
                                    step === 1 && "Forgot Password"
                                }

                                {
                                    step === 2 && "Verify OTP"
                                }

                                {
                                    step === 3 && "Create New Password"
                                }

                            </h2>

                            <p className="text-zinc-600 mt-1 text-sm">

                                {
                                    step === 1 &&
                                    "Enter your email to receive OTP"
                                }

                                {
                                    step === 2 &&
                                    "Enter the 4 digit verification code"
                                }

                                {
                                    step === 3 &&
                                    "Create a strong new password"
                                }

                            </p>

                        </div>

                        {/* STEP 1 */}
                        {
                            step === 1 && (

                                <form
                                    className="space-y-5"
                                    onSubmit={(e) => e.preventDefault()}
                                >

                                    <div>

                                        <label className="block text-sm text-zinc-700 mb-1.5">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-3 rounded-xl bg-zinc-100 border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-700 transition duration-300"
                                    >

                                        {
                                            loading
                                                ? <ClipLoader size={28} color="white" />
                                                : "Send OTP"
                                        }

                                    </button>

                                </form>

                            )
                        }

                        {/* STEP 2 */}
                        {
                            step === 2 && (

                                <form
                                    className="space-y-6"
                                    onSubmit={(e) => e.preventDefault()}
                                >

                                    <div>

                                        <label className="block text-sm text-zinc-700 mb-4 text-center">
                                            Enter OTP
                                        </label>

                                        <div className="flex justify-center gap-3">

                                            {
                                                otp.map((digit, index) => (

                                                    <input
                                                        key={index}
                                                        id={`otp-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) =>
                                                            handleOtpChange(
                                                                e.target.value,
                                                                index
                                                            )
                                                        }
                                                        className="w-14 h-14 text-center text-xl font-bold rounded-xl bg-zinc-100 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black"
                                                    />

                                                ))
                                            }

                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleVerifyOtp}
                                        disabled={loading}
                                        className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-700 transition duration-300"
                                    >

                                        {
                                            loading
                                                ? <ClipLoader size={28} color="white" />
                                                : "Verify OTP"
                                        }

                                    </button>

                                </form>

                            )
                        }

                        {/* STEP 3 */}
                        {
                            step === 3 && (

                                <form
                                    className="space-y-5"
                                    onSubmit={(e) => e.preventDefault()}
                                >

                                    {/* PASSWORD */}
                                    <div>

                                        <label className="block text-sm text-zinc-700 mb-1.5">
                                            New Password
                                        </label>

                                        <div className="relative">

                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                placeholder="Enter new password"
                                                className="w-full px-4 py-3 pr-12 rounded-xl bg-zinc-100 border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black"
                                            >
                                                {
                                                    showPassword
                                                        ? <FaEyeSlash />
                                                        : <FaEye />
                                                }
                                            </button>

                                        </div>

                                    </div>

                                    {/* CONFIRM PASSWORD */}
                                    <div>

                                        <label className="block text-sm text-zinc-700 mb-1.5">
                                            Confirm Password
                                        </label>

                                        <div className="relative">

                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Confirm password"
                                                className="w-full px-4 py-3 pr-12 rounded-xl bg-zinc-100 border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black"
                                            >
                                                {
                                                    showConfirmPassword
                                                        ? <FaEyeSlash />
                                                        : <FaEye />
                                                }
                                            </button>

                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleResetPassword}
                                        disabled={loading}
                                        className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-700 transition duration-300"
                                    >

                                        {
                                            loading
                                                ? <ClipLoader size={28} color="white" />
                                                : "Save Password"
                                        }

                                    </button>

                                </form>

                            )
                        }

                        {/* FOOTER */}
                        <p className="text-center text-zinc-500 mt-8 text-sm">

                            Remember your password?{" "}

                            <span
                                onClick={() => navigate("/login")}
                                className="text-black hover:underline cursor-pointer font-medium"
                            >
                                Login
                            </span>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ForgetPassword;