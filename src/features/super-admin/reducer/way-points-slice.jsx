import { createSlice } from "@reduxjs/toolkit";

const initState = {
    pointsInfo : [
        { lat : 16.959174 , lng : 96.090062, pointName : null, passenger : [{ name : null, phone : null, status : null}]},
        { lat : 16.956666 , lng : 96.081683, pointName : null, passenger : [{ name : null, phone : null, status : null}]}
    ],
}

const wayPointsSlice = createSlice({
    name: 'way_points',
    initialState: initState,
    reducers: {
        setWayPoints: (state, action) => {
            state.pointsInfo = action.payload;
        }
    }
});

export const { setWayPoints } = wayPointsSlice.actions;
export default wayPointsSlice.reducer;