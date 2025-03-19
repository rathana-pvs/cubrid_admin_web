// Save data to localStorage
export const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Get data from localStorage
export const getLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
};

export const getLocalConnections = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("connections");
        return data ? JSON.parse(data) : [];
    }
};


export const appendToLocalStorage = (key, newItem) => {
    if (typeof window !== "undefined") {
        let existingData = getLocalStorage(key);
        if (!Array.isArray(existingData)) {
            existingData = []; // Initialize as array if empty or not an array
        }
        const updatedData = [...existingData, newItem]; // Append new item
        setLocalStorage(key, updatedData); // Save updated array
    }
};