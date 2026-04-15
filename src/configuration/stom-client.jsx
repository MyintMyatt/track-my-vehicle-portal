import { Client } from "@stomp/stompjs";
import { backendWebSocketURL } from "./api-config";
import { setConnectionStatus } from "../features/super-admin/reducer/car-tracking-slice";

let stompClient = null;

export const connectWebSocket = (dispatch) => {
    if (stompClient?.active) return;

    stompClient = new Client({
        brokerURL: backendWebSocketURL(),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
            console.log("connected to stomp");
            dispatch(setConnectionStatus(true));
        },
        onDisconnect: () => {
            dispatch(setConnectionStatus(false));
        },
        onStompError: (frame) => {
            console.error('Broker error:', frame.headers['message']);
        },
    });
    console.log(backendWebSocketURL());
    console.log(stompClient.active);
    
    stompClient.activate();
}

export const subscribeToTopic = (topic, onMessageReceived) =>{
    if(!stompClient || !stompClient.connected){
        console.log('STOM client not connected. Call connectWebSocket first');
        return null;
    }

    
    console.log(`Subscribing to : ${topic}`);
    const subscription = stompClient.subscribe(topic, (message) => {
        if(message.body){
            onMessageReceived(JSON.parse(message.body));
        }
    });
    
    return () => subscription.unsubscribe();
}

export const disconnectWebSocket = () =>{
    if (stompClient) stompClient.deactivate();
}