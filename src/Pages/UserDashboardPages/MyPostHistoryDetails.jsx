import { format } from "date-fns";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyPostHistoryDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy, h:mm a"); // Example: June 15, 2025, 7:30 PM
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setActionLoading(true);
        await axiosPublic.delete(`/blog/blog/${id}`);

        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your post has been successfully deleted.",
          confirmButtonColor: "#d97706",
        });

        navigate("/user-dashboard/my-post-history");
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/user-dashboard/my-post-history-details/edit/${id}`);
  };
  const handleOnSiteVisit = () => {
    navigate(`/user-dashboard/my-post-history-details/on/site/visit/${id}`);
  };
  const handleDefectClaim = () => {
    navigate(`/user-dashboard/my-post-history-details/defect/claim/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (!blog) return <div className="text-center p-5">No blog found.</div>;

  return (
    <div>
      <div className="max-w-7xl mx-auto p-2 space-y-10">
        <TittleAnimation
          tittle="Pending Blog Details"
          subtittle="Admin Reviews"
        />

        <div className="bg-white border border-orange-100 rounded-xl shadow hover:shadow-md transition">
          <ImageComparison before={blog.beforeImage} after={blog.afterImage} />

          <div className="p-4 space-y-4">
            <div className="py-2">
              <p className="text-sm text-orange-600 italic">
                📅 Published on {formatDate(blog.createdAt)}
              </p>
            </div>
            <div className="py-5">
              <h2 className="text-xl font-semibold text-orange-700">
                {blog.title}
              </h2>
            </div>
            <div className="bg-orange-50 border-l-4  border-orange-400 shadow-md rounded-lg p-10 flex items-start gap-4 min-h-[250px] md:min-h-[300px]">
              <img
                src={blog.beforeImage}
                alt="Client"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-orange-600">
                  {blog.authorName}
                </p>
                <div className="text-yellow-500 text-sm mb-2">★★★★☆</div>
                <p className="text-gray-700">{blog.review}</p>
              </div>
            </div>
            <div className="pt-5">
              <div
                className="prose text-gray-700 max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.content),
                }}
              />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full py-10">
              {blog.status === "pending" && (
                <button
                  onClick={handleEdit}
                  className="w-full btn btn-base lg:btn-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                className="w-full btn btn-base lg:btn-lg bg-red-500 hover:bg-red-600 text-white"
                disabled={actionLoading}
              >
                <FaTrash className="mr-1" /> Delete
              </button>
              {blog.status === "accepted" && (
                <button
                  onClick={handleDefectClaim}
                  className="w-full btn btn-base lg:btn-lg bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <FaEdit className="mr-1" /> Defect Claim
                </button>
              )}
              {blog.status === "accepted" && (
                <button
                  onClick={handleOnSiteVisit}
                  className="w-full btn btn-base lg:btn-lg bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <FaEdit className="mr-1" /> On Site Visit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Image Comparison
const ImageComparison = ({ before, after }) => {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    setSliderPos(Math.max(10, Math.min(90, percentage)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350px] overflow-hidden rounded-t-xl"
      onMouseMove={handleMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove({ clientX: touch.clientX });
      }}
      onTouchEnd={() => setIsDragging(false)}
    >
      <img
        src={after}
        alt="After"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img src={before} alt="Before" className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute top-0 h-full border-l-4 border-orange-700 z-20"
        style={{ left: `${sliderPos}%` }}
      />
      <div
        className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${sliderPos}%` }}
      >
        <div
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="w-14 h-14 bg-white border-4 border-orange-600 rounded-full shadow-lg flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl cursor-move">
            <BsArrowsMove />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostHistoryDetails;
