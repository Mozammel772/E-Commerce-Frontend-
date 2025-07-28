import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/bookings");
      setQuotes(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error fetching data",
        text: "Failed to load booking data.",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleStatusUpdate = async (id, currentStatus) => {
    if (currentStatus === "solved") {
      Swal.fire({
        icon: "info",
        title: "Already Solved",
        text: "This request is already marked as solved and cannot be changed.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to mark this request as solved.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as solved!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a", // green
      cancelButtonColor: "#f97316", // orange
    });

    if (confirm.isConfirmed) {
      try {
        await axios.patch(`http://localhost:9000/api/bookings/${id}/status`, {
          status: "solved",
        });

        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote._id === id ? { ...quote, status: "solved" } : quote
          )
        );

        Swal.fire({
          icon: "success",
          title: "Marked as Solved",
          confirmButtonColor: "#16a34a",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Could not update the booking status.",
          confirmButtonColor: "#f97316",
        });
      }
    }
  };

  const handleCopy = (phone, id) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-orange-700 mb-8 text-center">
        All Quote Requests
      </h1>

      {quotes.length === 0 ? (
        <p className="text-center text-gray-600">No quotes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-orange-300 rounded-lg bg-white shadow-lg">
            <thead className="bg-orange-200 text-orange-800">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote._id} className="hover:bg-orange-50">
                  <td className="p-3">
                    {new Date(quote.bookingDateTime).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(quote.bookingDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">{quote.name}</td>
                  <td className="p-3 flex items-center gap-2">
                    {quote.phone}
                    <button
                      onClick={() => handleCopy(quote.phone, quote._id)}
                      className="text-orange-600 hover:text-orange-800 text-sm"
                      title="Copy phone number"
                    >
                      <FaRegCopy />
                    </button>
                    {copiedId === quote._id && (
                      <span className="text-green-600 text-xs">Copied!</span>
                    )}
                  </td>
                  <td className="p-3">{quote.message}</td>
                  <td className="p-3">
                    <span
                      className={`badge ${
                        quote.status === "solved"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {quote.status || "unsolved"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          quote._id,
                          quote.status || "unsolved"
                        )
                      }
                      className="btn btn-sm bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
                      disabled={quote.status === "solved"}
                    >
                      {quote.status === "solved" ? "Solved" : "Mark as Solved"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;
