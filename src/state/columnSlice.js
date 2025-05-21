import { createSlice } from '@reduxjs/toolkit';



const initialState = [];

const columnSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        setColumn: (state, action) => {
            return action.payload;
        },
        deleteColumn: (state, action) => {
            return state.filter(column => column.serverId === action.payload);
        }
    },
});

export const { setColumn, deleteColumn } = columnSlice.actions;
export default columnSlice.reducer;