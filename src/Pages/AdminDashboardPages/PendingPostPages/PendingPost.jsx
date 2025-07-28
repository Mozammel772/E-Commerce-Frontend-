import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PendingPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const fetchPendingBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get("/blog/blog?status=pending");
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto p-2">
      <TittleAnimation
        tittle="Total Pending Post"
        subtittle={`Today All Pending Post (${blogs.length})`}
      />

      {blogs.length === 0 ? (
        <div className="text-center p-5 space-y-4">
          <p className="text-gray-500">
            No pending blogs found or failed to load.
          </p>
          <button
            onClick={fetchPendingBlogs}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            🔁 Reload
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mt-6">
          {blogs.map((blog) => (
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
                    onClick={() =>
                      navigate(
                        `/admin-dashboard/post-management/pending-all-post-details/${blog._id}`
                      )
                    }
                    className="btn w-[95%] btn-base lg:btn-lg bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 mx-auto"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Content */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPost;
