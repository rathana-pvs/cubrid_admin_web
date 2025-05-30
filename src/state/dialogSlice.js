import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    connection: {open: false},
    userManagement: {open: false},
    userDB: {open: false},
    loginDB: {open: false},
    compactDB: {open: false},
    checkDB: {open: false},
    backupDB: {open: false},
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
        setLoginDB: (state, action) => {
            state.loginDB = action.payload;
        },
        setCompactDB: (state, action) => {
          state.compactDB = action.payload;
        },
        setCheckDB: (state, action) => {
            state.checkDB = action.payload;
        },
        setBackupDB: (state, action) => {
            state.backupDB = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const { setConnection, setCompactDB, setCheckDB, setBackupDB, setUserManagement, setUserDB, setLoginDB,  setLoading } = dialogSlice.actions;
export default dialogSlice.reducer;