import { createSlice } from '@reduxjs/toolkit';



const initialState = [];

const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        setTable: (state, action) => {
            return action.payload;
        },
        deleteTable: (state, action) => {
            return state.filter(table => table.serverId === action.payload);
        }
    },
});

export const { setTable, deleteTable } = tableSlice.actions;
export default tableSlice.reducer;