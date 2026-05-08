import { configureStore } from "@reduxjs/toolkit";
import carTrackingReduer from "../features/super-admin/reducer/car-tracking-slice"
import wayPointsInfo from "../features/super-admin/reducer/way-points-slice";
import globalModelUiReducer from "../global/reducer/global-modal-ui-slice"

export const store = configureStore({
    reducer: {
        car_tracking: carTrackingReduer,
        way_points_info : wayPointsInfo,
        global_modal_ui : globalModelUiReducer
    }
});