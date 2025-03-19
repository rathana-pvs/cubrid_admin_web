import { createContext, useReducer, useContext } from "react";
import { connectionReducer, initialState } from "@/context/ConnectionReducer";

// Create the context
const ConnectionContext = createContext();

// Provider component
export const ConnectionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(connectionReducer, initialState);

    return (
        <ConnectionContext.Provider value={{ state, dispatch }}>
            {children}
        </ConnectionContext.Provider>
    );
};

// Custom hook to use the store
export const useConnectionContext = () => useContext(ConnectionContext);
