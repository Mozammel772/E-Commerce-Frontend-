import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyPostHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Status Badge Generator
  const getStatusBadge = (status) => {
    const statusMap = {
      accepted: { label: "Accepted", bg: "bg-green-500" },
      pending: { label: "Pending", bg: "bg-yellow-500" },
      rejected: { label: "Rejected", bg: "bg-red-500" },
    };
    const current = statusMap[status] || {
      label: "Unknown",
      bg: "bg-gray-500",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${current.bg}`}
      >
        {current.label}
      </span>
    );
  };

  // ✅ Fetch Blogs by Email
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/blog/blog?email=${user?.email}`);

        console.log(res);
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Failed to load blogs", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchBlogs();
  }, [user, axiosPublic]);

  if (loading) return <LoadingSpinner />;
  console.log("ehdsa", user.email);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <TittleAnimation
        tittle="Total Post History"
        subtittle={`Total Posts (${blogs.length})`}
      />

      {blogs.length === 0 ? (
        <p className="text-gray-500 p-5">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card w-full bg-white border border-orange-200 rounded-xl shadow-2xl hover:shadow-lg transition duration-300"
            >
              <figure className="rounded-t-2xl overflow-hidden p-2">
                <img
                  src={blog.afterImage || "https://via.placeholder.com/300x200"}
                  alt="Blog"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>

              <div className="card-body p-4 space-y-3 bg-orange-50">
                <p className="text-base text-gray-600">
                  Title:{" "}
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

                {/* ✅ Status Badge */}
                <p className="text-base text-gray-600">
                  Status: {getStatusBadge(blog.status)}
                </p>

                <p className="text-base text-gray-600">
                  Content:
                  <div
                    className="line-clamp-3 prose max-w-none font-medium"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(blog.content?.slice(0, 100)),
                    }}
                  ></div>
                </p>

                <div className="card-actions pt-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/user-dashboard/my-post-history-details/${blog._id}`
                      )
                    }
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

export default MyPostHistory;
