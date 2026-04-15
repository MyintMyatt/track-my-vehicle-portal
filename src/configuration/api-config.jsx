export const backendWebSocketURL = () => {
    return import.meta.env.VITE_BACKEND_WEBSOCKET_URL;
};

export const WEB_SOCKET_ENDPOINTS = {
    track_vehicle : '/topic/track-vehicle'
};