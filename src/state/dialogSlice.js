import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    connection: {open: false},
    userManagement: {open: false},
    userDB: {open: false},
    loading: false,

};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
        setUserManagement: (state, action) => {
            state.userManagement = action.payload;
        },
        setUserDB: (state, action) => {
            state.userDB = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const { setConnection, setUserManagement, setUserDB,  setLoading } = dialogSlice.actions;
export default dialogSlice.reducer;