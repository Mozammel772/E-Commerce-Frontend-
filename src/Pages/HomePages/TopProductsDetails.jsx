// import { useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";
// import { useParams } from "react-router-dom";

// const TopProductsDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     fetch(`https://backend.droploo.com/api/feature/products/list/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const stockAvailable = data.stock !== undefined ? data.stock : 0;
//         setProduct({ ...data, inStock: stockAvailable > 0, stock: stockAvailable });
//         setMainImage(data.thumbnail);
//         setLoading(false);
//         setQuantity(1);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   const handleQuantityChange = (amount) => {
//     setQuantity((prev) => {
//       const newQty = prev + amount;
//       if (newQty < 1) return 1;
//       if (newQty > product.stock) return product.stock;
//       return newQty;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <div className="flex flex-col md:flex-row gap-10">
//           {/* Left Skeleton for Image */}
//           <div className="flex w-full md:w-1/2 flex-col gap-4">
//             <div className="skeleton h-80 w-full rounded"></div>
//             <div className="flex gap-2">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="skeleton h-20 w-20 rounded"></div>
//               ))}
//             </div>
//           </div>

//           {/* Right Skeleton for Details */}
//           <div className="flex w-full md:w-1/2 flex-col gap-4">
//             <div className="skeleton h-8 w-3/4"></div>
//             <div className="skeleton h-4 w-1/2"></div>
//             <div className="skeleton h-4 w-1/3"></div>
//             <div className="skeleton h-6 w-1/4"></div>
//             <div className="skeleton h-4 w-1/4"></div>
//             <div className="skeleton h-12 w-full mt-4"></div>
//             <div className="skeleton h-12 w-full"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return <p className="text-center mt-10">Product not found.</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-10">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left: Image Section */}
//         <div className="md:w-1/2 space-y-4">
//           <div className="border rounded-md p-2 bg-white shadow-md group overflow-hidden">
//             <img
//               src={mainImage}
//               alt={product.title}
//               className="w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
//               onError={(e) => (e.target.src = "/images/fallback.jpg")}
//             />
//           </div>

//           <div className="flex gap-2 overflow-x-auto scrollbar-hide">
//             {product?.images?.slice(0, 5).map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`thumbnail-${idx}`}
//                 className={`h-20 w-20 object-cover border rounded cursor-pointer transition transform hover:scale-105 ${
//                   mainImage === img ? "border-teal-600 scale-110" : ""
//                 }`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right: Product Details */}
//         <div className="md:w-1/2 space-y-4">
//           <h1 className="text-3xl font-bold">{product.title}</h1>

//           <p className="text-gray-600">
//             Brand: <span className="font-semibold">{product.brand}</span>
//           </p>
//           <p className="text-gray-600">
//             Category: <span className="font-semibold">{product.category}</span>
//           </p>

//           <div className="flex items-center text-yellow-500">
//             Rating: {product.rating}
//             <div className="flex ml-2">
//               {[...Array(Math.floor(product.rating))].map((_, i) => (
//                 <FaStar key={i} className="text-yellow-400" />
//               ))}
//             </div>
//           </div>

//           <div className="text-2xl font-bold text-green-700">${product.price}</div>
//           <p className="text-gray-400 line-through">
//             Original Price: $
//             {Math.round(product.price * (1 + product.discountPercentage / 100))}
//           </p>

//           {product.inStock ? (
//             <>
//               <p className="text-gray-700 font-semibold">
//                 Stock Available: <span className="text-green-600">{product.stock}</span>
//               </p>

//               <div className="mt-2 flex items-center gap-2">
//                 <span className="font-semibold">Quantity:</span>
//                 <button
//                   onClick={() => handleQuantityChange(-1)}
//                   className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center select-none"
//                   aria-label="Decrease quantity"
//                 >
//                   –
//                 </button>
//                 <span className="w-8 text-center">{quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange(1)}
//                   className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center select-none"
//                   aria-label="Increase quantity"
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="flex gap-4 mt-4">
//                 <button
//                   onClick={() => alert(`Added ${quantity} items to cart.`)}
//                   className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded font-semibold transition"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => alert(`Purchased ${quantity} items.`)}
//                   className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-semibold transition"
//                 >
//                   Purchase
//                 </button>
//               </div>
//             </>
//           ) : (
//             <button
//               disabled
//               className="w-full mt-4 bg-gray-400 text-white py-3 rounded font-semibold cursor-not-allowed"
//             >
//               Stock Out
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-2">Product Description</h2>
//         <p className="text-gray-700 leading-relaxed">{product.description}</p>
//       </div>
//     </div>
//   );
// };

// export default TopProductsDetails;


import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const fetchProductBySlug = async (slug) => {
  const res = await fetch(`https://backend.droploo.com/api/feature/products/list/slug/${slug}`);
  
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

const TopProductsDetails = () => {
  const { slug } = useParams(); // 🟢 taking slug from URL
console.log("slug", slug)
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.imageUrl) {
      setMainImage(product.imageUrl);
    }
  }, [product]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQty = prev + amount;
      if (newQty < 1) return 1;
      if (newQty > product.qty) return product.qty;
      return newQty;
    });
  };

  if (isLoading) return <p className="p-10 text-center">Loading...</p>;
  if (error) return <p className="p-10 text-center">Failed to load product.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="md:w-1/2 space-y-4">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full rounded-md object-cover shadow"
            onError={(e) => (e.target.src = "/images/fallback.jpg")}
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center text-yellow-500">
            Rating: {product.rating}
            <div className="flex ml-2">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
          </div>

          <div className="text-2xl font-bold text-green-700">
            ৳{product.discount_price}
          </div>
          <p className="text-gray-400 line-through">৳{product.regular_price}</p>

          {product.qty > 0 ? (
            <>
              <p className="text-gray-700 font-semibold">
                In Stock: <span className="text-green-600">{product.qty}</span>
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold">Quantity:</span>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 bg-gray-200 rounded"
                >
                  –
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => alert(`Added ${quantity} items to cart.`)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded font-semibold"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => alert(`Purchased ${quantity} items.`)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-semibold"
                >
                  Purchase
                </button>
              </div>
            </>
          ) : (
            <button
              disabled
              className="w-full mt-4 bg-gray-400 text-white py-3 rounded font-semibold cursor-not-allowed"
            >
              Stock Out
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: product.long_description }}
        />
      </div>
    </div>
  );
};

export default TopProductsDetails;
