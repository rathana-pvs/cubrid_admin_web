// Save data to localStorage
import {isNotEmpty} from "@/utils/utils";
import {nanoid} from "nanoid";
import React from "react";

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

export const createServerFormat =(item)=>{
    item["login"] = {id: item.id, password: item.password};
    item["key"] = item.server_id
    item["title"] = item["name"]
    item["server_id"] = item.server_id
    item["type"] = "server"
    item["icon"] = <i className="fa-light fa-server success"/>
    return item;
}

export const getLocalConnections = () => {
    if (typeof window !== "undefined") {
        let data = localStorage.getItem("connections");
        data = data?JSON.parse(data):[];
        if(isNotEmpty(data)) {
            data.forEach(item => {
                return createServerFormat(item);
            })

        }
        return data
    }
    return []
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