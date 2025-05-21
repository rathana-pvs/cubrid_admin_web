import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedObject: {},
    locale: "en"

};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
       setSelectedObject: (state, action) => {
           state.selectedObject = action.payload;
       },
        setLocale(state, action) {
            state.locale = action.payload;
        },
    },
});

export const { setSelectedObject, setLocale } = generalSlice.actions;
export default generalSlice.reducer;