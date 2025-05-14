"use client";
import React, {useEffect, useState} from 'react';
import {Modal, Tree} from 'antd';
import axios from "axios";
import {setToken} from "@/utils/auth";
import {useAppContext} from "@/context/AppContext";
import {getAPIParam, isNotEmpty, typeDisplay} from "@/utils/utils";
import {nanoid} from "nanoid";
import Tables from "@/components/ui/contents/tables";
import ServerMenu from "@/components/ui/menu/ServerMenu";
import Views from "@/components/ui/contents/views";
import Serials from "@/components/ui/contents/serials";
import Users from "@/components/ui/contents/users";
import Triggers from "@/components/ui/contents/triggers";
import Synonyms from "@/components/ui/contents/synonyms";
import TableMenu from "@/components/ui/menu/TableMenu";
import TablesMenu from "@/components/ui/menu/TablesMenu";
import ViewsMenu from "@/components/ui/menu/ViewsMenu";
import SerialsMenu from "@/components/ui/menu/SerialsMenu";
import UsersMenu from "@/components/ui/menu/UsersMenu";
import TriggersMenu from "@/components/ui/menu/TriggersMenu";
import SynonymsMenu from "@/components/ui/menu/SynonymsMenu";
import Servers from "@/components/ui/contents/servers";
import Brokers from "@/components/ui/contents/brokers";
import Broker from "@/components/ui/contents/brokers/broker"
import DatabasesMenu from "@/components/ui/menu/DatabasesMenu";
import BrokersMenu from "@/components/ui/menu/BrokersMenu";
import BrokerMenu from "@/components/ui/menu/BrokerMenu";
import DatabaseMenu from "@/components/ui/menu/DatabaseMenu";
import {result} from "lodash";


function buildTree(...dataSets) {
    const map = new Map();
    dataSets.flat().forEach(item => {
        map.set(item.key, { ...item, children: item.sub?item.sub:[] });
    });
    const tree = [];
    map.forEach((node) => {
        if (node.parentId) {
            const parent = map.get(node.parentId);
            if (parent) parent.children.push(node);
        } else {
            tree.push(node);
        }
    });
    return tree;
}

const contents = [
    {type: "server", children: <Servers/>},
    {type: "brokers", children: <Brokers/>},
    {type: "broker", children: <Broker/>},
    {type: "tables", children: <Tables/>},
    {type: "views", children: <Views/>},
    {type: "serials", children: <Serials/>},
    {type: "users", children: <Users/>},
    {type: "triggers", children: <Triggers/>},
    {type: "synonyms", children: <Synonyms/>}
]
const menus = [
    {type: "server", Screen: ServerMenu},
    {type: "databases", Screen: DatabasesMenu},
    {type: "database", Screen: DatabaseMenu},
    {type: "tables", Screen: TablesMenu},
    {type: "views", Screen: ViewsMenu},
    {type: "serials", Screen: SerialsMenu},
    {type: "users", Screen: UsersMenu},
    {type: "triggers", Screen: TriggersMenu},
    {type: "synonyms", Screen: SynonymsMenu},
    {type: "table", Screen: TableMenu},
    {type: "brokers", Screen: BrokersMenu},
    {type: "broker", Screen: BrokerMenu}
]

