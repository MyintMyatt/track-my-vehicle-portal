import AuthLayOut from "@/layout/lyt-auth-layout";
import { LoginPage } from "../constants/lazy-load";

const AuthRoute = [
    {
        path: "/login",
        element: <AuthLayOut />,
        children: [
            {
                element: <LoginPage />, index: true
            }
        ]
    }
]

export default AuthRoute;