export const backendWebSocketURL = () => {
    return import.meta.env.VITE_BASE_WEBSOCKET_URL;
};

export const WEB_SOCKET_ENDPOINTS = {
    track_vehicle : '/topic/track-vehicle'
};

export const apiBaseURL = () => {
    return import.meta.env.VITE_BASE_API_URL;
}

export const API_ENDPOINTS = {
    get_way_points_info : '/points-info'
}