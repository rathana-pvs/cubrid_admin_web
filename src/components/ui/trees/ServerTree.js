import React, {useEffect, useState} from 'react';
import {Modal, Tree} from 'antd';
import axios from "axios";
import {setToken} from "@/utils/auth";
import {getAPIParam, isNotEmpty, typeDisplay} from "@/utils/utils";
import {nanoid} from "nanoid";
import {useDispatch, useSelector} from "react-redux";
import {setServer} from "@/state/serverSlice";
import {setDatabase} from "@/state/databaseSlice";
import {setBroker, setBrokerStatus} from "@/state/brokerSlice";
import {setTable} from "@/state/tableSlice";
import {setView} from "@/state/viewSlice";
import {setUser} from "@/state/userSlice";
import {setTrigger} from "@/state/triggerSlice";
import {setColumn} from "@/state/columnSlice";
import {addContents, setActivePanel, setSelectedObject} from "@/state/generalSlice";
import {setSubServer} from "@/state/subServerSlice";
import {
    getAccessLog,
    getAdminLog,
    getBrokerLog,
    getBrokers,
    getDatabases,
    getDBLog,
    getDBUser,
    getTables
} from "@/utils/api";
import ServerMenu from "@/components/ui/menus/ServerMenu";
import BrokersMenu from "@/components/ui/menus/BrokersMenu";
import BrokerMenu from "@/components/ui/menus/BrokerMenu";
import UsersMenu from "@/components/ui/menus/UsersMenu";
import {setLoginDB} from "@/state/dialogSlice";
import UserMenu from "@/components/ui/menus/UserMenu";
import ViewSQLLog from "@/components/ui/contents/broker/ViewSQLLog";
import DatabaseMenu from "@/components/ui/menus/DatabaseMenu";
import {setAdminLog, setDBErrorLogs, setErrorLogs, setSubServerLogs} from "@/state/logSlicce";
import AccessLog from "@/components/ui/contents/log/manager/AccessLog";
import ErrorLog from "@/components/ui/contents/log/manager/ErrorLog";
import BrokerErrorLog from "@/components/ui/contents/log/broker/BrokerErrorLog";
import ServerErrorLog from "@/components/ui/contents/log/server/ServerErrorLog";
import Dashboard from "@/components/ui/contents/dashboard/Dashboard";
import BrokersStatus from "@/components/ui/contents/broker/BrokersStatus";
import BrokerStatus from "@/components/ui/contents/broker/BrokerStatus";
import DatabasesMenu from "@/components/ui/menus/DatabasesMenu";


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
    // {type: "server", children: <Servers/>},
    // {type: "brokers", children: <Brokers/>},
    // {type: "broker", children: <Broker/>},
    // {type: "tables", children: <Tables/>},
    // {type: "views", children: <Views/>},
    // {type: "serials", children: <Serials/>},
    // {type: "users", children: <Users/>},
    // {type: "triggers", children: <Triggers/>},
    // {type: "synonyms", children: <Synonyms/>}
]

const panels = [
    {type: "broker_log_file", children: <ViewSQLLog/>},
    {type: "manager_access_log", children: <AccessLog/>},
    {type: "manager_error_log", children: <ErrorLog/>},
    {type: "broker_error_log", children: <BrokerErrorLog/>},
    {type: "server_db_log", children: <ServerErrorLog/>},
    {type: "server", children: <Dashboard/>},
    {type: "brokers", children: <BrokersStatus/>},
    {type: "broker", children: <BrokerStatus/>},
]
const menus = [
    {type: "server", Screen: ServerMenu},
    {type: "databases", Screen: DatabasesMenu},
    {type: "database", Screen: DatabaseMenu},
    // {type: "tables", Screen: TablesMenu},
    // {type: "views", Screen: ViewsMenu},
    // {type: "serials", Screen: SerialsMenu},
    {type: "users", Screen: UsersMenu},
    {type: "user", Screen: UserMenu},
    // {type: "triggers", Screen: TriggersMenu},
    // {type: "synonyms", Screen: SynonymsMenu},
    // {type: "table", Screen: TableMenu},
    {type: "brokers", Screen: BrokersMenu},
    {type: "broker", Screen: BrokerMenu}
]

