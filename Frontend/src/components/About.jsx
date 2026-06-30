import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import about from "../assets/about.jpg"
import aboutVideo from "../assets/aboutVideo.mp4"
export  const About = () => {
  return (
    <section className="
    bg-gradient-to-br
from-gray-400
via-white
via-gray-400
to-white
py-20
px-6
    ">

      <div className="
      max-w-7xl
      mx-auto
      grid
      lg:grid-cols-2
      gap-14
      items-center
      ">


        {/* LEFT IMAGE SECTION */}

        <div className="
        relative
        flex
        justify-center
        ">


          {/* Main Image */}

          <img
            src={about}
            alt="learning"
            className="
            w-full
            max-w-lg
            h-[420px]
            object-cover
            rounded-xl
            "
          />



          {/* Video Floating Card */}

          <div className="
          absolute
          bottom-6
          right-0
          md:right-[-30px]
          bg-black
          rounded-xl
          overflow-hidden
          shadow-2xl
          w-[230px]
          md:w-[260px]
          ">


            <video
              className="
              w-full
              h-36
              object-cover
              "
              controls
              poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            >

              <source 
              src={aboutVideo}
              type="video/mp4"
              />

            </video>


          </div>



        </div>






        {/* RIGHT CONTENT */}


        <div>


          <div className="
          flex
          items-center
          gap-4
          mb-5
          ">

            <span className="
            text-sm
            font-medium
            text-gray-500
            ">
              About Us
            </span>


            <div className="
            w-10
            h-[2px]
            bg-black
            " />

          </div>





          <h1 className="
          text-4xl
          md:text-5xl
          font-bold
          leading-tight
          text-gray-900
          ">

            We Are Maximize Your
            <br/>
            Learning Growth

          </h1>




          <p className="
          mt-6
          text-gray-600
          leading-relaxed
          max-w-xl
          ">

            We provide a modern Learning Management System
            to simplify online education, track progress,
            and enhance student-instructor collaboration
            efficiently.

          </p>






          {/* FEATURES */}


          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-5
          mt-8
          ">


            {[
              "Simplified Learning",
              "Expert Trainers",
              "Big Experience",
              "Lifetime Access"
            ].map((item,index)=>(


              <div
              key={index}
              className="
              flex
              items-center
              gap-3
              "
              >


                <IoCheckmarkCircle
                className="
                text-black
                text-xl
                "
                />


                <span className="
                text-gray-700
                font-medium
                ">
                  {item}
                </span>


              </div>


            ))}


          </div>




        </div>


      </div>


    </section>
  );
};

