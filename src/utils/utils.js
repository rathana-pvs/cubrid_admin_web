import {setLocalStorage} from "@/utils/storage";
import {nanoid} from "nanoid";
import {setLoading} from "@/state/dialogSlice";
import {setSelectedObject} from "@/state/generalSlice";
import {setSubServer} from "@/state/subServerSlice";
import {Modal} from "antd";
import {
    getDatabases,
    startBroker,
    startBrokers,
    startDatabase,
    stopBroker,
    stopBrokers,
    stopDatabase
} from "@/utils/api";
import {setDatabase} from "@/state/databaseSlice";
import axios from "axios";
import React from "react";
import {setBroker} from "@/state/brokerSlice";




export function isNotEmpty(value) {
    if(value){
        if (Array.isArray(value)) {
            return value.length > 0;  // Check for non-empty array
        } else if (typeof value === 'object') {
            return Object.keys(value).length > 0;  // Check for non-empty object
        }
    }
    return false; // Return false for non-array, non-object values
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

export const getAPIParam = (server) => {
    // if (!server.token) {
    //     const response = await setToken(server)
    //     return {host: server.host, port: server.port, token: response.token};
    // }
    return {host: server.host, port: server.port, token: server.token};
}




export const setRememberPassword = (remember, serverId, connections)=>{
    let newConnections = connections
    console.log(remember, serverId, connections)
    if(!remember){
        newConnections = connections.map(({password, ...rest}) => {
            if(rest.serverId === serverId) {
                return rest
            }
            return {...rest, password};
        })
    }
    console.log(newConnections);
    setLocalStorage("connections", newConnections);
}

export const onStartBrokers = async (broker, state, dispatch) => {
    dispatch(setLoading(true));
    const server = state.servers.find(res => res.serverId === broker.serverId);
    const response = await axios.post("/api/start-brokers", {
        ...getAPIParam(server)
    }).then(res => res.data)
    dispatch(setLoading(false));
    if (response.status) {
        const newSubServers = state.subServers.map(res=>{
            if((res.key === broker.key)){
                const newSubBroker = {
                    ...res,
                    status: "ON",
                    icon: <i className={`fa-light fa-folder-tree`}/>
                }
                dispatch(setSelectedObject(newSubBroker))
                return newSubBroker
            }else{
                return res
            }
        })
        dispatch(setSubServer(newSubServers));
    }else{
        Modal.error({
            title: 'Broker',
            content: response.note,
            okText: 'Close',
        });
    }
}

export const onStopBrokers = async (broker, state, dispatch) => {
    dispatch(setLoading(true));
    const server = state.servers.find(res => res.serverId === broker.serverId);
    const response = await axios.post("/api/stop-brokers", {
        ...getAPIParam(server)
    }).then(res => res.data)
    dispatch(setLoading(false));
    if (response.status) {
        const newSubServers = state.subServers.map(res=>{
            if((res.key === broker.key)){
                const newSubBroker = {
                    ...res,
                    status: "OFF",
                    icon: <i className={`fa-light fa-folder-tree warning`}/>
                }
                dispatch(setSelectedObject(newSubBroker))
                return newSubBroker
            }else{
                return res
            }
        })
        dispatch(setSubServer(newSubServers));
    }else{
        Modal.error({
            title: 'Broker',
            content: response.note,
            okText: 'Close',
        });
    }
}

export const onStartBroker = async (broker, state, dispatch) => {
    dispatch(setLoading(true));
    const server = state.servers.find(res => res.serverId === broker.serverId);
    // const response = await axios.post("/api/stop-brokers", {
    //     ...getAPIParam(server)
    // }).then(res => res.data)
    const response = await startBroker({...getAPIParam(server), broker: broker.name});
    dispatch(setLoading(false));
    if (response.status) {
        const newBrokers = state.brokers.map(res=>{
            if((res.key === broker.key)){
                const newBroker = {
                    ...res,
                    status: "ON",
                    icon: <i className="fa-light fa-folder-gear success"></i>,
                }
                dispatch(setSelectedObject(newBroker))
                return newBroker
            }else{
                return res
            }
        })
        dispatch(setBroker(newBrokers));
    }else{
        Modal.error({
            title: 'Broker',
            content: response.note,
            okText: 'Close',
        });
    }
}



export const onStopBroker = async (broker, state, dispatch) => {
    dispatch(setLoading(true));
    const server = state.servers.find(res => res.serverId === broker.serverId);
    const response = await stopBroker({...getAPIParam(server), broker: broker.name});
    dispatch(setLoading(false));
    if (response.status) {
        const newBrokers = state.brokers.map(res=>{
            if((res.key === broker.key)){
                const newBroker = {
                    ...res,
                    status: "OFF",
                    icon: <i className="fa-light fa-folder-gear warning"></i>,
                }
                dispatch(setSelectedObject(newBroker))
                return newBroker
            }else{
                return res
            }
        })
        dispatch(setBroker(newBrokers));
    }else{
        Modal.error({
            title: 'Broker',
            content: response.note,
            okText: 'Close',
        });
    }
}

export const onStartDatabase = async (node, state, dispatch) => {
    dispatch(setLoading(true));
    const server = state.servers.find(res => res.serverId === node.serverId);
    const response = await axios.post("/api/start-db", {
        ...getAPIParam(server),
        database: node.title,
    }).then(res => res.data)
    dispatch(setLoading(false));
    if (response.status) {
        const newDatabases = state.databases.map((item) => {
            if (item.key === node.key) {
                const newObject = {...item,
                    status: "active",
                    icon: <i className={`fa-light fa-database success`}/>,
                };
                dispatch(setSelectedObject(newObject))
                return newObject
            }
            return item;
        })

        dispatch(setDatabase(newDatabases));

    }else{
        Modal.error({
            title: 'Database',
            content: response.note,
            okText: 'Close',
        });
    }
}


export const onStopDatabase = async (node, state, dispatch) => {
    dispatch(setLoading(true));
    const server = state.servers.find(res => res.serverId === node.serverId);
    const response = await axios.post("/api/stop-db", {
        ...getAPIParam(server),
        database: node.title,
    }).then(res => res.data)
    dispatch(setLoading(false));
    if (response.status) {
        const newDatabases = state.databases.map((item) => {
            if (item.key === node.key) {
                const newObject = {...item,
                    status: "inactive",
                    icon: <i className={`fa-light fa-database warning`}/>,
                };
                dispatch(setSelectedObject(newObject))
                return newObject
            }
            return item;
        })

        dispatch(setDatabase(newDatabases));

    }else{
        Modal.error({
            title: 'Database',
            content: response.note,
            okText: 'Close',
        });
    }
}


export const onStartService = async (node, dispatch) => {
    dispatch(setLoading(true));
    // get all databases
    const response = await getDatabases(getAPIParam(node))
    if(response.status) {
        for(let database of response.result) {
            if(database.status === "inactive") {
                // start all of inactive databases
                const res = await startDatabase({...getAPIParam(node), database: database.dbname });
                if(!res.status) {
                    break;
                }
            }
        }
    }
    // start brokers
    await startBrokers(getAPIParam(node))
    dispatch(setLoading(false));

}


export const onStopService = async (node, dispatch) => {
    dispatch(setLoading(true));
    // get all databases
    console.log(node)
    const response = await getDatabases(getAPIParam(node))
    if(response.status) {
        for(let database of response.result) {
            if(database.status === "active") {
                // stop all active databases
                const res = await stopDatabase({...getAPIParam(node), database: database.dbname });
                if(!res.status) {
                    break;
                }
            }
        }
    }
    // stop brokers
    await stopBrokers(getAPIParam(node)).then(res => res.data);
    dispatch(setLoading(false));

}