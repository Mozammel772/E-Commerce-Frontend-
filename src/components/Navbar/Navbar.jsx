import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FaAngleDown,
  FaAngleRight,
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../public/icon.jpg";

const categories = [
  {
    name: "Electronic",
    path: "/electronic",
    subcategories: [
      { name: "Camera", path: "/electronic/camera" },
      { name: "Fan", path: "/electronic/fan" },
      { name: "Bluetooth", path: "/electronic/bluetooth" },
      { name: "Watch", path: "/electronic/watch" },
    ],
  },
  {
    name: "Health & Beauty",

    subcategories: [
      { name: "Hair Care", path: "/health-beauty/hair-care" },
      { name: "Personal Care", path: "/health-beauty/personal-care" },
      { name: "Men's Care", path: "/health-beauty/mens-care" },
      { name: "Medical Device", path: "/health-beauty/medical-device" },
      { name: "Health Care", path: "/health-beauty/health-care" },
    ],
  },
  {
    name: "Kitchen Tools",
    path: "/kitchen-tools",
    subcategories: [
      { name: "Blender", path: "/kitchen-tools/blender" },
      { name: "Microwave", path: "/kitchen-tools/microwave" },
      { name: "Knife Set", path: "/kitchen-tools/knife-set" },
    ],
  },
  {
    name: "LifeStyle",
    path: "/lifestyle",
    subcategories: [
      { name: "Sunglass", path: "/lifestyle/sunglass" },
      { name: "Wallet", path: "/lifestyle/wallet" },
      { name: "Bags", path: "/lifestyle/bags" },
    ],
  },
  {
    name: "Smart Gadgets",
    path: "/smart-gadgets",
    subcategories: [
      { name: "Mobile Accessories", path: "/smart-gadgets/mobile-accessories" },
      { name: "Air Buds", path: "/smart-gadgets/air-buds" },
      { name: "Smart Watch", path: "/smart-gadgets/smart-watch" },
    ],
  },
  {
    name: "Furniture and Decor",
    path: "/furniture-decor",
    subcategories: [
      { name: "Sofa", path: "/furniture-decor/sofa" },
      { name: "Table", path: "/furniture-decor/table" },
      { name: "Wall Frame", path: "/furniture-decor/wall-frame" },
    ],
  },
  {
    name: "All Food",
    path: "/all-food",
    subcategories: [
      { name: "Snacks", path: "/all-food/snacks" },
      { name: "Drinks", path: "/all-food/drinks" },
      { name: "Dry Food", path: "/all-food/dry-food" },
      { name: "Dry Food2", path: "/all-food/dry-food2" },
      { name: "Dry Food3", path: "/all-food/dry-food3" },
    ],
  },
  {
    name: "Computer",
    path: "/computer",
    subcategories: [
      { name: "Mouse", path: "/computer/mouse" },
      { name: "Keyboard", path: "/computer/keyboard" },
      { name: "Monitor", path: "/computer/monitor" },
    ],
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const subItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
    },
  }),
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleCategory = (name) => {
    setExpanded(expanded === name ? null : name);
  };

  return (
    <div className="w-full bg-white shadow-md  ">
      {/* Topbar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold text-teal-700">
            <img src={logo} alt="Logo" className="w-10" />
            <span className="hidden sm:block">MART</span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Mobile search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-200"
              aria-label="Toggle search"
            >
              <FaSearch className="text-xl text-gray-600" />
            </button>

            {/* Cart */}
            <div className="relative cursor-pointer" aria-label="Shopping cart">
              <FaShoppingCart className="text-2xl text-teal-700" />
              <span className="badge badge-success badge-sm absolute -top-2 -right-2">
                2
              </span>
            </div>

            {/* Mobile menu icon */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl text-teal-700 md:hidden p-2 rounded hover:bg-gray-200"
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="block md:hidden px-4 mt-2 transition-all duration-300">
            <div className="flex">
              <input
                type="search"
                placeholder="Search here..."
                className="input input-bordered w-full rounded-l-md border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Search"
              />
              <button
                className="bg-teal-600 text-white px-4 rounded-r-md hover:bg-teal-700 transition"
                aria-label="Submit search"
                onClick={() => setSearchOpen(false)}
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Desktop search bar */}
        <div className="hidden md:flex justify-center px-4 -mt-10 pb-2">
          <div className="flex w-full md:w-2/4 lg:w-1/2">
            <input
              type="search"
              placeholder="Search here..."
              className="input input-bordered w-full rounded-l-md border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Search"
            />
            <button
              className="bg-teal-600 text-white px-6 rounded-r-md hover:bg-teal-700 transition"
              aria-label="Submit search"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex bg-teal-600 text-white w-full">
        <div className="max-w-7xl mx-auto flex items-center space-x-6 py-2 px-4 w-full">
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded">
              Categories <FaAngleDown />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 z-50 mt-2 bg-white text-black shadow-xl rounded-md border flex gap-2"
                >
                  <ul className="w-56 max-h-96 overflow-y-auto border border-teal-500 p-2 rounded-md -mt-1 space-y-1">
                    {categories.map((cat, index) => (
                      <li
                        key={index}
                        onMouseEnter={() => setSelectedCategory(cat)}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-all duration-200
        hover:bg-teal-100 ${
          selectedCategory?.name === cat.name ? "bg-teal-50 font-semibold" : ""
        }`}
                      >
                        <Link
                          to={cat.path}
                          className="flex-1 text-left text-gray-700 hover:text-teal-700"
                        >
                          {cat.name}
                        </Link>

                        <FaAngleRight
                          className={`ml-2 text-sm transition-transform duration-300 ${
                            expanded === cat.name
                              ? "rotate-180 text-teal-600"
                              : "text-gray-400"
                          }`}
                        />
                      </li>
                    ))}
                  </ul>

                  <ul className="w-56 p-2 space-y-2 border border-teal-600 rounded-md">
                    {selectedCategory?.subcategories.map((sub, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={subItemVariants}
                        className="hover:text-teal-600 cursor-pointer"
                      >
                        <Link to={sub.path}>{sub.name}</Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/" className="hover:underline cursor-pointer">
            Home
          </Link>
          <Link to="/shop" className="hover:underline cursor-pointer">
            Shop
          </Link>
          <Link to="/offer-products" className="hover:underline cursor-pointer">
            Offer Products
          </Link>
          <Link to="/return-process" className="hover:underline cursor-pointer">
            Return Process
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
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
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="px-2 space-y-2 pb-4">
                {/* Animated Home and Products Links */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 * 0.05, duration: 0.3 }}
                >
                  <Link
                    to="/"
                    className="block px-2 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100"
                  >
                    Home
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 * 0.05, duration: 0.3 }}
                >
                  <Link
                    to="/products"
                    className="block px-2 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100"
                  >
                    Products
                  </Link>
                </motion.div>

                {/* Mobile Categories with Animated Expand */}
                {categories.map((cat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 + 0.1, duration: 0.3 }}
                  >
                    <button
                      onClick={() => toggleCategory(cat.name)}
                      className="w-full flex justify-between items-center px-3 py-3 bg-gray-100 rounded hover:bg-teal-100 text-gray-700 font-semibold"
                    >
                      <span>{cat.name}</span>
                      <FaAngleDown
                        className={`transition-transform duration-300 ${
                          expanded === cat.name
                            ? "rotate-180 text-teal-600"
                            : "text-gray-500"
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded === cat.name && (
                        <motion.ul
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={{
                            hidden: { height: 0, opacity: 0 },
                            visible: {
                              height: "auto",
                              opacity: 1,
                              transition: { duration: 0.3 },
                            },
                          }}
                          className="pl-6 overflow-hidden"
                        >
                          {cat.subcategories.map((sub, i) => (
                            <motion.li
                              key={i}
                              custom={i}
                              initial="hidden"
                              animate="visible"
                              variants={subItemVariants}
                              className="px-2 py-1 border-b rounded text-gray-600 hover:text-teal-600 hover:bg-gray-100 cursor-pointer"
                            >
                              <Link to={sub.path}>{sub.name}</Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: categories.length * 0.2 + 0.3,
                    duration: 0.3,
                  }}
                >
                  <Link
                    to="/about"
                    className="block px-2 py-2 font-medium bg-gray-100 rounded hover:bg-teal-100"
                  >
                    About
                  </Link>
                </motion.div>
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
