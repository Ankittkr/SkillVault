import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewCard = ({ review }) => {

    return (

        <div
            className="
           bg-white
            border
            border-gray-200
            rounded-xl
            overflow-hidden
            shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            flex
            flex-col
            h-full
            mb-8
            "
        >


            {/* USER HEADER */}

            <div
                className="
                flex
                items-center
                gap-4
                px-5
                py-4
                bg-gray-100
                "
            >


                {
                                                            review?.user?.photoUrl ? (

                                            <div className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition">
                                                <img
                                                    src={review?.user?.photoUrl}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                        ) : (

                                            <div className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition">
                                                <div className="w-full h-full rounded-full flex justify-center items-center font-bold bg-black text-white">
                                                    {review?.user?.name[0].toUpperCase()}
                                                </div>
                                            </div>

                                        )
                }


                <div>

                    <h3
                        className="
                        text-lg
                        font-semibold
                        text-gray-900
                        "
                    >
                        {review?.user?.name || "Student"}
                    </h3>


                    <p
                        className="
                        text-sm
                        text-gray-500
                        "
                    >
                        {review?.user?.role}
                    </p>

                </div>


            </div>






            {/* CONTENT */}


            <div
                className="
                p-5
                flex
                flex-col
                h-full
                "
            >

                <div>

                    {/* COURSE NAME */}

                    <div
                        className="
                    mb-4
                    "
                    >

                        <span
                            className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-gray-400
                        "
                        >
                            Course Reviewed
                        </span>


                        <h4
                            className="
                        mt-1
                        font-semibold
                        text-black
                        line-clamp-1
                        "
                        >
                            {review?.course?.title || "Course"}
                        </h4>


                    </div>

                    {/* STAR */}

                    <div className="flex gap-1">


                        {
                            [1, 2, 3, 4, 5].map((star) => {

                                if (star <= Math.floor(review?.rating)) {
                                    return (
                                        <FaStar
                                            key={star}
                                            size={13}
                                            className="text-yellow-500"
                                        />
                                    )
                                }


                                if (star - review?.rating < 1) {
                                    return (
                                        <FaStarHalfAlt
                                            key={star}
                                            size={13}
                                            className="text-yellow-500"
                                        />
                                    )
                                }


                                return (
                                    <FaStar
                                        key={star}
                                        size={13}
                                        className="text-gray-300"
                                    />
                                )

                            })
                        }


                    </div>




                    {/* REVIEW */}


                    <p
                        className="
                    mt-5
                    text-gray-600
                    text-sm
                    leading-relaxed
                    "
                    >
                        "{review.comment.slice(0 , 100)}..."
                    </p>

                </div>




                <div
                    className="
                    mt-auto
                    pt-4
                    border-t
                    border-gray-200
                    flex
                    justify-between
                    items-center
                    "
                >

                    <span
                        className="
                        text-xs
                        text-gray-400
                        "
                    >
                        Verified Review
                    </span>


                    <span
                        className="
                        text-xs
                        font-semibold
                        "
                    >
                        ★ {review.rating}
                    </span>


                </div>


            </div>


        </div>


    )
}


export default ReviewCard;