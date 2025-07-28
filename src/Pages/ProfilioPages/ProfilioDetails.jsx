import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fetchApprovedBlog = async (id) => {
  const res = await axios.get(`http://localhost:9000/blog/blog/${id}`);
  return res.data;
};

const ProfilioDetails = () => {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchApprovedBlog(id),
    enabled: !!id,
  });

  if (isLoading)
    return <LoadingSpinner/>
  if (isError)
    return (
      <div className="text-center text-red-600 p-5">Error: {error.message}</div>
    );
  if (!blog) return <div className="text-center p-5">Blog not found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-2 space-y-10">
      <TittleAnimation
        tittle="Pending Blog Details"
        subtittle="Admin Reviews"
      />

      <div className="bg-white border border-orange-200 rounded-xl shadow-2xl hover:shadow-md transition">
        <ImageComparison before={blog.beforeImage} after={blog.afterImage} />

        <div className="p-4 space-y-4">
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
              <p className="font-semibold text-orange-600">{blog.authorName}</p>
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

export default ProfilioDetails;
