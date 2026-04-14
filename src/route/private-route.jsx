import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoutes }) => {

    return allowedRoutes.includes("admin") ? <Outlet /> : <Navigate to="/login" />;

};

export default PrivateRoute;