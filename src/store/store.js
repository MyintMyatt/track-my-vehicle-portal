import { configureStore } from "@reduxjs/toolkit";
import carTrackingReduer from "../features/super-admin/reducer/car-tracking-slice"

export const store = configureStore({
    reducer: {
        car_tracking: carTrackingReduer
    }
});