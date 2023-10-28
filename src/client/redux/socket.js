import {createSlice} from "@reduxjs/toolkit";
import {socket} from "../socket";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        isConnected: socket.connected,
        events: []
    },
    reducers: {
        setIsConnected(state, {payload}){
            return{
                ...state,
                isConnected: payload
            }
        },
        setFooEvents(state, {payload}){
            return{
                ...state,
                events: previous => [...previous, payload]
            }
        }
    },
})

export const {setIsConnected, setFooEvents}= socketSlice.actions;

export default socketSlice.reducer;