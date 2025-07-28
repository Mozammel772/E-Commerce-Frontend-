import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const UserRoute = ({ children }) => {
  const { role, isLoading, error } = useRole();

  if (isLoading) return <LoadingSpinner/>

  if (role === "user") return children;

  return <Navigate to="/login" replace />;
};

export default UserRoute;