const App = () => {
    const {databases, brokers, tables, views,
        servers, subServers,
        users, triggers, columns, logs, ...state} = useSelector(state=> state);

    // const {servers, subServers} = useSelector(state => state.navigator);
    const {contents, selectedObject} = useSelector(state=> state.general);
    const dispatch = useDispatch();
    const [subLogger, setSubLogger] = useState([]);
    const [subDatabase, setSubDatabase] = useState([]);
    const [subBrokerLog, setSubBrokerLog] = useState([]);
    const [subServerLog, setSubServerLog] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const [menu, setMenu] = useState({});
    const [selectedKeys, setSelectedKeys] = useState([]);

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

    const onSelect = async (keys, info) => {
        const server = servers.find(res=>res.serverId === info.node.serverId);

        if(keys.length > 0){
            dispatch(setSelectedObject({...info.node, server: server, key: keys[0]}));
        }else{
            dispatch(setSelectedObject({}));
        }
        panels.forEach((res) => {
            if(res.type === info.node.type) {
                const checkObject = contents.find(item => item.key === info.node.key) || false
                if(!checkObject){
                    dispatch(addContents({label: info.node.title,
                        ...info.node,
                        ...res}))
                }
                dispatch(setActivePanel(info.node.key))
            }
        })
    };
    const loadData = async (node) => {
        const server = servers.find(item => item.serverId === node.serverId)
        // if (loadedKeys.includes(node.key)) return;
        switch (node.type) {
            case "server":{
                // useLoadServer(node)
                const result = await setToken({...node})
                if (result.token) {

                    const newServers = servers.map(server => {
                        if(server.serverId === node.serverId){
                            return {...server, token: result.token, connected: true};
                        }
                        return server;
                    })
                    dispatch(setServer(newServers));

                    const childData = [["Databases", "fa-database"], ["Brokers", "fa-folder-tree"], ["Logs", "fa-files"]]

                    const newSubServer = childData.map(item => {
                        const id = nanoid(8)
                        return {
                            serverId: node.serverId,
                            parentId: node.key,
                            type: item[0].toLowerCase(),
                            title: item[0],
                            key: id,
                            icon: <i className={`fa-light ${item[1]}`}/>,
                            children: [],
                            isLeaf: false,
                        }
                    })
                    const response = await getBrokers({...getAPIParam({...node, token: result.token})})
                    if(response.status){
                            const newBrokers = response.result.map(item => {
                                return {
                                    serverId: node.serverId,
                                    parentId: newSubServer[1].key,
                                    title: `${item.name} (${item.port})`,
                                    key: nanoid(8),
                                    status: item.state,
                                    name: item.name,
                                    type: "broker",
                                    icon: <i className={`fa-light fa-folder-gear ${item.state === "OFF"? "warning": "success"}`}></i>,
                                    data: item
                                }
                            })
                            newSubServer[1].status = response.brokerstatus
                            if(response.brokerstatus === "OFF"){
                                newSubServer[1].icon = <i className={`fa-light fa-folder-tree warning`}/>
                            }

                            dispatch(setBroker([...brokers, ...newBrokers]))
                            dispatch(setSubServer([...subServers, ...newSubServer]))
                    }
                }else{
                    Modal.error({
                            title: "Connection Failed",
                            content: result.note,
                            okText: "Close"
                        }
                    )
                    throw new Error(result.note);
                }

                break
            }
            case "databases":{
                const response =  await getDatabases(getAPIParam(server));
                const newDatabases = response.result.map(item => {
                    const id = nanoid(8)
                    return {
                        serverId: node.serverId,
                        parentId: node.key,
                        title: item.dbname,
                        key: id,
                        type: "database",
                        isLogin: false,
                        status: item.status,
                        icon: <i className={`fa-light fa-database ${item.status === "inactive" ? "warning" : "success"}`}/>,
                        ...item
                    }
                })
                dispatch(setDatabase([...databases, ...newDatabases]));
                break;
            }

            case "broker":{
                const response =  await getBrokerLog({...getAPIParam(server), broker: node.name})
                if(response.status){
                    const id = nanoid(8)
                    const newBrokerLog = {
                        serverId: node.serverId,
                        parentId: node.key,
                        title: "Sql Log",
                        key: id,
                        type: "broker_folder_log",
                        icon: <i className={"fa-solid fa-folder icon__folder"}></i>,
                        sub: response.result.filter(res=>!res.type).map(item => {
                            const name = item.path.split("/").pop()
                            return {
                                serverId: node.serverId,
                                parentId: id,
                                title: name,
                                key: nanoid(8),
                                type: "broker_log_file",
                                icon: <i className={"fa-light fa-file"}></i>,
                                isLeaf: true,
                                ...item
                            }
                        }),
                    }
                    dispatch(setBroker([...brokers, newBrokerLog]))
                }
                break
            }
            case "logs":{
                const id = nanoid(8)
                const subLog = [
                    {
                        parentId: node.key,
                        title: "Broker",
                        key: id,
                        type: "log_broker",
                        icon: <i className="fa-light fa-folder-tree"></i>,
                    },
                    {
                        serverId: node.serverId,
                        parentId: node.key,
                        title: "Manager",
                        key: nanoid(8),
                        type: "manager",
                        icon: <i className="fa-light fa-computer"></i>,
                        sub: [
                            {
                                serverId: node.serverId,
                                parentId: node.key,
                                title: "Access Log",
                                key: nanoid(8),
                                type: "manager_access_log",
                                icon: <i className="fa-light fa-file"></i>,
                                isLeaf:true

                            },
                            {
                                serverId: node.serverId,
                                parentId: node.key,
                                title: "Error Log",
                                key: nanoid(8),
                                type: "manager_error_log",
                                icon: <i className="fa-light fa-file error"></i>,
                                isLeaf: true,
                            }
                        ]
                    },
                    {
                        serverId: node.serverId,
                        parentId: node.key,
                        title: "Server",
                        key: nanoid(8),
                        type: "log_server",
                        icon: <i className="fa-light fa-server"></i>
                    }
                ]
                setSubLogger(subLog)

                const newSubBrokerLog = [
                    {
                        serverId: node.serverId,
                        parentId: id,
                        title: "Access Log",
                        key: nanoid(8),
                        type: "folder_access_log",
                        icon: <i className="fa-solid fa-folder icon__folder"></i>
                    },
                    {
                        serverId: node.serverId,
                        parentId: id,
                        title: "Error Log",
                        key: nanoid(8),
                        type: "folder_error_log",
                        icon: <i className="fa-solid fa-folder icon__folder"></i>
                    },
                    {
                        serverId: node.serverId,
                        parentId: id,
                        title: "Admin Log",
                        key: nanoid(8),
                        type: "folder_admin_log",
                        icon: <i className="fa-solid fa-folder icon__folder"></i>,
                        children: [],
                    }
                ]

                setSubBrokerLog(newSubBrokerLog)
                break;
            }
            case "database":{
                if(!node.isLogin){
                    dispatch(setLoginDB({open: true, type: "login", node}))
                    throw new Error("Keep loading");
                }
                if(node.isLogin){
                    const childData = [["Tables", "fa-table-tree"], ["Views", "fa-eye"],
                        ["Serials", "fa-input-numeric", {disabled: true, isLeaf:false}], ["Users", "fa-users"],
                        ["Triggers", "fa-gears"], ["Stored Procedure", "fa-table-list", {disabled: true, isLeaf: false}]]

                    const newSubDatabase = childData.map(item => {
                        const id = nanoid(8)
                        return {
                            serverId: node.serverId,
                            id: id,
                            parentId: node.key,
                            databaseId: node.key,
                            title: item[0],
                            key: `${node.key}-${id}`,
                            type: item[0].toLowerCase(),
                            icon: <i className={`fa-light ${item[1]}`}/>,
                            children: [],
                            isLeaf: false,
                            ...item[2]

                        }
                    })

                    setSubDatabase([...subDatabase, ...newSubDatabase])
                }
                    break;
            }
            case "tables":{
                const server = servers.find(item => item.serverId === node.serverId)
                const database = databases.find(item => item.key === node.parentId)
                let allClass = []
                const {result} = await getTables( {...getAPIParam(server), database: database.title, virtual: "normal" })
                const systemId = nanoid(8)
                allClass.push({
                    serverId: node.serverId,
                    parentId: node.key,
                    title: "System Tables",
                    key: `${node.key}-${systemId}`,
                    type: "system-table",
                    icon: <i className="fa-solid fa-folder icon__folder"/>,
                    sub: result.system_class.map((item) => ({
                            serverId: node.serverId,
                            databaseId: node.parentId,
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
                            serverId: node.serverId,
                            databaseId: node.parentId,
                            parentId: node.key,
                            title: `${item.classname}`,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "table",
                            icon: <i className="fa-light fa-table"/>,
                            ...item
                        })
                })
                // dispatch({type: "TABLES", payload: [...state.tables, ...allClass]})
                dispatch(setTable([...tables, ...allClass]))

                break;
            }
            case "views":{
                const server = servers.find(item => item.serverId === node.serverId)
                const database = databases.find(item => item.key === node.parentId)
                let allView = []
                const {result} = await getTables(
                    {...getAPIParam(server), database: database.title, virtual: "view" })

                const viewId = nanoid(8)
                allView.push({
                    serverId: node.serverId,
                    parentId: node.key,
                    title: "System Views",
                    key: `${node.key}-${viewId}`,
                    type: "system-view",
                    icon: <i className="fa-solid fa-folder icon__folder"/>,
                    sub: result.system_class.map((item) => ({
                        serverId: node.serverId,
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
                            serverId: node.serverId,
                            databaseId: node.parentId,
                            parentId: node.key,
                            title: `${item.classname}`,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "view",
                            icon: <i className="fa-light fa-eye"/>,
                            ...item
                        })
                })
                dispatch(setView([...views, ...allView]))
                break
            }
            case "users":{
                const server = servers.find(item => item.serverId === node.serverId)
                const database = databases.find(item => item.key === node.parentId)
                const response = await getDBUser({...getAPIParam(server), database: database.title})
                if(response.status){
                    const newUser = response.result.map(item=>{
                        return {
                            serverId: node.serverId,
                            parentId: node.key,
                            databaseId: node.parentId,
                            title: item["@name"],
                            key: `${node.key}-${nanoid(8)}`,
                            type: "user",
                            icon: <i className="fa-light fa-user success"/>,
                            isLeaf: true,
                            ...item
                        }
                    })
                    dispatch(setUser([...users, ...newUser]))
                }

                break
            }
            case "triggers":{
                const server = servers.find(item => item.serverId === node.serverId)
                const database = databases.find(item => item.key === node.parentId)
                const response = await axios.post("/api/list-triggers", {...getAPIParam(server), database: database.title})
                    .then(res => res.data);
                if(response.success){
                    const newTrigger = response.result.map(item=>{
                        return {
                            serverId: node.serverId,
                            parentId: node.key,
                            title: `${item.name}`,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "trigger",
                            icon: <i className="fa-light fa-gear-code"></i>,
                            isLeaf: true,
                            ...item
                        }
                    })
                    dispatch(setTrigger([...triggers, ...newTrigger]))
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
            case "table":{
                const server = servers.find(item => item.serverId === node.serverId)
                const database = databases.find(item => item.key === node.databaseId)

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
                        serverId: node.serverId,
                        databaseId: node.databaseId,
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
                        serverId: node.serverId,
                        databaseId: node.databaseId,
                        parentId: node.key,
                        key: `${node.key}-${nanoid(8)}`,
                        title: item.name,
                        type: "index",
                        icon: <i className="fa-light fa-columns-3"/>,
                        isLeaf: true,
                        ...item
                    }))
                })
                dispatch(setColumn([...columns, ...columnIndex]))
                break
            }
            case "folder_admin_log":{
                const server = servers.find(item => item.serverId === node.serverId)
                const response = await getAdminLog({...getAPIParam(server)})
                if(response.status){
                    const newLogs = response.result.map(res=>{
                        return {
                            ...res,
                            serverId: node.serverId,
                            parentId: node.key,
                            key: nanoid(8),
                            title: `${res.path.split("/").pop()}`,
                            icon: <i className="fa-light fa-file"></i>,
                            isLeaf: true

                        }
                    })
                    dispatch(setAdminLog([...logs.adminLogs, ...newLogs]))
                }
            break;
            }
            case "folder_error_log":{
                const brokerErrorLog = []
                for(let item of brokers){
                    const response = await getBrokerLog({...getAPIParam(server), broker: item.name})
                    if(response.status){
                        for(let broker of response.result){
                            if(broker.type === "error"){
                                let title = broker.path.split("/").pop()
                                brokerErrorLog.push({
                                    ...broker,
                                    serverId: node.serverId,
                                    parentId: node.key,
                                    key: `${node.key}-${nanoid(8)}`,
                                    title: title,
                                    type: "broker_error_log",
                                    icon: <i className="fa-light fa-file"></i>,
                                    isLeaf: true

                                })
                            }
                        }
                    }
                }
                dispatch(setErrorLogs(brokerErrorLog))

                break
            }
            case "log_server":{
                const response =  await getDatabases({...getAPIParam(server)});
                if(response.status){
                    const newSubServerLog = response.result.map(item=>{
                        return {
                            ...item,
                            serverId: node.serverId,
                            parentId: node.key,
                            key: nanoid(8),
                            title: item.dbname,
                            type: "folder_log_server",
                            icon: <i className="fa-solid fa-folder icon__folder"></i>,
                            isLeaf: false
                        }
                    })
                    dispatch(setSubServerLogs(newSubServerLog))
                }
                break
            }

            case "folder_log_server":{
                const response =  await getDBLog({...getAPIParam(server), dbname: node.title});
                if(response.status){
                    const newDBErrorLogs = response.result.map(item=>{
                        let title = item.path.split("/").pop()
                        return {
                            ...item,
                            serverId: node.serverId,
                            parentId: node.key,
                            key: nanoid(8),
                            title,
                            icon: <i className="fa-light fa-file"></i>,
                            type: "server_db_log",
                            isLeaf: true,

                        }
                    })
                    dispatch(setDBErrorLogs([...logs.dbErrorLogs, ...newDBErrorLogs]))
                }
                break
            }

        }

    }

    const renderManu = ()=>{
        const {Screen, open, ...e} = menu
        if(Screen){
            return <Screen {...e} open={open} onClose={()=>setMenu({...menu, open: false})}/>
        }
        return null

    }
    if (!isClient) return null;

    // console.log(subServerLog)
    return (
            <>
                {renderManu()}
                <Tree
                    onRightClick={handleContextMenu}
                    showLine
                    showIcon
                    selectedKeys={[selectedObject.key]}
                    loadData={loadData}
                    onSelect={onSelect}
                    treeData={buildTree(servers, subServers, databases,
                        brokers, subLogger, subDatabase,
                        tables, views, users, triggers, columns,
                        subBrokerLog, [...logs.subServerLogs], logs.adminLogs, logs.errorLogs, logs.dbErrorLogs )}

                />
            </>
    );
};
export default App;