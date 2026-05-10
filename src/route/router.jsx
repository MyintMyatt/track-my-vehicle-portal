import { createBrowserRouter } from "react-router-dom";
import SuperAdminLayout from "@/layout/lyt-super-admin-layout";
import Home from "@/features/super-admin/pages/pg-home";
import AuthRoute from "./auth-route";
import CarTrackMapView from "../features/super-admin/pages/pg-car-track-map-view";
import WayList from "../features/super-admin/pages/pg-way-list";
import ProtectedRoute from "./protected-route";
import { ROUTE_PATHS } from "../constants/app-fe-route-endpoints";
import WayForm from "../features/super-admin/way/page/pg-way-form";

const router = createBrowserRouter(
    [
        // Super Admin routes
        {
            element: <ProtectedRoute allowRoles={["super-admin", "admin"]} currentRole={"super-admin"} />,
            children: [
                {
                    element: <SuperAdminLayout />,
                    path: "/super-admin",
                    children: [
                        {
                            element: <Home />, index: true
                        },
                        {
                            element: <CarTrackMapView />, path: 'new'
                        }
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowRoles={["super-admin", "admin"]} currentRole={"super-admin"} />,
            children: [
                {
                    element: <SuperAdminLayout />,
                    path: ROUTE_PATHS.WAY.root,
                    children: [
                        {
                            element: <WayList />, index: true
                        },
                        {
                            element: <WayForm />, path: ROUTE_PATHS.WAY.new
                        },
                        {
                            element: <WayForm isEdit={true} />, path: ROUTE_PATHS.WAY.edit('W-0001')
                        }
                    ]
                }
            ]
        },

        // auth route
        ...AuthRoute
    ]
)


export default router;