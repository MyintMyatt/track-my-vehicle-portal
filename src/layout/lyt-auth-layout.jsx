import { Outlet } from "react-router-dom";

const AuthLayOut = () =>{
    return (
        <div className="h-screen w-screen">
            <Outlet />
        </div>
    );
}

export default AuthLayOut;