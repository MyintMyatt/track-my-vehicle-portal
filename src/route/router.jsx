import { createBrowserRouter } from "react-router-dom";
import SuperAdminLayout from "@/layout/lyt-super-admin-layout";
import Home from "@/features/super-admin/pages/pg-home";

const router = createBrowserRouter(
    [// Super Admin routes
        {
            element: <SuperAdminLayout />,
            path: "/super-admin",
            children: [
                {
                    element: <Home />, index: true
                }
            ]
        }
    ]
)


export default router;