import { createSlice } from '@reduxjs/toolkit';



const initialState = [];

const brokerSlice = createSlice({
    name: 'brokers',
    initialState,
    reducers: {
        setBroker: (state, action) => {
            return action.payload;
        },

        deleteBroker: (state, action) => {
            return state.filter(broker => broker.serverId === action.payload);
        }
    },
});

export const { setBroker,setBrokerStatus,  deleteBroker } = brokerSlice.actions;
export default brokerSlice.reducer;