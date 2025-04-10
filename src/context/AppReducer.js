import {getLocalConnections, getLocalStorage} from "@/utils/storage";
import _ from "lodash";

export const initialState = {
    isOpen: false,
    isOpenDBLogin: false,
    server: getLocalConnections(),
    servers: getLocalConnections(),
    contents: [],
    panel_active: "",
    databases: [],
    brokers: [],
    sub_server: [],
    sub_database: [],
    tables:[],
    views: [],
    users:[],
    triggers: [],
    columns: [],
    serials: [],
    synonyms: [],
    connection: {
        type:"",
        open: false
    }
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case "CONNECTION":
            return { ...state, connection: action.payload };
        case "LOGIN_DB_STATE":
            return { ...state, isOpenDBLogin: action.payload };
        case "CONNECTION_DATA":
            return { ...state, connection_data: action.payload };
        case "SERVER_DATA":
            return { ...state, servers: action.payload };
        case "SERVERS":
            return { ...state, servers: action.payload};
        case "SUB_SERVER":
            return { ...state, sub_server: action.payload };
        case "DATABASE_DATA":
            return { ...state, databases: {...state.databases, ...action.payload }};
        case "DATABASES":
            return { ...state, databases: action.payload };
        case "SUB_DATABASE":
            return { ...state, sub_database: action.payload };
        case "BROKERS":
            return { ...state, brokers: action.payload };
        case "TABLES":
            return { ...state, tables: action.payload };
        case "VIEWS":
            return { ...state, views: action.payload };
        case "SERIALS":
            return { ...state, serials: action.payload };
        case "SYNONYMS":
            return { ...state, synonyms: action.payload };

        case "USERS":
            return { ...state, users: action.payload };
        case "TRIGGERS":
            return { ...state, triggers: action.payload };
        case "COLUMNS":
            return { ...state, columns: action.payload };

        case "CONTENTS":
            return { ...state, contents: action.payload };
        case "PANEL_ACTIVE":
            return { ...state, panel_active: action.payload };
        default:
            return state;
    }
};
