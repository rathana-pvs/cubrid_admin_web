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
    sub_server: [],
    sub_database: [],
    tables:[],
    views: [],
    users:[],
    triggers: [],
    columns: []
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case "CREAT_CONNECTION_STATE":
            return { ...state, isOpen: action.payload };
        case "LOGIN_DB_STATE":
            return { ...state, isOpenDBLogin: action.payload };
        case "CONNECTION_DATA":
            return { ...state, connection_data: action.payload };

        case "SERVER_DATA":
            return { ...state, servers: action.payload };
        case "SUB_SERVER":
            return { ...state, sub_server: action.payload };

        case "DATABASE_DATA":
            return { ...state, databases: {...state.databases, ...action.payload }};
        case "DATABASES":
            return { ...state, databases: action.payload };
        case "SUB_DATABASE":
            return { ...state, sub_database: action.payload };

        case "TABLES":
            return { ...state, tables: action.payload };
        case "VIEWS":
            return { ...state, views: action.payload };
        case "TABLE_DATA":
            return { ...state, tables: {...state.tables, ...action.payload} };

        case "VIEW_DATA":
            return { ...state, views: {...state.views, ...action.payload} };
        case "USERS":
            return { ...state, users: action.payload };
        case "TRIGGERS":
            return { ...state, triggers: action.payload };

        case "COLUMN_DATA":
            return { ...state, columns: {...state.columns, ...action.payload} };
        case "COLUMNS":
            return { ...state, columns: action.payload };

        case "CONSTRAINT_DATA":
            return { ...state, constraint: {...state.constraint, ...action.payload} };

        case "CONTENTS":
            return { ...state, contents: action.payload };
        case "PANEL_ACTIVE":
            return { ...state, panel_active: action.payload };
        default:
            return state;
    }
};
