import { createContext, useReducer, useContext } from "react";
import { appReducer, initialState } from "@/context/AppReducer";

// Create the context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the store
export const useAppContext = () => useContext(AppContext);
