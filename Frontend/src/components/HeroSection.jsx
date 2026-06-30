import React from "react";
import heroImage from "../assets/hero-banner.png"; // your uploaded image
import ai from "../assets/ai-removebg-preview.png"
import { useNavigate } from "react-router-dom";
import ExploreCourses from "./ExploreCourses";
const HeroSection = ({ scrollToExplore }) => {
  const navigate = useNavigate()
  return (
    <section className="relative w-full min-h-screen ">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-12">

        <div className="max-w-7xl flex flex-start w-full">

          <div className="max-w-3xl text-white">

            {/* TAG */}
            <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium mb-6">
              Learn • Grow • Achieve
            </div>

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Build Skills <br />
              Shape Your Future
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-200 max-w-2xl leading-relaxed">
              Join Skill Vault and learn from top educators, explore
              premium courses, and unlock opportunities for your future.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <button onClick={scrollToExplore} className="px-8 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                Explore Courses
              </button>
              <button onClick={()=>navigate('/search')} className="px-8 cursor-pointer py-4 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition duration-300 flex justify-center items-center gap-0.5 ">
                <img src={ai} alt="ai" className="w-8" /> Search with Ai 
              </button>


            </div>

            {/* STATS */}
            <div className="mt-12 flex flex-wrap gap-8 sm:gap-12">

              <div>
                <h2 className="text-3xl sm:text-4xl font-black">
                  10K+
                </h2>

                <p className="text-zinc-300 mt-1 text-sm">
                  Students
                </p>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black">
                  500+
                </h2>

                <p className="text-zinc-300 mt-1 text-sm">
                  Courses
                </p>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black">
                  120+
                </h2>

                <p className="text-zinc-300 mt-1 text-sm">
                  Educators
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;