import {combineReducers} from "@reduxjs/toolkit";
import serverReducer from "@/state/serverSlice";
import generalReducer from "@/state/generalSlice";
import dialogReducer from "@/state/dialogSlice";
import {serverDisconnect} from "@/state/sharedAction";
import {getLocalConnections} from "@/utils/storage";
import databaseReducer from "@/state/databaseSlice";
import brokerReducer from "@/state/brokerSlice";
import tableReducer from "@/state/tableSlice";
import viewReducer from "@/state/viewSlice";
import userReducer from "@/state/userSlice";
import triggerReducer from "@/state/triggerSlice";
import columnReducer from "@/state/columnSlice";
import subServerReducer from "@/state/subServerSlice";
import logReducer from "@/state/logSlicce";


const appReducer = combineReducers({
    servers: serverReducer,
    subServers: subServerReducer,
    databases: databaseReducer,
    brokers: brokerReducer,
    tables: tableReducer,
    views: viewReducer,
    users: userReducer,
    triggers: triggerReducer,
    columns: columnReducer,
    general: generalReducer,
    dialog: dialogReducer,
    logs: logReducer
});


const rootReducer = (state, action) => {
    switch (action.type) {
        case serverDisconnect.type:
            return {...state, servers: getLocalConnections()};
        default:
            return appReducer(state, action);
    }
};

export default rootReducer;