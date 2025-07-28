import { Swiper, SwiperSlide } from "swiper/react";
import banner from "../../../public/Banner.jpg";
import banner2 from "../../../public/Banner2.jpg";
import banner3 from "../../../public/Before1.jpg";
import banner4 from "../../../public/Before2.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Banner = () => {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const intervalRef = useRef(null);

  // Reset countdown on slide change
  const resetCountdown = () => {
    clearInterval(intervalRef.current);
    setSecondsLeft(3);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          return 3;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    resetCountdown(); // Initial start

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={resetCountdown} // ✅ Reset timer on each slide
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-lg"
      >
        {[banner, banner2, banner3, banner4, banner].map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`Slide ${i + 1}`}
              className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}

        {/* ⏱ Countdown Timer in Bottom Right */}
        <div className="absolute right-5 bottom-14 bg-indigo-900 bg-opacity-100 text-white text-base p-3 px-4 rounded-full z-10">
          {secondsLeft}s
        </div>
      </Swiper>

      {/* 🟣 Pagination dots below image */}
      <style>
        {`
          .swiper-pagination {
            margin-top: 20px;
            position: static !important;
            text-align: center;
          }

          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #9ca3af;
            opacity: 1;
            transition: background 0.3s;
          }

          .swiper-pagination-bullet-active {
            background: #3b82f6;
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
