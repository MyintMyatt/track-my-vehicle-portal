import { Outlet } from "react-router-dom";

const SuperAdminLayout = () => {
    return (
        <div>
            <h1>Welcome to Find My Vehicle Portal</h1>
            <Outlet />
        </div>
        
    );
};

export default SuperAdminLayout;

