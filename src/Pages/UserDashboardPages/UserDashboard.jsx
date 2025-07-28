import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import "./QuillCustom.css";

const UserDashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const handleImageChange = (e, type) => {
    if (type === "before") setBeforeImage(e.target.files[0]);
    else if (type === "after") setAfterImage(e.target.files[0]);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

    const response = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );

    if (response.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error("Image upload failed.");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!editorContent || editorContent === "<p><br></p>") {
      Swal.fire({
        icon: "error",
        title: "Empty Content!",
        text: "Blog content cannot be empty.",
      });
      setLoading(false);
      return;
    }

    try {
      let beforeImageUrl = "";
      let afterImageUrl = "";

      if (beforeImage) beforeImageUrl = await uploadImage(beforeImage);
      if (afterImage) afterImageUrl = await uploadImage(afterImage);

      const blogData = {
        title: data.title,
        category: data.category,
        review: data.review,
        content: editorContent,
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        createdAt: new Date().toISOString(),
        name: user.name,
        email: user.email,
        role: user.role,
      };

      console.log(blogData);

      const res = await axiosPublic.post("/blog/blog", blogData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Blog Created!",
          text: "Your blog has been posted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setBeforeImage(null);
        setAfterImage(null);
        setEditorContent("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Blog post creation failed.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   if (!editorContent || editorContent === "<p><br></p>") {
  //     toast.error("Blog content cannot be empty.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     let beforeImageUrl = "";
  //     let afterImageUrl = "";

  //     if (beforeImage) beforeImageUrl = await uploadImage(beforeImage);
  //     if (afterImage) afterImageUrl = await uploadImage(afterImage);

  //     const blogData = {
  //       title: data.title,
  //       category: data.category,
  //       review: data.review,
  //       content: editorContent,
  //       beforeImage: beforeImageUrl,
  //       afterImage: afterImageUrl,
  //       createdAt: new Date().toISOString(),
  //       name: user.name,
  //       email: user.email,
  //       role: user.role,
  //     };
  //     console.log(blogData);
  //     const res = await axiosPublic.post("/blog/blog", blogData);
  //     if (res.status === 200 || res.status === 201) {
  //       toast.success("Blog post created successfully!");
  //       reset();
  //       setBeforeImage(null);
  //       setAfterImage(null);
  //       setEditorContent("");
  //     } else {
  //       toast.error("Failed to create blog post.");
  //     }
  //   } catch (err) {
  //     toast.error(err.message || "Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "clean"],
    ],
  };

  return (
    <div className="min-h-screen flex justify-center items-center  px-1 md:px-4 py-12 bg-white">
      <Helmet>
        <title>Admin | Create Blog Post</title>
      </Helmet>

      <div className="w-full max-w-7xl border border-orange-300 rounded-xl bg-white shadow-lg p-4 md:p-8">
        <TittleAnimation
          tittle="Create Services Post"
          subtittle="Services Post"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-base md:text-lg font-semibold text-orange-700">
              Title :
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full bg-orange-50 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-orange-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Service Category */}
          <div>
            <label className="block mb-1  font-semibold text-orange-700 text-base md:text-lg">
              Category :
            </label>
            <select
              {...register("category", {
                required: "Service category is required",
              })}
              className="select select-bordered w-full bg-orange-50 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="">Select a service</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Painter">Painter</option>
            </select>
            {errors.category && (
              <p className="text-orange-600 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-base md:text-lg font-semibold text-orange-700">
              Reviews :
            </label>
            <textarea
              rows={4}
              {...register("review", { required: "Review is required" })}
              className="textarea textarea-bordered w-full bg-orange-50 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="Write your review here..."
            />
            {errors.title && (
              <p className="text-orange-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Editor */}
          <div>
            <label className="block mb-1 font-semibold text-orange-700 text-base md:text-lg">
              Content :
            </label>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              modules={quillModules}
              className="bg-white rounded-lg border border-orange-200"
            />
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-semibold text-orange-700">
                Before Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "before")}
                className="file-input file-input-bordered w-full bg-orange-50 border-orange-200"
              />
              {beforeImage && (
                <img
                  src={URL.createObjectURL(beforeImage)}
                  alt="Before Preview"
                  className="mt-4 w-full h-40 object-cover rounded-md border border-orange-300"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-orange-700">
                After Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "after")}
                className="file-input file-input-bordered w-full bg-orange-50 border-orange-200"
              />
              {afterImage && (
                <img
                  src={URL.createObjectURL(afterImage)}
                  alt="After Preview"
                  className="mt-4 w-full h-40 object-cover rounded-md border border-orange-300"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
              )}
            </div>
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full btn-base lg:btn-lg text-white text-lg font-semibold transition ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Posting..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
