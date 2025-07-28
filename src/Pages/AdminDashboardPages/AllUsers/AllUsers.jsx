import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const getSmartPaginationButtons = (totalPages, currentPage) => {
  const buttons = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) buttons.push(i);
    return buttons;
  }

  if (currentPage <= 3) {
    buttons.push(1, 2, 3, "...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    buttons.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
  } else {
    buttons.push(1, "...", currentPage, "...", totalPages);
  }

  return buttons;
};


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    axiosSecure
      .get(`/users/all?page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.pages);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/delete/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            fetchUsers();
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete user.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="p-4 w-full">
  <h2 className="text-2xl font-bold mb-4 text-orange-700">All Users</h2>

  <div className="flex items-center gap-4 mb-4">
    <label className="text-orange-700 font-medium">Show per page:</label>
    <select
      value={limit}
      onChange={(e) => {
        setPage(1);
        setLimit(parseInt(e.target.value));
      }}
      className="select select-bordered bg-orange-50"
    >
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>

  <div className="overflow-x-auto">
    <table className="table table-zebra w-full">
      <thead className="bg-orange-600 text-white rounded-2xl mb-4">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <th>{(page - 1) * limit + index + 1}</th>
            <td className="text-base font-semibold">{user.name}</td>
            <td className="text-base font-semibold">{user.email}</td>
            <td className="capitalize font-semibold">{user.role || "user"}</td>
            <td>
              {user.role !== "admin" && (
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
    <button
      className="btn btn-sm btn-outline"
      disabled={page === 1}
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    >
      « Prev
    </button>

    {getSmartPaginationButtons(totalPages, page).map((btn, idx) =>
      btn === "..." ? (
        <span key={idx} className="btn btn-sm btn-disabled">...</span>
      ) : (
        <button
          key={idx}
          onClick={() => setPage(btn)}
          className={`btn btn-sm ${
            btn === page
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "btn-outline"
          }`}
        >
          {btn}
        </button>
      )
    )}

    <button
      className="btn btn-sm btn-outline"
      disabled={page === totalPages}
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    >
      Next »
    </button>
  </div>
</div>

  );
};

export default AllUsers;
