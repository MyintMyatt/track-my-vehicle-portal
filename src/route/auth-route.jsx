import Login from "@/features/auth/pages/pg-login";
import AuthLayOut from "@/layout/lyt-auth-layout";

const AuthRoute = [
    {
        path: "/login",
        element: <AuthLayOut />,
        children: [
            {
                element: <Login />, index: true
            }
        ]
    }
]

export default AuthRoute;