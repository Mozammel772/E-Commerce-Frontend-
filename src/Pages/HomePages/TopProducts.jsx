// import { useEffect, useState } from "react";
// import { data, Link } from "react-router-dom";

// const TopProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://backend.droploo.com/api/products")
//       .then(res => res.json())
//       .then(data => {
//         // Map the fetched products into a cleaner format
//         const mapped = data.products.map(item => ({
//           id: item.id,
//           title: item.title,
//           image: item.thumbnail,
//           price: item.price,
//           oldPrice: Math.round(item.price * (1 + item.discountPercentage / 100)),
//           rating: Math.round(item.rating),
//           hot: item.rating > 4.5,
//         }));
//         setProducts(mapped);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error:", err);
//         setLoading(false);
//       });
//   }, []);
// console.log("products data",data)
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-6 uppercase">Top Products</h1>

//       {/* Skeleton Loader when loading */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="flex flex-col gap-4 border rounded-md shadow p-3 animate-pulse"
//             >
//               <div className="skeleton h-52 w-full rounded"></div>
//               <div className="skeleton h-4 w-1/2"></div>
//               <div className="skeleton h-4 w-2/3"></div>
//               <div className="skeleton h-8 w-full rounded"></div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         // Actual product card
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map(p => (
//             <div
//               key={p.id}
//               className="border rounded-md shadow hover:shadow-2xl hover:border-teal-300 transition duration-200 overflow-hidden"
//             >
//               <div className="relative">
//                 {/* Clicking image will go to product details page */}
//                 <Link to={`/product/${p.id}`}>
//                   <img
//                     src={p.image}
//                     alt={p.title}
//                     className="w-full h-52 object-cover cursor-pointer"
//                     onError={e => (e.target.src = "/images/fallback.jpg")} // fallback if image broken
//                   />
//                 </Link>
//                 {/* Hot badge */}
//                 {p.hot && (
//                   <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
//                     HOT
//                   </span>
//                 )}
//               </div>
//               <div className="p-3">
//                 <h2 className="text-sm font-semibold text-gray-800 truncate">
//                   {p.title}
//                 </h2>
//                 <div className="text-yellow-500 text-sm mt-1">
//                   {"★".repeat(p.rating) + "☆".repeat(5 - p.rating)}
//                 </div>
//                 <div className="mt-1 text-sm">
//                   <span className="text-green-600 font-semibold mr-2">
//                     ${p.price}.00
//                   </span>
//                   <span className="line-through text-gray-400">
//                     ${p.oldPrice}.00
//                   </span>
//                 </div>
//                 <button className="mt-2 w-full bg-teal-600 hover:bg-teal-700 text-white py-1 rounded">
//                   QUICK ORDER
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopProducts;




import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// 🔹 Fetch products function
const fetchProducts = async () => {
  const res = await fetch("https://backend.droploo.com/api/feature/products/list");
  const data = await res.json();
  return data.products;
};

const TopProducts = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchProducts,
  });
console.log("products data",products)
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 uppercase">Top Products</h1>

      {/* 🔄 Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 border rounded-md shadow p-3 animate-pulse"
            >
              <div className="skeleton h-52 w-full rounded"></div>
              <div className="skeleton h-4 w-1/2"></div>
              <div className="skeleton h-4 w-2/3"></div>
              <div className="skeleton h-8 w-full rounded"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load products.</p>
      ) : (
        // ✅ Product List
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => {
            const price = item.discount_price || item.regular_price;
            const oldPrice = item.discount_price ? item.regular_price : null;
            const rating = Math.round(item.rating || 0);
            const hot = rating >= 4.5;

            return (
              <div
                key={item.id}
                className="border rounded-md shadow hover:shadow-2xl hover:border-teal-300 transition duration-200 overflow-hidden"
              >
                <div className="relative">
                  <Link to={`/product/${item.slug}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-52 object-cover cursor-pointer"
                      onError={(e) => (e.target.src = "/images/fallback.jpg")}
                    />
                  </Link>
                  {hot && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      HOT
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </h2>
                  <div className="text-yellow-500 text-sm mt-1">
                    {"★".repeat(rating) + "☆".repeat(5 - rating)}
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="text-green-600 font-semibold mr-2">
                      ৳{price}
                    </span>
                    {oldPrice && (
                      <span className="line-through text-gray-400">
                        ৳{oldPrice}
                      </span>
                    )}
                  </div>
                  <button className="mt-2 w-full bg-teal-600 hover:bg-teal-700 text-white py-1 rounded">
                    QUICK ORDER
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopProducts;
