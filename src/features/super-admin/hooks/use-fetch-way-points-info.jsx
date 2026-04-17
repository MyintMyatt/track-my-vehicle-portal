import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setWayPoints } from "../reducer/way-points-slice";
import apiClient from "../../../configuration/api-client";
import { API_ENDPOINTS } from "../../../configuration/api-config";

const useFetchWayPoints = (wayId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPointsInfo = async () => {
            try{
                const response = await apiClient.get(API_ENDPOINTS.get_way_points_info);
                const data = response.json();
                dispatch(setWayPoints(data));
            }catch(error){
                console.error('failed to fetch data', error);
            }
        };

        if(wayId) fetchPointsInfo();
    }, [wayId, dispatch]);
}