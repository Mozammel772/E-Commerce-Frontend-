// import { FaImage } from "react-icons/fa";
// import { Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";

// // Fallback component for missing or broken images
// const ImageFallback = () => (
//   <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-100 text-gray-500 mb-4 rounded text-sm">
//     <FaImage className="text-2xl mb-1" />
//     <span>Image not available</span>
//   </div>
// );

// // Category data
// const categories = [
  
//   {
//     name: "Computer",
//     img: "", // No image
//   },
//   {
//     name: "Smart Gadgets",
//     img: "",
//   },
//   {
//     name: "Furniture and Decor",
//     img: "",
//   },
//   {
//     name: "All Food",
//     img: "",
//   },
//   {
//     name: "Computer",
//     img: "", // No image
//   },
//   {
//     name: "Computer",
//     img: "", // No image
//   },
//   {
//     name: "Smart Gadgets",
//     img: "",
//   },
//   {
//     name: "Furniture and Decor",
//     img: "",
//   },
//   {
//     name: "All Food",
//     img: "",
//   },
//   {
//     name: "Computer",
//     img: "", // No image
//   },
// ];

// const TopCategories = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-6">TOP CATEGORIES</h2>

//       <Swiper
//         spaceBetween={20}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         breakpoints={{
//           320: { slidesPerView: 1.5 },
//           640: { slidesPerView: 2.5 },
//           768: { slidesPerView: 3.5 },
//           1024: { slidesPerView: 4.5 },
//           1280: { slidesPerView: 5.5 },
//         }}
//         modules={[Autoplay]}
//       >
//         {categories.map((category, i) => (
//           <SwiperSlide key={i}>
//             <div className="bg-white rounded-md shadow  transition-all duration-300 cursor-pointer p-4 text-center border hover:shadow-2xl hover:border-indigo-300">
//               {category.img ? (
//                 <img
//                   src={category.img}
//                   alt={category.name}
//                   className="w-full h-40 object-contain mb-4 rounded"
//                   onError={(e) => {
//                     e.currentTarget.onerror = null;
//                     e.currentTarget.style.display = "none";
//                     const fallback = document.createElement("div");
//                     fallback.innerHTML = `
//                       <div class="w-full h-40 flex flex-col items-center justify-center bg-gray-100 text-gray-500 mb-4 rounded text-sm">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mb-1">
//                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h18M3 10h18M3 15h18M3 20h18" />
//                         </svg>
//                         <span>Image not available</span>
//                       </div>`;
//                     e.currentTarget.parentNode.insertAdjacentHTML("beforeend", fallback.innerHTML);
//                   }}
//                 />
//               ) : (
//                 <ImageFallback />
//               )}
//               <p className="font-medium">{category.name}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TopCategories;




import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

// Fallback image component
const ImageFallback = () => (
  <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-100 text-gray-500 mb-4 rounded text-sm">
    <FaImage className="text-2xl mb-1" />
    <span>Image not available</span>
  </div>
);

// Simulated category data (replace this with real API if needed)
const demoCategories = [
  { name: "Computer", img: "" },
  { name: "Smart Gadgets", img: "" },
  { name: "Furniture and Decor", img: "" },
  { name: "All Food", img: "" },
  { name: "Home Appliances", img: "" },
  { name: "Accessories", img: "" },
  { name: "Gaming", img: "" },
  { name: "Wearable Tech", img: "" },
];

const TopCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulating API loading delay
    setTimeout(() => {
      setCategories(demoCategories); // Set demo data
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">TOP CATEGORIES</h2>

      {/* Loading skeleton while data is being fetched */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-4 bg-white rounded-md shadow flex flex-col gap-4 animate-pulse">
              <div className="skeleton h-40 w-full rounded"></div>
              <div className="skeleton h-4 w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 4.5 },
            1280: { slidesPerView: 5.5 },
          }}
          modules={[Autoplay]}
        >
          {categories.map((category, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-md shadow transition-all duration-300 cursor-pointer p-4 text-center border hover:shadow-2xl hover:border-indigo-300">
                {/* Show image if available, otherwise fallback */}
                {category.img ? (
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-40 object-contain mb-4 rounded"
                    onError={(e) => (e.target.src = "/images/fallback.jpg")}
                  />
                ) : (
                  <ImageFallback />
                )}
                <p className="font-medium">{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopCategories;
