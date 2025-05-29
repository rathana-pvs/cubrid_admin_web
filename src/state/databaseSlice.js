import { createSlice } from '@reduxjs/toolkit';
import {getLocalConnections} from "@/utils/storage";


const initialState = [];

const databaseSlice = createSlice({
    name: 'databases',
    initialState,
    reducers: {
        setDatabase: (state, action) => {
            return action.payload;
        },
        updateDatabase: (state, action) => {
            console.log(state, action.payload);
            return state.map(database => {
                if(database.id === action.payload.id) {
                    return action.payload;
                }
                return database;
            });
        },
        deleteDatabase: (state, action) => {
            return state.filter(database => database.id === action.payload);
        }
    },
});

export const { setDatabase, updateDatabase, deleteDatabase } = databaseSlice.actions;
export default databaseSlice.reducer;