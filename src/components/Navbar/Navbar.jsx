// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import {
//   FaAngleDown,
//   FaAngleLeft,
//   FaAngleRight,
//   FaBars,
//   FaSearch,
//   FaShoppingCart,
//   FaTimes,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import logo from "../../../public/icon.jpg";

// const dropdownVariants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
// };
// const subItemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06 } }),
// };

// const Navbar = () => {
//   const [cats, setCats] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [subcategoryView, setSubcategoryView] = useState(false);
//   const [currentCat, setCurrentCat] = useState(null);

//   useEffect(() => {
//     fetch("https://backend.droploo.com/api/categories")
//       .then(res => res.json())
//       .then(json => {
//         if (json.success && Array.isArray(json.data)) {
//           setCats(json.data);
//           setSelectedCategory(json.data[0] || null);
//         }
//       })
//       .catch(err => console.error("Error loading categories:", err));
//   }, []);

//   const openSub = (cat) => {
//     if (cat.subcategories && cat.subcategories.length > 0) {
//       setCurrentCat(cat);
//       setSubcategoryView(true);
//     } else {
//       setMenuOpen(false);
//     }
//   };

//   return (
//     <div className="w-full shadow-md">
//       {/* Top bar and search UI (same as before) */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-2 text-xl font-bold text-teal-700">
//             <img src={logo} alt="Logo" className="w-10"/>
//             <span className="hidden sm:block">MART</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 rounded hover:bg-gray-200">
//               <FaSearch className="text-xl text-gray-600"/>
//             </button>
//             <div className="relative cursor-pointer">
//               <FaShoppingCart className="text-2xl text-teal-700"/>
//               <span className="badge badge-success badge-sm absolute -top-2 -right-2">2</span>
//             </div>
//             <button onClick={() => setMenuOpen(true)} className="text-2xl text-teal-700 md:hidden p-2 rounded hover:bg-gray-200">
//               <FaBars/>
//             </button>
//           </div>
//         </div>
//         {searchOpen && (
//           <div className="block md:hidden px-4 mt-2 transition-all duration-300">
//             <div className="flex">
//               <input type="search" placeholder="Search here..." className="input input-bordered w-full rounded-l-md border-teal-400"/>
//               <button className="bg-teal-600 text-white px-4 rounded-r-md hover:bg-teal-700" onClick={() => setSearchOpen(false)}>
//                 Search
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Desktop nav */}
//       <div className="hidden md:flex bg-teal-600 text-white w-full">
//         <div className="max-w-7xl mx-auto flex items-center space-x-6 py-2 px-4 w-full">
//           <div onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} className="relative">
//             <button className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded">
//               Categories <FaAngleDown/>
//             </button>
//             <AnimatePresence>
//               {dropdownOpen && selectedCategory && (
//                 <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full left-0 z-50 mt-2 bg-white text-black shadow-xl rounded-md border flex gap-2">
//                   <ul className="w-56 max-h-96 overflow-y-auto border border-teal-500 p-2 rounded-md -mt-1 space-y-1">
//                     {cats.map((c,index) => (
//                       <li key={c.id} onMouseEnter={() => setSelectedCategory(c)}
//                           className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-teal-100 ${
//                             selectedCategory.id === c.id ? "bg-teal-50 font-semibold" : ""
//                           }`}>
//                         <Link to={`/category/${c.slug}`} className="flex-1 text-left text-gray-700 hover:text-teal-700">{c.name}</Link>
//                         {c.subcategories && c.subcategories.length > 0 && <FaAngleRight className="text-gray-400"/>}
//                       </li>
//                     ))}
//                   </ul>
//                   <ul className="w-56 p-2 space-y-2 border border-teal-600 rounded-md">
//                     {selectedCategory.subcategories?.map((sub,i) => (
//                       <motion.li key={sub.id} custom={i} initial="hidden" animate="visible" variants={subItemVariants} className="hover:text-teal-600 cursor-pointer">
//                         <Link to={`/category/${selectedCategory.slug}/${sub.slug}`}>{sub.name}</Link>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/shop" className="hover:underline">Shop</Link>
//           <Link to="/offer-products" className="hover:underline">Offer Products</Link>
//           <Link to="/return-process" className="hover:underline">Return Process</Link>
//         </div>
//       </div>

//       {/* Mobile sidebar */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "tween" }}
//                         className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 overflow-y-auto md:hidden">
//               <div className="flex items-center justify-between px-3 py-3 border-b mb-3">
//                 <h2 className="text-xl font-semibold">{subcategoryView ? currentCat.name : "Menu"}</h2>
//                 <button onClick={() => setMenuOpen(false)}>
//                   <FaTimes className="text-xl"/>
//                 </button>
//               </div>
//               <div className="px-2 space-y-2 pb-4">
//                 {!subcategoryView ? (
//                   <>
//                     <Link to="/" className="block px-3 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100">Home</Link>
//                     <Link to="/products" className="block px-3 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100">Products</Link>
//                     {cats.map((c) => (
//                       <button key={c.id} onClick={() => openSub(c)}
//                               className="w-full flex justify-between items-center px-3 py-3 bg-gray-100 rounded hover:bg-teal-100 text-gray-700 font-semibold">
//                         <span>{c.name}</span>
//                         {c.subcategories && c.subcategories.length > 0 && <FaAngleRight className="text-gray-500"/>}
//                       </button>
//                     ))}
//                     <Link to="/about" className="block px-3 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100">About</Link>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => setSubcategoryView(false)}
//                             className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-teal-600">
//                       <FaAngleLeft/> Back
//                     </button>
//                     {currentCat.subcategories.map((sub) => (
//                       <Link key={sub.id} to={`/category/${currentCat.slug}/${sub.slug}`} onClick={() => setMenuOpen(false)}
//                             className="block px-5 py-2 font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded">
//                         {sub.name}
//                       </Link>
//                     ))}
//                   </>
//                 )}
//               </div>
//             </motion.div>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black z-40 md:hidden" onClick={() => setMenuOpen(false)}/>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Navbar;