const App = () => {
    const {state, dispatch} = useAppContext();
    const [isClient, setIsClient] = useState(false);
    const [menu, setMenu] = useState({});
    const [loadedKeys, setLoadedKeys] = useState([]);
    const handleContextMenu = (e) => {
        const {node} = e

        menus.forEach((item) => {
            if(item.type === node.type){
                setMenu({...e, Screen: item.Screen,  open: true});
            }
        })
    };
    useEffect(() => {
        setIsClient(true);
    }, []);

    const onSelect = async (selectedKeys, info) => {
        if(selectedKeys.length > 0){
            dispatch({type: "SELECTED_OBJECT", payload: info.node});
        }else{
            dispatch({type: "SELECTED_OBJECT", payload: {}});
        }
        contents.forEach((res) => {
            if(res.type === info.node.type) {
                const checkObject = state.contents.find(item => item.label === info.node.title) || false
                if(checkObject){
                    dispatch({type: "PANEL_ACTIVE", payload: checkObject.key});
                }else{
                    let key = nanoid(4);
                    dispatch({type: "CONTENTS", payload: [...state.contents, {label: info.node.title,
                            ...info.node,
                            ...res,
                            key: key}]})
                    dispatch({type: "PANEL_ACTIVE", payload: key})
                }
            }
        })
    };
    const loadData = async (node) => {
        // if (loadedKeys.includes(node.key)) return;
        switch (node.type) {
            case "server":{
                const response = await setToken({...node})
                if (response.token) {
                    const newServerData = state.servers.map(res => {
                        if(res.server_id === node.server_id){
                            res.token = response.token;
                        }
                        return res;
                    });
                    dispatch({type:"SERVER_DATA", payload: newServerData});
                    const childData = [["Databases", "fa-database"], ["Brokers", "fa-folder-tree"], ["Logs", "fa-files"]]

                    const subServer = childData.map(item => {
                        const id = nanoid(8)
                        return {
                            server_id: node.server_id,
                            parentId: node.key,
                            type: item[0].toLowerCase(),
                            title: item[0],
                            key: id,
                            icon: <i className={`fa-light ${item[1]}`}/>,
                            children: [],
                            isLeaf: false,
                        }
                    })
                    const result = await axios.post("/api/general",
                        {task: "getbrokersinfo", ...getAPIParam({...node, token: response.token})})
                        .then(res=>res.data);
                    if(result.status === "success"){
                        const broker_info = result.brokersinfo[0].broker
                        if(broker_info){
                            const newBrokers = broker_info.map(item => {
                                return {
                                    server_id: node.server_id,
                                    parentId: subServer[1].key,
                                    title: `${item.name} (${item.port})`,
                                    key: nanoid(8),
                                    type: "broker",
                                    icon: <i className="fa-light fa-folder-gear"></i>,
                                    data: item
                                }
                            })

                            subServer[1]["status"] = result.brokerstatus;
                            dispatch({type: "SUB_SERVER", payload: subServer})
                            dispatch({type: "BROKERS", payload: [...state.brokers, ...newBrokers]});
                        }
                    }
                }else{
                    Modal.error({
                            title: "Connection Failed",
                            content: response.note,
                            okText: "Close"
                        }
                    )
                    throw new Error(response.note);
                }

                break
            }
            case "databases":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const start_info = await axios.post("/api/start-info", getAPIParam(server)).then(res=>res.data);
                let  activeList = []
                if(isNotEmpty(start_info.activelist)){
                    activeList = start_info.activelist[0].active
                }
                const dbList = start_info.dblist[0].dbs
                const deActiveList = dbList.filter(obj2 => !activeList.some(obj1 => obj1.dbname === obj2.dbname));
                deActiveList.forEach(item => item.status = "inactive");
                const newDatabases = [...activeList, ...deActiveList].map(item => {
                    const id = nanoid(8)
                    return {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: item.dbname,
                        key: id,
                        type: "database",
                        status: item.status,
                        icon: <i className={`fa-light fa-database ${item.status === "inactive" ? "warning" : "success"}`}/>
                    }
                })
                dispatch({type: "DATABASES", payload: [...state.databases, ...newDatabases]});
                break;
            }
            case "brokers": {
                // const server = state.servers.find(item => item.server_id === node.server_id)
                // const result = await axios.post("/api/general",
                //     {task: "getbrokersinfo", ...getAPIParam(server)}).then(res=>res.data);
                // if(result.status === "success"){
                //     const broker_info = result.brokersinfo[0].broker
                //     if(broker_info){
                //         const newBrokers = broker_info.map(item => {
                //             return {
                //                 server_id: node.server_id,
                //                 parentId: node.key,
                //                 title: `${item.name} (${item.port})`,
                //                 key: nanoid(8),
                //                 type: "broker",
                //                 icon: <i className="fa-light fa-folder-gear"></i>,
                //                 data: item
                //
                //             }
                //         })
                //         dispatch({type: "BROKERS", payload: [...state.brokers, ...newBrokers]});
                //     }
                // }

                break
            }
            case "logs":{
                const subLog = [
                    {
                        parentId: node.key,
                        title: "Broker",
                        key: nanoid(8),
                        type: "broker",
                        icon: <i className="fa-light fa-folder-tree"></i>,
                        sub: [
                            {
                                server_id: node.server_id,
                                parentId: node.key,
                                title: "Access Log",
                                key: nanoid(8),
                                type: "folder_admin_log",
                                icon: <i className="fa-solid fa-folder icon__folder"></i>
                            },
                            {
                                server_id: node.server_id,
                                parentId: node.key,
                                title: "Error Log",
                                key: nanoid(8),
                                type: "folder_admin_log",
                                icon: <i className="fa-solid fa-folder icon__folder"></i>
                            },
                            {
                                server_id: node.server_id,
                                parentId: node.key,
                                title: "Admin Log",
                                key: nanoid(8),
                                type: "folder_admin_log",
                                icon: <i className="fa-solid fa-folder icon__folder"></i>
                            }
                        ]
                    },
                    {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: "Manager",
                        key: nanoid(8),
                        type: "manager",
                        icon: <i className="fa-light fa-computer"></i>,
                        sub: [
                            {
                                server_id: node.server_id,
                                parentId: node.key,
                                title: "Access Log",
                                key: nanoid(8),
                                type: "access_log",
                                icon: <i className="fa-solid fa-file"></i>,
                                isLeaf:true

                            },
                            {
                                server_id: node.server_id,
                                parentId: node.key,
                                title: "Error Log",
                                key: nanoid(8),
                                type: "error_log",
                                icon: <i className="fa-solid fa-file error"></i>,
                                isLeaf: true,
                            }
                        ]
                    },
                    {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: "Server",
                        key: nanoid(8),
                        type: "log_server",
                        icon: <i className="fa-light fa-server"></i>,
                        sub: []
                    }
                ]
                dispatch({type: "SUB_LOG", payload: subLog});
                break;
            }
            case "database":{
                const childData = [["Tables", "fa-table-tree"], ["Views", "fa-eye"],
                    ["Serials", "fa-input-numeric", {disabled: true, isLeaf:false}], ["Users", "fa-users"],
                    ["Triggers", "fa-gears"], ["Stored Procedure", "fa-table-list", {disabled: true, isLeaf: false}]]

                    const subDatabase = childData.map(item => {
                        const id = nanoid(8)
                        return {
                            server_id: node.server_id,
                            id: id,
                            parentId: node.key,
                            title: item[0],
                            key: `${node.key}-${id}`,
                            type: item[0].toLowerCase(),
                            icon: <i className={`fa-light ${item[1]}`}/>,
                            children: [],
                            isLeaf: false,
                            ...item[2]

                        }
                    })
                    dispatch({type: "SUB_DATABASE", payload: [...state.sub_database, ...subDatabase]})
                    break;
            }
            case "tables":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                let allClass = []
                const {result} = await axios.post("/api/list-tables", {...getAPIParam(server), database: database.title, virtual: "normal" })
                    .then(res => res.data);
                const systemId = nanoid(8)
                allClass.push({
                    server_id: node.server_id,
                    parentId: node.key,
                    title: "System Tables",
                    key: `${node.key}-${systemId}`,
                    type: "system-table",
                    icon: <i className="fa-solid fa-folder icon__folder"/>,
                    sub: result.system_class.map((item) => ({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: item.classname,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "table",
                            icon: <i className="fa-light fa-table"/>,
                            isLeaf: true,
                            ...item
                    })),
                })
                result.user_class.forEach(item=>{
                        allClass.push({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: `${item.classname}`,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "table",
                            icon: <i className="fa-light fa-table"/>,
                            ...item
                        })
                })
                dispatch({type: "TABLES", payload: [...state.tables, ...allClass]})

                break;
            }
            case "views":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                let allView = []
                const {result} = await axios.post("/api/list-tables",
                    {...getAPIParam(server), database: database.title, virtual: "view" })
                    .then(res => res.data);
                const viewId = nanoid(8)
                allView.push({
                    server_id: node.server_id,
                    parentId: node.key,
                    title: "System Views",
                    key: `${node.key}-${viewId}`,
                    type: "system-view",
                    icon: <i className="fa-solid fa-folder icon__folder"/>,
                    sub: result.system_class.map((item) => ({
                        server_id: node.server_id,
                        parentId: `${node.key}-${viewId}`,
                        id: nanoid(8),
                        title: item.classname,
                        key: `${node.key}-${viewId}-${nanoid(8)}`,
                        type: "system-view",
                        icon: <i className="fa-light fa-eye"/>,
                        isLeaf: true,
                        ...item
                    })),
                })
                result.user_class.forEach(item=>{
                        allView.push({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: `${item.classname}`,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "view",
                            icon: <i className="fa-light fa-eye"/>,
                            ...item
                        })
                })
                dispatch({type: "VIEWS", payload: [...state.views, ...allView]})
                break
            }
            case "serials":{
                // const server = state.servers.find(item => item.server_id === node.server_id)
                // const database = state.databases.find(item => item.key === node.parentId)
                // const database_login = getDatabaseLogin(server, database)
                // const {result} = await axios.post("/api/list-serials", {database_login})
                //     .then(res => res.data);
                // const serialData = result.map(item => {
                //     return {
                //         server_id: node.server_id,
                //         database_id: node.parentId,
                //         parentId: node.key,
                //         title: `${item.owner_name}.${item.name}`,
                //         key: `${node.key}-${nanoid(8)}`,
                //         type: "serial",
                //         icon: <i className="fa-light fa-list-ol"/>,
                //         isLeaf: true,
                //         ...item
                //     }
                // })
                // dispatch({type: "SERIALS", payload: [...state.serials, ...serialData]})
                break
            }
            case "users":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                const {result} = await axios.post("/api/list-users", {...getAPIParam(server), database: database.title})
                    .then(res => res.data);
                const newUser = result.map(item=>{
                    return {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: item["@name"],
                        key: `${node.key}-${nanoid(8)}`,
                        type: "user",
                        icon: <i className="fa-light fa-user success"/>,
                        isLeaf: true,
                        ...item
                    }
                })
                dispatch({type: "USERS", payload: [...state.users, ...newUser]})
                break
            }
            case "triggers":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                const response = await axios.post("/api/list-triggers", {...getAPIParam(server), database: database.title})
                    .then(res => res.data);
                if(response.success){
                    const newTrigger = response.result.map(item=>{
                        return {
                            server_id: node.server_id,
                            parentId: node.key,
                            title: `${item.name}`,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "trigger",
                            icon: <i className="fa-light fa-gear-code"></i>,
                            isLeaf: true,
                            ...item
                        }
                    })
                    dispatch({type: "TRIGGERS", payload: [...state.triggers, ...newTrigger]})
                }else{
                    Modal.error({
                            title: "Trigger Error",
                            content: response.note,
                            okText: "Close"
                        }
                    )
                    throw new Error(response.note);

                }

                break
            }
            case "stored procedure":{
                // const server = state.servers.find(item => item.server_id === node.server_id)
                // const database = state.databases.find(item => item.key === node.parentId)
                // const database_login = getDatabaseLogin(server, database)
                // const {result} = await axios.post("/api/list-procedures", {...server, database: database.title})
                //     .then(res => res.data);
                // const newProcedure = result.map(item=>{
                //     return {
                //         server_id: node.server_id,
                //         parentId: node.key,
                //         title: `${item.synonym_owner_name}.${item.synonym_name}`,
                //         key: `${node.key}-${nanoid(8)}`,
                //         type: "synonym",
                //         icon: <i className="fa-light fa-gear-code"></i>,
                //         isLeaf: true,
                //         ...item
                //     }
                // })
                // dispatch({type: "SYNONYMS", payload: [...state.synonyms, ...newSynonym]})
                break
            }
            case "table":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.database_id)

                const response = await axios.post("/api/table-info",
                    {...getAPIParam(server), database: database.title, table: node.title})
                    .then(res => res.data)
                const {attribute, constraint} = response.result
                let columnIndex = []

                columnIndex.push({
                    parentId: node.key,
                    title: "Columns",
                    key: nanoid(8),
                    icon: <i className="fa-solid fa-folder icon__folder"/>,
                    sub: attribute.map(item=>({
                        server_id: node.server_id,
                        database_id: node.database_id,
                        parentId: node.key,
                        key: `${node.key}-${nanoid(8)}`,
                        title: `${item.name} (${typeDisplay(item.type)})`,
                        type: "column",
                        icon: <i className="fa-light fa-columns-3"/>,
                        isLeaf: true,
                        ...item
                    }))
                })
                //
                columnIndex.push({
                    parentId: node.key,
                    title: "Indexes",
                    key: nanoid(8),
                    icon: <i className="fa-solid fa-folder icon__folder"/>,
                    sub: constraint.map(item=>({
                        server_id: node.server_id,
                        database_id: node.database_id,
                        parentId: node.key,
                        key: `${node.key}-${nanoid(8)}`,
                        title: item.name,
                        type: "index",
                        icon: <i className="fa-light fa-columns-3"/>,
                        isLeaf: true,
                        ...item
                    }))
                })
                 dispatch({type: "COLUMNS", payload: [...state.columns, ...columnIndex]})
                break
            }


        }

        dispatch({type: "LOADED_KEY", payload: [...state.loaded_key, node.key]})
    }


    const renderManu = ()=>{
        const {Screen, open, ...e} = menu
        if(Screen){
            return <Screen {...e} open={open} onClose={()=>setMenu({...menu, open: false})}/>
        }
        return null

    }
    if (!isClient) return null;
    return (
            <>
                {renderManu()}
                <Tree
                    // loading={state.loaded_key}
                    onRightClick={handleContextMenu}
                    showLine
                    showIcon
                    loadData={loadData}
                    onSelect={onSelect}
                    // loadedKeys={loadedKeys}
                    treeData={buildTree(state.servers, state.sub_server,
                        state.databases, state.brokers, state.sub_log, state.sub_database, state.tables,
                        state.views, state.serials, state.users, state.triggers,
                        state.synonyms, state.columns)}

                />
            </>
    );
};
export default App;