// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import serverReducer from "@/state/serverSlice";
import generalReducer from "@/state/generalSlice";
import dialogReducer from "@/state/dialogSlice";
import rootReducer from "@/state/rootReducer";

export const store = configureStore({
    reducer: rootReducer
});
