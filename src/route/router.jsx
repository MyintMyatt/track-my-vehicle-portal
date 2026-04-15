import { createBrowserRouter } from "react-router-dom";
import SuperAdminLayout from "@/layout/lyt-super-admin-layout";
import Home from "@/features/super-admin/pages/pg-home";
import AuthRoute from "./auth-route";
import CarTrackMapView from "../features/super-admin/pages/pg-car-track-map-view";

const router = createBrowserRouter(
    [
        // Super Admin routes
        {
            element: <SuperAdminLayout />,
            path: "/super-admin",
            children: [
                {
                    element: <Home />, index: true
                },
                {
                    element: <CarTrackMapView /> , path: 'map'
                }
            ]
        },
         
        // auth route
        ...AuthRoute
    ]
)


export default router;