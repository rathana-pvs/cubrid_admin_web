import {getLocalConnections, getLocalStorage} from "@/utils/storage";
import {nanoid} from "nanoid";
import axios from "axios";


export const getSharedData = (id) => {
    const connections = getLocalConnections()
    return connections.find(res=>res.name === id) || null
}

export const getServerData = (data)=>{
    const token = getLocalStorage(data.uuid)
    return {host:data.host, port:data.port, token}
}


export const generateIdObject = (data, parent)=>{
    let ids = []
    let obj = {}
    for(let i=0; i<data.length; i++){
        const id = nanoid(8)
        ids.push(id)
        obj[id] = {...data[i], ...parent}

    }
    return {ids, obj}
}

export function isNotEmpty(value) {
    if (Array.isArray(value)) {
        return value.length > 0;  // Check for non-empty array
    } else if (typeof value === 'object') {
        return Object.keys(value).length > 0;  // Check for non-empty object
    }
    return false; // Return false for non-array, non-object values
}

export const generalAPI = (node, data) => {
    const sharedData = getSharedData(node.server);
    const serverData = getServerData(sharedData);
    return axios.post("/api/general", {
        ...serverData, ...data
    }).then(res => res.data);
}