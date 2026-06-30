import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpeg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { toast } from "react-toastify";
import { setUserData } from "../features/user/userSlice";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef();

    const userdata = useSelector(
        (state) => state.user.userData
    );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    const handleLogOut = async () => {

        try {

            const res = await api.get(
                "/auth/logout",
                {
                    withCredentials: true
                }
            );

            dispatch(setUserData(null));

            toast.success(res.data.message);

            navigate("/login");

        } catch (error) {

            console.log(
                error.response.data.message
            );

            toast.error(
                error.response.data.message
            );
        }
    };

    return (

        <nav className="w-full bg-gray-300 border-b border-white/10 sticky  top-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* NAVBAR */}
                <div className="flex items-center justify-between py-4">

                    {/* LEFT SIDE - LOGO */}
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-3 cursor-pointer"
                    >

                        <img
                            src={logo}
                            alt="Skill Vault Logo"
                            className="w-10 h-10 rounded-xl object-cover"
                        />

                        <h1 className="text-black text-lg sm:text-2xl font-black tracking-wide">
                            SKILL VAULT
                        </h1>
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-5">

                        {/* Dashboard */}
                        {
                            userdata?.role === "educator" && (
                                <button onClick={ ()=>navigate('/dashboard')} className="cursor-pointer px-5 py-2 rounded-xl text-white bg-black hover:bg-black/80 transition font-medium">
                                    Dashboard
                                </button>
                            )
                        }

                        {/* Login / Logout */}
                        {
                            userdata ? (
                                <button
                                    onClick={handleLogOut}
                                    className="px-5 py-2 rounded-xl border border-black bg-white text-black font-semibold hover:bg-black hover:text-white transition duration-300"
                                >
                                    LogOut
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="px-5 py-2 rounded-xl text-white bg-black hover:bg-black/80 border border-white/20 transition duration-300"
                                >
                                    Login
                                </button>
                            )
                        }

                        {/* PROFILE DROPDOWN */}
                        <div
                            className="relative"
                            ref={profileRef}
                        >

                            {/* PROFILE ICON */}
                            <div
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="cursor-pointer"
                            >

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

                            {/* DROPDOWN MENU */}
                            {
                                profileOpen  && (

                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">

                                        {/* USER INFO */}
                                        <div className="px-4 py-3 border-b border-zinc-200">

                                            <h2 className="font-semibold text-black">
                                                {userdata?.name || "Guest"}
                                            </h2>

                                            <p className="text-sm text-zinc-500 truncate">
                                                {userdata?.role || "Not Logged In"}
                                            </p>

                                        </div>

                                        {/* OPTIONS */}
                                        <div className="flex flex-col">

                                        {
                                            userdata && (
                                            <button
                                                onClick={() => {
                                                    navigate("/my-courses");
                                                    setProfileOpen(false);
                                                }}
                                                className="px-4 py-3 text-left hover:bg-zinc-100 transition"
                                            >
                                                My Courses
                                            </button>
                                                
                                            )
                                        }

                                            {userdata && <button
                                                onClick={() => {
                                                    navigate("/profile");
                                                    setProfileOpen(false);
                                                }}
                                                className="px-4 py-3 text-left hover:bg-zinc-100 transition"
                                            >
                                                Profile
                                            </button>}

                                            {userdata ?  <button
                                                onClick={handleLogOut}
                                                className="px-4 py-3 text-left text-red-500 hover:bg-red-50 transition"
                                            >
                                                Logout
                                            </button> : <button
                                                onClick={()=> navigate('/login')}
                                                className="px-4 py-3 text-left text-red-500 hover:bg-red-50 transition"
                                            >
                                                Login
                                            </button>}

                                        </div>

                                    </div>

                                )
                            }

                        </div>

                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-black"
                    >
                        {
                            menuOpen
                                ? <RxCross2 size={30} />
                                : <MdMenu size={30} />
                        }
                    </button>

                </div>
            </div>

            {/* MOBILE MENU */}
            {
                menuOpen && (

                    <div className="md:hidden bg-white border-t border-zinc-300 px-4 py-5 shadow-lg">

                        <div className="flex flex-col gap-4">

                            {/* Dashboard */}
                            {
                                userdata?.role === "educator" && (
                                    <button onClick={ ()=>navigate('/dashboard')} className="cursor-pointer w-full py-3 rounded-xl text-white bg-black hover:bg-black/80 transition">
                                        Dashboard
                                    </button>
                                )
                            }

                            {/* MY COURSES */}
                            {
                                userdata && (
                                    <button
                                        onClick={() => {
                                            navigate("/my-courses");
                                            setMenuOpen(false);
                                        }}
                                        className="w-full py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition"
                                    >
                                        My Courses
                                    </button>
                                )
                            }

                            {/* PROFILE */}
                            {
                                userdata && (
                                    <button
                                        onClick={() => {
                                            navigate("/profile");
                                            setMenuOpen(false);
                                        }}
                                        className="w-full py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition"
                                    >
                                        Profile
                                    </button>
                                )
                            }

                            {/* Login / Logout */}
                            {
                                userdata ? (
                                    <button
                                        onClick={handleLogOut}
                                        className="w-full py-3 rounded-xl border border-black bg-white text-black font-semibold hover:bg-black hover:text-white transition duration-300"
                                    >
                                        LogOut
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="w-full py-3 rounded-xl text-white bg-black hover:bg-black/80 transition duration-300"
                                    >
                                        Login
                                    </button>
                                )
                            }

                            {/* PROFILE SECTION */}
                            <div className="flex items-center gap-3 pt-3 border-t border-zinc-300">

                                {
                                    userdata ? (

                                        userdata?.photoUrl ? (

                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <img
                                                    src={userdata?.photoUrl}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                        ) : (

                                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                                                {userdata?.name[0].toUpperCase()}
                                            </div>

                                        )

                                    ) : (

                                        <IoPersonCircleSharp className="w-12 h-12 text-black" />

                                    )
                                }

                                <div>
                                    <h2 className="font-semibold text-black">
                                        {userdata?.name || "Guest"}
                                    </h2>

                                    <p className="text-sm text-zinc-500">
                                        {userdata?.role || "Not Logged In"}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                )
            }

        </nav>
    );
};

export default Navbar;