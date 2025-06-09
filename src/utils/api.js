import request from "@/utils/request";
import {Modal} from "antd";


const getResponse = (response) => {
    if(!response.status){
        Modal.error({
            title: 'Error',
            content: response.note,
            okText: 'Close',
        });
    }
    return response;
}


export const loginDatabase = async (data) => {
    const response = await request.post("/api/login-database", data).then(res => res.data);
    return getResponse(response);
}
export const getDatabases = async (data) => {
    const response = await request.post("/api/get-databases", data).then(res => res.data);
    return getResponse(response);
}

export const getBrokers = async (data) => {
    const response = await request.post("/api/get-brokers", data).then(res => res.data);
    return getResponse(response);
}

export const getTables = async (data) => {
    const response = await request.post("/api/get-tables", data).then(res => res.data);
    return getResponse(response);
}


export const startDatabase = async (data) => {
    const response = await request.post("/api/start-db", data).then(res => res.data);
    return getResponse(response);
}

export const stopDatabase = async (data) => {
    const response = await request.post("/api/stop-db", data).then(res => res.data);
    return getResponse(response);
}

export const startBrokers = async (data) => {
    const response = await request.post("/api/start-brokers", data).then(res => res.data);
    return getResponse(response);
}

export const stopBrokers = async (data) => {
    const response = await request.post("/api/stop-brokers", data).then(res => res.data);
    return getResponse(response);
}

export const startBroker = async (data) => {
    const response = await request.post("/api/start-broker", data).then(res => res.data);
    return getResponse(response);
}
export const stopBroker = async (data) => {
    const response = await request.post("/api/stop-broker", data).then(res => res.data);
    return getResponse(response);
}

export const getBrokerLog = async (data) => {
    const response = await request.post("/api/get-broker-log", data).then(res => res.data);
    return getResponse(response);
}


export const getCMUsers = async (data) => {
    const response = await request.post("/api/get-cm-users", data).then(res => res.data);
    return getResponse(response);
}

export const createCMUser = async (data) => {
    const response = await request.post("/api/create-cm-user", data).then(res => res.data);
    return getResponse(response);
}


export const updateCMUser = async (data) => {
    const response = await request.post("/api/update-cm-user", data).then(res => res.data);
    return getResponse(response);
}

export const deleteCMUser = async (data) => {
    const response = await request.post("/api/delete-cm-user", data).then(res => res.data);
    return getResponse(response);
}

export const getDBUser = async (data) => {
    const response = await request.post("/api/get-db-users", data).then(res => res.data);
    return getResponse(response);
}



export const createUserDB = async (data) => {
    const response = await request.post("/api/create-db-user", data).then(res => res.data);
    return getResponse(response);
}

export const updateUserDB = async (data) => {
    const response = await request.post("/api/update-db-user", data).then(res => res.data);
    return getResponse(response);
}

export const deleteUserDB = async (data) => {
    const response = await request.post("/api/delete-db-user", data).then(res => res.data);
    return getResponse(response);
}

export const viewLog = async (data) => {
    const response = await request.post("/api/view-log", data).then(res => res.data);
    return getResponse(response);
}


export const getCompactDB = async (data) => {
    const response = await request.post("/api/compact-db", data).then(res => res.data);
    return getResponse(response);
}

export const getCheckDB = async (data) => {
    const response = await request.post("/api/check-db", data).then(res => res.data);
    return getResponse(response);
}

export const getBackupDB = async (data) => {
    const response = await request.post("/api/backup-db", data).then(res => res.data);
    return getResponse(response);
}

export const getOptimizeDB = async (data) => {
    const response = await request.post("/api/optimize-db", data).then(res => res.data);
    return getResponse(response);
}

export const getCopyDB = async (data) => {
    const response = await request.post("/api/get-copy-db", data).then(res => res.data);
    return getResponse(response);
}

export const getDeleteDB = async (data) => {
    const response = await request.post("/api/get-delete-db", data).then(res => res.data);
    return getResponse(response);
}

export const getRenameDB = async (data) => {
    const response = await request.post("/api/get-rename-size", data).then(res => res.data);
    return getResponse(response);
}

export const getPlanDump = async (data) => {
    const response = await request.post("/api/get-plan-dump", data).then(res => res.data);
    return getResponse(response);
}

export const getDBSpace = async (data) => {
    const response = await request.post("/api/get-db-space", data).then(res => res.data);
    return getResponse(response);
}

export const getDBSize = async (data) => {
    const response = await request.post("/api/get-db-size", data).then(res => res.data);
    return getResponse(response);
}
