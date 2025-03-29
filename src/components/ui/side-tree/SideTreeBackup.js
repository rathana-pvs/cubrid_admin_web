"use client";
import React, {useEffect, useState} from 'react';
import {Tree} from 'antd';
import axios from "axios";
import {setToken} from "@/utils/auth";
import {useAppContext} from "@/context/AppContext";
import {getDatabaseLogin} from "@/utils/utils";
import {nanoid} from "nanoid";
import {setLocalStorage} from "@/utils/storage";
import Servers from "@/components/ui/contents/Servers";
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

const App = () => {
    const {state, dispatch} = useAppContext();
    const [isClient, setIsClient] = useState(false);
    const [menu, setMenu] = useState({});
    const handleContextMenu = (e) => {
        const {node} = e
        const menus = [
            {type: "server", Screen: ServerMenu},
            {type: "tables", Screen: TablesMenu},
            {type: "views", Screen: ViewsMenu},
            {type: "serials", Screen: SerialsMenu},
            {type: "users", Screen: UsersMenu},
            {type: "triggers", Screen: TriggersMenu},
            {type: "synonyms", Screen: SynonymsMenu},
            {type: "table", Screen: TableMenu}
        ]
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
        const contents = [
            {type: "server", children: <Servers/>},
            {type: "tables", children: <Tables/>},
            {type: "views", children: <Views/>},
            {type: "serials", children: <Serials/>},
            {type: "users", children: <Users/>},
            {type: "triggers", children: <Triggers/>},
            {type: "synonyms", children: <Synonyms/>}
        ]
        contents.forEach((res) => {
            if(res.type === info.node.type) {
                const checkObject = state.contents.find(item => item.label === info.node.title) || false;
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

        switch (node.type) {
            case "server":{
                const token = await setToken({...node, id: node.username})
                if (token) {
                    const newServerData = state.servers.map(res => {
                        if(res.server_id === node.server_id){
                            res.token = token;
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
                        }
                    })
                    dispatch({type: "SUB_SERVER", payload: subServer})
                }
                break

            }
            case "databases":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const start_info = await axios.post("/api/start-info", {...server}).then(res=>res.data);
                const activeList = start_info.activelist[0].active
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
                        icon: <i className={`fa-light fa-database ${item.status === "inactive" ? "warning" : "success"}`}/>
                    }
                })

                dispatch({type: "DATABASES", payload: [...state.databases, ...newDatabases]});
                break;
            }
            case "database":{
                const childData = [["Tables", "fa-table-tree"], ["Views", "fa-eye"],
                    ["Serials", "fa-input-numeric"], ["Users", "fa-users"],
                    ["Triggers", "fa-gears"], ["Synonyms", "fa-table-list"]]

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

                        }
                    })
                    dispatch({type: "SUB_DATABASE", payload: [...state.sub_database, ...subDatabase]})
                    break;
            }
            case "tables":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                const database_login = getDatabaseLogin(server, database)

                let allClass = []

                const {result} = await axios.post("/api/list-tables", {database_login})
                    .then(res => res.data);

                const systemId = nanoid(8)
                allClass.push({
                    server_id: node.server_id,
                    parentId: node.key,
                    title: "System Tables",
                    key: `${node.key}-${systemId}`,
                    type: "system-table",
                    icon: <i className="fa-light fa-folder"/>,
                    sub: result.filter(res=>res.is_system_class === "YES").map((item) => ({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: item.class_name,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "table",
                            icon: <i className="fa-light fa-table"/>,
                            isLeaf: true,
                            ...item
                    })),
                })
                result.filter(res=>res.is_system_class === "NO").forEach(item=>{
                        allClass.push({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: `${item.owner_name}.${item.class_name}`,
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
                const database_login = getDatabaseLogin(server, database)
                let allView = []

                const {result} = await axios.post("/api/list-views", {database_login})
                    .then(res => res.data);
                const viewId = nanoid(8)
                allView.push({
                    server_id: node.server_id,
                    parentId: node.key,
                    title: "System Views",
                    key: `${node.key}-${viewId}`,
                    type: "system-view",
                    icon: <i className="fa-light fa-folder"/>,
                    sub: result.filter(res=>res.is_system_class === "YES").map((item) => ({
                        server_id: node.server_id,
                        parentId: `${node.key}-${viewId}`,
                        id: nanoid(8),
                        title: item.class_name,
                        key: `${node.key}-${viewId}-${nanoid(8)}`,
                        type: "system-view",
                        icon: <i className="fa-light fa-eye"/>,
                        isLeaf: true,
                        ...item
                    })),
                })
                result.filter(res=>res.is_system_class === "NO").forEach(item=>{
                        allView.push({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: `${item.owner_name}.${item.class_name}`,
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
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                const database_login = getDatabaseLogin(server, database)
                const {result} = await axios.post("/api/list-serials", {database_login})
                    .then(res => res.data);
                const serialData = result.map(item => {
                    return {
                        server_id: node.server_id,
                        database_id: node.parentId,
                        parentId: node.key,
                        title: `${item.owner_name}.${item.name}`,
                        key: `${node.key}-${nanoid(8)}`,
                        type: "serial",
                        icon: <i className="fa-light fa-list-ol"/>,
                        isLeaf: true,
                        ...item
                    }
                })
                dispatch({type: "SERIALS", payload: [...state.serials, ...serialData]})
                break
            }
            case "users":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                const database_login = getDatabaseLogin(server, database)
                const {result} = await axios.post("/api/list-users", {database_login})
                    .then(res => res.data);
                const newUser = result.map(item=>{
                    return {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: item.name,
                        key: `${node.key}-${nanoid(8)}`,
                        type: "user",
                        icon: <i className="fa-light fa-user"/>,
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
                const database_login = getDatabaseLogin(server, database)
                const {result} = await axios.post("/api/list-triggers", {database_login})
                    .then(res => res.data);
                const newTrigger = result.map(item=>{
                    return {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: `${item.owner_name}.${item.trigger_name}`,
                        key: `${node.key}-${nanoid(8)}`,
                        type: "trigger",
                        icon: <i className="fa-light fa-gear-code"></i>,
                        isLeaf: true,
                        ...item
                    }
                })
                dispatch({type: "TRIGGERS", payload: [...state.triggers, ...newTrigger]})
                break
            }
            case "synonyms":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.parentId)
                const database_login = getDatabaseLogin(server, database)
                const {result} = await axios.post("/api/list-synonyms", {database_login})
                    .then(res => res.data);
                const newSynonym = result.map(item=>{
                    return {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: `${item.synonym_owner_name}.${item.synonym_name}`,
                        key: `${node.key}-${nanoid(8)}`,
                        type: "synonym",
                        icon: <i className="fa-light fa-gear-code"></i>,
                        isLeaf: true,
                        ...item
                    }
                })
                dispatch({type: "SYNONYMS", payload: [...state.synonyms, ...newSynonym]})
                break
            }
            case "table":{
                const server = state.servers.find(item => item.server_id === node.server_id)
                const database = state.databases.find(item => item.key === node.database_id)
                const database_login = getDatabaseLogin(server, database)
                const table = node.title.split(".")
                const columns = await axios.post("/api/column-info",
                    {database_login, owner: table[0], table:table[1]})
                    .then(res => res.data)
                const indexes = await axios.post("/api/index-info",
                    {database_login, owner: table[0], table:table[1]})
                    .then(res => res.data)
                let columnIndex = []
                columnIndex.push({
                    parentId: node.key,
                    title: "Columns",
                    key: nanoid(8),
                    icon: <i className="fa-light fa-folder"/>,
                    sub: columns.result.map(item=>({
                        server_id: node.server_id,
                        database_id: node.database_id,
                        parentId: node.key,
                        key: `${node.key}-${nanoid(8)}`,
                        title: item.attr_name,
                        type: "column",
                        icon: <i className="fa-light fa-columns-3"/>,
                        isLeaf: true,
                        ...item
                    }))
                })

                columnIndex.push({
                    parentId: node.key,
                    title: "Indexes",
                    key: nanoid(8),
                    icon: <i className="fa-light fa-folder"/>,
                    sub: indexes.result.map(item=>({
                        server_id: node.server_id,
                        database_id: node.database_id,
                        parentId: node.key,
                        key: `${node.key}-${nanoid(8)}`,
                        title: item.index_name,
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
            <div>
                {renderManu()}
                <Tree
                    onRightClick={handleContextMenu}
                    showLine
                    showIcon
                    loadData={loadData}
                    onSelect={onSelect}
                    treeData={buildTree(state.servers, state.sub_server,
                        state.databases, state.sub_database, state.tables,
                        state.views, state.serials, state.users, state.triggers,
                        state.synonyms, state.columns)}
                />
            </div>
    );
};
export default App;