import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../public/icon.jpg";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};
const subItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06 } }),
};

const Navbar = () => {
  const [cats, setCats] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subcategoryView, setSubcategoryView] = useState(false);
  const [currentCat, setCurrentCat] = useState(null);

  useEffect(() => {
    fetch("https://backend.droploo.com/api/categories")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setCats(json.data);
          setSelectedCategory(json.data[0] || null);
        }
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const openSub = (cat) => {
    if (cat.subcategories && cat.subcategories.length > 0) {
      setCurrentCat(cat);
      setSubcategoryView(true);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <div className="w-full shadow-md">
      {/* Top bar and search UI */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-xl font-bold text-teal-700">
            <img src={logo} alt="Logo" className="w-10" />
            <span className="hidden sm:block">MART</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-200"
            >
              <FaSearch className="text-xl text-gray-600" />
            </button>
            <div className="relative cursor-pointer">
              <FaShoppingCart className="text-2xl text-teal-700" />
              <span className="badge badge-success badge-sm absolute -top-2 -right-2">
                2
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl text-teal-700 md:hidden p-2 rounded hover:bg-gray-200"
            >
              <FaBars />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="block md:hidden px-4 mt-2 transition-all duration-300">
            <div className="flex">
              <input
                type="search"
                placeholder="Search here..."
                className="input input-bordered w-full rounded-l-md border-teal-400"
              />
              <button
                className="bg-teal-600 text-white px-4 rounded-r-md hover:bg-teal-700"
                onClick={() => setSearchOpen(false)}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex bg-teal-600 text-white w-full">
        <div className="max-w-7xl mx-auto flex items-center space-x-6 py-2 px-4 w-full">
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="relative"
          >
            <button className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded">
              Categories <FaAngleDown />
            </button>
            <AnimatePresence>
              {dropdownOpen && selectedCategory && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 z-50 mt-2 bg-white text-black shadow-xl rounded-md border flex gap-2"
                >
                  <ul className="w-56 max-h-96 overflow-y-auto border border-teal-500 p-2 rounded-md -mt-1 space-y-1">
                    {cats.map((c, index) => (
                      <li
                        key={c.id}
                        onMouseEnter={() => setSelectedCategory(c)}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-teal-100 ${
                          selectedCategory.id === c.id ? "bg-teal-50 font-semibold" : ""
                        }`}
                      >
                        <Link
                          to={`/category/${c.slug}`}
                          className="flex-1 text-left text-gray-700 hover:text-teal-700"
                        >
                          {c.name}
                        </Link>
                        {c.subcategories && c.subcategories.length > 0 && (
                          <FaAngleRight className="text-gray-400" />
                        )}
                      </li>
                    ))}
                  </ul>
                  <ul className="w-56 p-2 space-y-2 border border-teal-600 rounded-md">
                    {selectedCategory.subcategories?.map((sub, i) => (
                      <motion.li
                        key={sub.id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={subItemVariants}
                        className="hover:text-teal-600 cursor-pointer"
                      >
                        <Link to={`/category/${selectedCategory.slug}/${sub.slug}`}>
                          {sub.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
          <Link to="/offer-products" className="hover:underline">
            Offer Products
          </Link>
          <Link to="/return-process" className="hover:underline">
            Return Process
          </Link>
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between px-3 py-3 border-b mb-3">
                <h2 className="text-xl font-semibold">
                  {subcategoryView ? currentCat.name : "Menu"}
                </h2>
                <button onClick={() => setMenuOpen(false)}>
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <div className="px-2 space-y-2 pb-4">
                {!subcategoryView ? (
                  <>
                    <Link
                      to="/"
                      className="block px-3 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      className="block px-3 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100"
                    >
                      Products
                    </Link>
                    {cats.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => openSub(c)}
                        className="w-full flex justify-between items-center px-3 py-3 bg-gray-100 rounded hover:bg-teal-100 text-gray-700 font-semibold"
                      >
                        <span>{c.name}</span>
                        {c.subcategories && c.subcategories.length > 0 && (
                          <FaAngleRight className="text-gray-500" />
                        )}
                      </button>
                    ))}
                    <Link
                      to="/about"
                      className="block px-3 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100"
                    >
                      About
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSubcategoryView(false)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-teal-600 "
                    >
                      <FaAngleLeft /> Back
                    </button>

                    {/* Category name as clickable link */}
                    <Link
                      to={`/category/${currentCat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 bg-teal-50 text-teal-700 font-semibold  tracking-wide rounded hover:bg-teal-100"
                    >
                      {currentCat.name}
                    </Link>

                    {currentCat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/category/${currentCat.slug}/${sub.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="block px-5 py-2 font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
