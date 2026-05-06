import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowRoles , currentRole }) => {

    return allowRoles.includes(currentRole) ? <Outlet /> : <Navigate to="/login" />;

};

export default ProtectedRoute;