import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const OnSiteVisit = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    message: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setImage(selected);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=a616b7cb4177b6d22010843ec1f12500`,
      formData
    );
    return res.data?.data?.url || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const payload = {
        ...formData,
        image: imageUrl,
        email: user?.email,
        name: user?.name,
      };

      const res = await axiosPublic.post("/api/onsitevisits", payload);

      Swal.fire({
        icon: "success",
        title: "Submitted",
        text: res.data.message || "Your request has been sent.",
        confirmButtonColor: "#f97316",
      });

      // Reset form
      setFormData({
        date: "",
        time: "",
        message: "",
      });
      setImage(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-orange-200">
        <h2 className="text-2xl font-bold text-center text-orange-700 mb-6">
          Submit a Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label className="block text-orange-700 font-medium mb-1">
              Select Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full bg-orange-50 border-orange-300"
              placeholder="Choose date"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-orange-700 font-medium mb-1">
              Select Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="input input-bordered w-full bg-orange-50 border-orange-300"
              placeholder="Choose time"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-orange-700 font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="textarea textarea-bordered w-full bg-orange-50 border-orange-300"
              placeholder="Write your message here..."
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-orange-700 font-medium mb-1">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full bg-orange-50 border-orange-300"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-4 w-full h-52 object-cover rounded-md border border-orange-300"
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full text-white font-semibold transition ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnSiteVisit;
