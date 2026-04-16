import { createSlice } from "@reduxjs/toolkit"

const initState = {
    vehicleLocationInfo : { wayId : null, lat :  16.8409, lng : 96.1735},
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
