export const initialState = {
    isOpen: false,
    connection_data:[]// Global user state
};

// Reducer function
export const connectionReducer = (state, action) => {
    switch (action.type) {
        case "CREAT_CONNECTION_STATE":
            return { ...state, isOpen: action.payload };
        case "CONNECTION_DATA":
            return { ...state, connection_data: action.payload };

        default:
            return state;
    }
};
