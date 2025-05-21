import { createSlice } from '@reduxjs/toolkit';



const initialState = [];

const subServerSlice = createSlice({
    name: 'subServers',
    initialState,
    reducers: {
        setSubServer: (state, action) => {
            return action.payload;
        },
        deleteSubServer: (state, action) => {
            return state.filter(subServer => subServer.serverId === action.payload);
        }
    },
});

export const { setSubServer, deleteSubServer } = subServerSlice.actions;
export default subServerSlice.reducer;