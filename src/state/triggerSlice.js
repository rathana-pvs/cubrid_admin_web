import { createSlice } from '@reduxjs/toolkit';



const initialState = [];

const triggerSlice = createSlice({
    name: 'triggers',
    initialState,
    reducers: {
        setTrigger: (state, action) => {
            return action.payload;
        },
        deleteTrigger: (state, action) => {
            return state.filter(trigger => trigger.serverId === action.payload);
        }
    },
});

export const { setTrigger, deleteTrigger } = triggerSlice.actions;
export default triggerSlice.reducer;