import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Quote = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/bookings",
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        text: res.data.message,
        confirmButtonColor: "#f97316", // orange
      });
      setFormData({
        date: "",
        time: "",
        name: "",
        phone: "",
        message: "",
        email: user.email,
        registerName: user.name,
      });
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Time Slot Unavailable",
          text: "This time slot is already booked. Please select a different time.",
          confirmButtonColor: "#f97316",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong!",
          text: "Failed to submit your request. Please try again.",
          confirmButtonColor: "#f97316",
        });
      }
    }
  };

  console.log(formData)
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
        <h2 className="text-2xl font-bold text-center text-orange-700 mb-6">
          Get a Quote
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block font-medium text-orange-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full bg-orange-50 border-orange-300"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block font-medium text-orange-700 mb-1">
              Select Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="input input-bordered w-full bg-orange-50 border-orange-300"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium text-orange-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-orange-50 border-orange-300"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium text-orange-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full bg-orange-50 border-orange-300"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium text-orange-700 mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-orange-50 border-orange-300"
              placeholder="Write your message here..."
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quote;
