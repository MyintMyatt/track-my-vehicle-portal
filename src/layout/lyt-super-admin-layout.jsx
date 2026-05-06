import { Outlet } from "react-router-dom";
import SideBar from "../components/comp-side-bar";
import { superAdminSiderBar } from "../constants/sider_bar_items";
import AppBar from "../components/comp-app-bar";

const SuperAdminLayout = () => {
    
    return (
        <div className="flex">
            {/* side bar */}
            <div>
                <SideBar navs={superAdminSiderBar}/>
            </div>
            <div className="w-full h-screen flex flex-col justify-start">
                <AppBar />
                <div className="w-full h-screen px-10">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );
};

export default SuperAdminLayout;

