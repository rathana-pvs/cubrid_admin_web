import { createSlice } from '@reduxjs/toolkit';



const initialState = [];

const viewSlice = createSlice({
    name: 'views',
    initialState,
    reducers: {
        setView: (state, action) => {
            return action.payload;
        },
        deleteView: (state, action) => {
            return state.filter(view => view.serverId === action.payload);
        }
    },
});

export const { setView, deleteView } = viewSlice.actions;
export default viewSlice.reducer;