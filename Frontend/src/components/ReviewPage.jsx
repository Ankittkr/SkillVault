import React from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


const ReviewPage = () => {

    const reviews = useSelector(
        (state) => state.review.reviewData
    )


    return (

        <section
            className="
py-24
px-6
bg-gradient-to-b
from-gray-100
to-white
"
        >


            <div
                className="
max-w-7xl
mx-auto
"
            >


                {/* HEADER */}

                <div
                    className="
text-center
mb-14
"
                >

                    <h2
                        className="
text-4xl
md:text-5xl
font-bold
text-black
"
                    >
                        Student Testimonials
                    </h2>


                    <p
                        className="
text-gray-500
mt-4
"
                    >
                        See what our students say about their learning journey
                    </p>


                </div>






                {/* CAROUSEL */}


                <Swiper

                    modules={[Autoplay, Pagination]}

                    spaceBetween={30}

                    slidesPerView={1}

                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}

                    pagination={{
                        clickable: true
                    }}


                    breakpoints={{

                        640: {
                            slidesPerView: 2
                        },


                        1024: {
                            slidesPerView: 3
                        }

                    }}


                    className="pb-14"


                >



                    {

                        reviews.map((review) => (


                            <SwiperSlide
                                key={review._id}
                                className="h-auto"
                            >


                                <ReviewCard

                                    review={review}

                                />


                            </SwiperSlide>


                        ))


                    }



                </Swiper>




            </div>


        </section>


    )

}


export default ReviewPage;