import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AdminOnSiteVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const fetchVisits = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/onsitevisits");
      setVisits(res.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to Load",
        text: "Could not load visit data.",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleCopy = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    if (currentStatus === "solved") {
      Swal.fire({
        icon: "info",
        title: "Already Solved",
        text: "This request is already marked as solved.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to mark this request as solved.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as solved",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#f97316",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.patch(`http://localhost:9000/api/onsitevisits/${id}/status`, {
          status: "solved",
        });

        setVisits((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status: "solved" } : v))
        );

        Swal.fire({
          icon: "success",
          title: "Marked as Solved",
          confirmButtonColor: "#16a34a",
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          confirmButtonColor: "#f97316",
        });
      }
    }
  };

  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="bg-orange-50 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center text-orange-700 mb-6">
        On-Site Visit Requests
      </h2>

      {visits.length === 0 ? (
        <p className="text-center text-gray-500">No visits found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visits.map((visit) => (
            <div
              key={visit._id}
              className="card bg-white shadow-lg border border-orange-200"
            >
              {visit.image && (
                <figure>
                  <img
                    src={visit.image}
                    alt="Visit"
                    className="w-full h-48 object-cover"
                  />
                </figure>
              )}
              <div className="card-body space-y-2">
                <h3 className="text-xl font-bold text-orange-700">{visit.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(visit.bookingDateTime).toLocaleDateString()} @{" "}
                  {new Date(visit.bookingDateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="text-gray-700">{visit.message}</p>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-600">
                    {visit.email}
                  </span>
                  <button
                    onClick={() => handleCopy(visit.email, visit._id)}
                    className="text-orange-600 hover:text-orange-800 text-sm"
                    title="Copy email"
                  >
                    <FaRegCopy />
                  </button>
                  {copiedId === visit._id && (
                    <span className="text-green-600 text-xs">Copied!</span>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span
                    className={`badge px-3 py-1 text-white text-xs ${
                      visit.status === "solved" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {visit.status || "unsolved"}
                  </span>
                  <button
                    disabled={visit.status === "solved"}
                    onClick={() =>
                      handleStatusUpdate(visit._id, visit.status || "unsolved")
                    }
                    className={`btn btn-sm text-white ${
                      visit.status === "solved"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700"
                    }`}
                  >
                    {visit.status === "solved" ? "Solved" : "Mark as Solved"}
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

export default AdminOnSiteVisits;
