import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedObject: {},
    activePanel: "",
    contents: [],
    locale: "en"

};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setSelectedObject: (state, action) => {
           state.selectedObject = action.payload;
        },
        setContents: (state, action) => {
           state.contents = action.payload;
        },
        addContents: (state, action) => {
            state.contents.push(action.payload);
        },
        deleteContents: (state, action) => {
          state.contents = state.contents.filter(item => item.key !== action.payload);
        },
        setActivePanel: (state, action) => {
            state.activePanel = action.payload;
        },
        setLocale(state, action) {
            state.locale = action.payload;
        },
    },
});

export const { setSelectedObject, setContents, addContents, deleteContents, setActivePanel, setLocale } = generalSlice.actions;
export default generalSlice.reducer;