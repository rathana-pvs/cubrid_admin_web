import { createSlice } from '@reduxjs/toolkit';
import {getLocalConnections} from "@/utils/storage";


const initialState = {
    servers: getLocalConnections(),
    subServers: [],
    databases:[],
    brokers: [],
    logs: []
};

const databaseSlice = createSlice({
    name: 'Navigator',
    initialState,
    reducers: {
        setServers: (state, action) => {
            state.servers = action.payload;
        },
        setSubServers: (state, action) => {
            state.subServers = action.payload;
        },
        setBrokers: (state, action) => {
            state.brokers = action.payload;
        }
    },
});

export const { setServers, setSubServers, setBrokers} = databaseSlice.actions;
export default databaseSlice.reducer;