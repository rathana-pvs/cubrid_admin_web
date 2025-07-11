import { createSlice } from '@reduxjs/toolkit';
import {getLocalConnections} from "@/utils/storage";


const initialState = {
    adminLogs: [],
    accessLogs:[],
    errorLogs: [],
};

const databaseSlice = createSlice({
    name: 'Logs',
    initialState,
    reducers: {
        setAdminLog: (state, action) => {
            state.adminLogs = action.payload;
        }
    },
});

export const { setAdminLog} = databaseSlice.actions;
export default databaseSlice.reducer;