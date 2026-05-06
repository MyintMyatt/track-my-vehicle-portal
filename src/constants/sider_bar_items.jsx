import { BookDashed, Car, Home, MapPinPlus, Minus, Pen, PersonStanding, PlusCircle, Route } from "lucide-react";

export const superAdminSiderBar = [
    {
        id : 1,
        name: "Dashboard",
        path: "/super-admin",
        title: "Dashboard",
        icon: <Home size={25} />,
        subChild: []
    },
    {
        id : 2,
        name: "Way Management",
        path: "/car-way-management",
        title: "Car Way Management",
        icon: <Route size={25} />,
        subChild: [
            {
                id : 2.1,
                name: "Way Registration",
                path: "/car-way-management/new",
                title: "Car Way Registration",
                icon: <MapPinPlus size={25} />,
            },
            {
                id : 2.2,
                name: "Change Way Info",
                path: "/car-way-management/change-way-info",
                title: "Change Way Info",
                icon: <Minus size={25} />,
            }
        ]
    },
    {
        id : 3,
        name: "Car & Driver Management",
        path: "/car-and-driver-management",
        title: "Car & Driver Management",
        icon: <Car size={25} />,
        subChild: [
            {
                id : 3.1,
                name: "Way Registration",
                path: "/car-management/new",
                title: "Car Registration",
                icon: <PlusCircle size={25} />,
            },
            {
                id : 3.2,
                name: "Car Driver Info",
                path: "/car-and-driver-management/change-car-info",
                title: "Car Driver Info",
                icon: <Pen size={25} />,
            }
        ]
    },
    {
        id : 4,
        name: "User Management",
        path: "/user-nanagement",
        title: "User Management",
        icon: <PersonStanding size={25} />,
        subChild: []
    }
]