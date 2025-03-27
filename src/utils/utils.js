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


export const getAPIData = (uui)=>{
    const data = getLocalConnections().find(res=>res.uuid === uui) || null
    return getServerData(data);
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

export const generalAPI = (...args) => {
    let param = {}
    if(args.length === 1){
        param = args[0]
    }else if(args.length === 2){
        const sharedData = getSharedData(args[0].server);
        const serverData = getServerData(sharedData);
        param = {...serverData, ...args[1]};
    }
    return axios.post("/api/general", param).then(res => res.data);
}



export const findServer = (id, state, type) => {
    let key = id;

    const updateKey = (source, prop) => {
        if (source[key]) {
            key = source[key][prop];

            return true; // Successfully updated the key
        }
        return false; // Key not found, stop processing
    };

    const actions = [
        { type: "column", source: state.tables, prop: "database_id" },
        { type: "table", source: state.databases, prop: "server_id" }
    ];

    let found = false;
    for (const action of actions) {
        if (found || action.type === type) {
            found = updateKey(action.source, action.prop);
        }
    }

    return key
};


export const getDatabaseLogin = (server, database) => {
    return {host: server.host, port: "33000", database: database.title, user: "dba", password: ""};
}

export const getFormattedResults = (result) => {
    return result.map(row =>
        Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
                key,
                typeof value === "bigint" ? parseInt(value) : value
            ])
        )
    );
}