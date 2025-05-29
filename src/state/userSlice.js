import { createSlice } from '@reduxjs/toolkit';



const initialState = [];

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        deleteUser: (state, action) => {
            return state.filter(user => user.key !== action.payload);
        }
    },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;