import { createSlice } from '@reduxjs/toolkit';
import {getLocalConnections} from "@/utils/storage";


const initialState = {
    subServerLogs: [],
    adminLogs: [],
    accessLogs:[],
    errorLogs: [],
    dbErrorLogs: [],
};

const databaseSlice = createSlice({
    name: 'Logs',
    initialState,
    reducers: {
        setAdminLog: (state, action) => {
            state.adminLogs = action.payload;
        },
        setErrorLogs: (state, action) => {
            state.errorLogs = action.payload;
        },
        setSubServerLogs: (state, action) => {
            state.subServerLogs = action.payload;
        },
        setDBErrorLogs: (state, action) => {
            state.dbErrorLogs = action.payload;
        }
    },
});

export const { setAdminLog, setErrorLogs, setSubServerLogs, setDBErrorLogs} = databaseSlice.actions;
export default databaseSlice.reducer;