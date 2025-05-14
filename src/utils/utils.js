import {getLocalConnections, getLocalStorage, setLocalStorage} from "@/utils/storage";
import {nanoid} from "nanoid";
import axios from "axios";
import React from "react";
import {Modal} from "antd";


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

export const formatMenuData = (data) => {
    return data.map(item => {
        const newItem = { ...item, key: nanoid(4) };
        if (item.children) {
            newItem.children = formatMenuData(item.children);
        }
        return newItem;
    });

}

export const typeDisplay = (type) => {
    if(type.includes("character varying(")){
        return type.replace("character varying", "varchar");
    }else if(type.includes("character(")){
        return type.replace("character", "char");
    }
    return type
}

export const getAPIParam = (server)=>{
    return {host: server.host, port: server.port, token: server.token};
}


export const onStartStopDatabase = async (node, state, dispatch) => {
    dispatch({type: "LOADING_SCREEN", payload: true});
    const status = node.status;
    const server = state.servers.find(res => res.server_id === node.server_id);
    const response = await axios.post("/api/start-stop-db", {
        ...getAPIParam(server),
        database: node.title,
        type: status === "inactive" ? "start" : "stop",
    }).then(res => res.data)
    dispatch({type: "LOADING_SCREEN", payload: false});
    if (response.success) {
        const newDatabases = state.databases
        newDatabases.forEach((item) => {
            if (item.title === node.title) {
                item.status = status === "inactive" ? "active" : "inactive";
                item.icon = <i className={`fa-light fa-database ${item.status === "inactive" ? "warning" : "success"}`}/>
                dispatch({type: "SELECTED_OBJECT", payload: item});
            }
        })

        dispatch({type: "DATABASES", payload: newDatabases});

    }else{
        Modal.error({
            title: 'Broker',
            content: response.note,
            okText: 'Close',
        });
    }
}


export const setRememberPassword = (remember, server_id, connections)=>{
    let newConnections = connections
    console.log(remember, server_id, connections)
    if(!remember){
        newConnections = connections.map(({password, ...rest}) => {
            if(rest.server_id === server_id) {
                return rest
            }
            return {...rest, password};
        })
    }
    console.log(newConnections);
    setLocalStorage("connections", newConnections);
}

export const fetchAPILoading = (url, param, dispatch)=>{

}

export const onStartStopBroker = async (state, dispatch) => {
    dispatch({type: "LOADING_SCREEN", payload: true});
    const {selected_object} = state;
    const status = selected_object.status;
    const server = state.servers.find(res => res.server_id === selected_object.server_id);
    const response = await axios.post("/api/start-stop-broker", {
        ...getAPIParam(server),
        type: status === "OFF" ? "start" : "stop",
    }).then(res => res.data)
    dispatch({type: "LOADING_SCREEN", payload: false});
    if (response.success) {
        const newSubServer = state.sub_server
        newSubServer.filter(item => item.server_id === selected_object.server_id).forEach(item => {
            if (item.title === selected_object.title) {
                item.status = status === "OFF" ? "ON" : "OFF";
                item.icon = <i className={`fa-light fa-folder-tree ${item.status === "OFF" ? "warning" : "success"}`}/>
                dispatch({type: "SELECTED_OBJECT", payload: item});
            }
        })
        dispatch({type: "SUB_SERVER", payload: newSubServer});
    }else{
        Modal.error({
            title: 'Broker',
            content: response.note,
            okText: 'Close', // 🔁 Change "OK" to "Close"
        });
    }
}

export const onStartStopServer = async (state, dispatch) => {
    dispatch({type: "LOADING_SCREEN", payload: true});
    const {selected_object} = state;
    const status = selected_object.status;
    const server = state.servers.find(res => res.server_id === selected_object.server_id);
    const response = await axios.post("/api/start-stop-server", {
        ...getAPIParam(server),
        type: status === "OFF" ? "start" : "stop",
    }).then(res => res.data)
    dispatch({type: "LOADING_SCREEN", payload: false});
    if (response.success) {
        const newSubServer = state.sub_server
        newSubServer.filter(item => item.server_id === selected_object.server_id).forEach(item => {
            if (item.title === selected_object.title) {
                item.status = status === "OFF" ? "ON" : "OFF";
                item.icon = <i className={`fa-light fa-folder-tree ${item.status === "OFF" ? "warning" : "success"}`}/>
                dispatch({type: "SELECTED_OBJECT", payload: item});
            }
        })
        dispatch({type: "SUB_SERVER", payload: newSubServer});
    }else{
        Modal.error({
            title: 'Server',
            content: response.note,
            okText: 'Close',
        });
    }
}

