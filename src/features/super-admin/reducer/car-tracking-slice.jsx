import { createSlice } from "@reduxjs/toolkit"

const initState = {
    vehicleLocationInfo : { wayId : null, lat : 0 , lng : 1},
    isConnected : false
}

const carTrackingSlice = createSlice({
    name: 'car_tracking',
    initialState : initState,
    reducers: {
        updateLocation: (state, action) => {
            state.vehicleLocationInfo = action.payload;
        },
        setConnectionStatus: (state, action) => {
            state.isConnected = action.payload;
        }
    }
});

export const {updateLocation, setConnectionStatus} = carTrackingSlice.actions;
export default carTrackingSlice.reducer;
