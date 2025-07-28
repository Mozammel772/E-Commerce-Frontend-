import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Profilio = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedBlogs = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get("/blog/blog?status=accepted");
        const data = res.data || [];
        setBlogs(data);
        setFilteredBlogs(data);

        const uniqueCategories = [
          ...new Set(data.map((b) => b.category || "Uncategorized")),
        ];
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        console.error("Failed to load blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedBlogs();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((b) => b.category === category);
      setFilteredBlogs(filtered);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <TittleAnimation
        tittle="Total Approved Post"
        subtittle={`Today All Approved Post (${filteredBlogs.length})`}
      />

      {/* Filter Dropdown */}
      <div className="flex justify-end my-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="select select-bordered border-orange-300 text-gray-700"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500 p-5">No approved blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="card w-full bg-white border border-orange-100 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              <figure className="rounded-t-2xl overflow-hidden p-2">
                <img
                  src={blog.afterImage || "https://via.placeholder.com/300x200"}
                  alt="Blog"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>

            
              <div className="card-body p-4 space-y-3 bg-orange-50">
                <p className="text-base text-gray-600">
                  Tittle:{" "}
                  <span className="text-orange-600 font-medium">
                    {blog.title?.slice(0, 40)} ...
                  </span>
                </p>
                <p className="text-base text-gray-600">
                  Category:{" "}
                  <span className="text-orange-600 font-medium">
                    {blog.category || "Uncategorized"}
                  </span>
                </p>
                <p className="text-base text-gray-600">
                  Content:{" "}
                 
                <div
                  className="line-clamp-3 prose max-w-none font-medium "
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.content?.slice(0, 100)),
                  }}
                ></div>
                </p>


                {/* Button */}
                <div className="card-actions pt-2">
                  <button
                    onClick={() => navigate(`/portfolio-details/${blog._id}`)}
                    className="btn w-[95%] btn-base lg:btn-lg bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 mx-auto"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profilio;
