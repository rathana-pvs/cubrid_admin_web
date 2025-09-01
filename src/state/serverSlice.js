import { createSlice } from '@reduxjs/toolkit';
import {getLocalConnections, setLocalStorage} from "@/utils/storage";


const initialState = getLocalConnections();

const serverSlice = createSlice({
    name: 'servers',
    initialState,
    reducers: {
        setServer: (state, action) => {
            return action.payload;
        },
        deleteServer: (state, action) => {
            const servers = state.filter(server => server.serverId !== action.payload);
            setLocalStorage("connections", servers);
            return servers;
        }
    },
});

export const { setServer, deleteServer } = serverSlice.actions;
export default serverSlice.reducer;