
import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Card = ({ category, price, title, level, thumbnail, id  ,reviews }) => {
  
  const navigate = useNavigate();
   
  const calAvgRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + Number(review?.rating),
      0
    );

    return Number((total / reviews.length).toFixed(1));
  };

  const avgRating = calAvgRating(reviews);

  return (
    <div
      className="
      border border-gray-300 
      overflow-hidden 
      rounded-xl 
      bg-white
      hover:shadow-lg
      transition-all duration-300
      "
    >

      {/* IMAGE */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="
          w-full 
          h-full 
          object-cover
          hover:scale-105
          transition-transform
          duration-500
          "
        />
      </div>


      {/* CONTENT */}
      <div className="p-4 text-left">

        {/* TITLE */}
        <h3
          className="
          text-base 
          font-semibold 
          text-black
          line-clamp-2
          "
        >
          {title}
        </h3>


        {/* CATEGORY + LEVEL */}
        <div className="flex gap-2 mt-2">

          <span className="
          text-xs 
          bg-gray-100 
          px-2 
          py-1 
          rounded-md
          text-gray-700
          ">
            {category}
          </span>


          <span className="
          text-xs 
          bg-gray-100 
          px-2 
          py-1 
          rounded-md
          text-gray-700
          ">
            {level}
          </span>

        </div>


        {/* RATING */}
        <div className="flex items-center gap-2 mt-3">

          <p className="text-sm font-semibold text-black">
            {avgRating}
          </p>


          <div className="flex">
            {
              [1, 2, 3, 4, 5].map((star) => {

                if (star <= Math.floor(avgRating)) {
                  return (
                    <FaStar
                      key={star}
                      size={13}
                      className="text-yellow-500"
                    />
                  )
                }


                if (star - avgRating < 1) {
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


          <p className="text-xs text-gray-500">
           {reviews?.length}
          </p>

        </div>



        {/* PRICE + BUTTON */}
        <div className="
        flex 
        items-center 
        justify-between
        mt-4
        ">

          <p className="
          text-lg 
          font-bold
          text-black
          ">
            ₹{price}
          </p>


          <button
            onClick={() => navigate(`/viewcourses/${id}`)}
            className="
            px-4
            py-2
            text-sm
            rounded-lg
            bg-black
            text-white
            hover:bg-gray-800
            transition
            "
          >
            View Course
          </button>

        </div>


      </div>

    </div>
  );
};

export default Card;