"use client";
import React, {useEffect, useState} from 'react';
import {Tree} from 'antd';
import axios from "axios";
import {setToken} from "@/utils/auth";
import {useAppContext} from "@/context/AppContext";
import {generalAPI, generateIdObject, getServerData, getSharedData, isNotEmpty} from "@/utils/utils";
import TableMenu from "@/components/ui/menu/TableMenu";
import {nanoid} from "nanoid";
import {setLocalStorage} from "@/utils/storage";
import Servers from "@/components/ui/contents/Servers";
import Tables from "@/components/ui/contents/tables";
import {info} from "sass";


function buildTree(...dataSets) {
    const map = new Map();

    // Combine all items into a single map
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
    const [menTable, setMenuTable] = useState({ x: 0, y: 0, open:false });
    const [isClient, setIsClient] = useState(false);

    const handleContextMenu = ({event}) => {
        setMenuTable({ x: event.clientX, y: event.clientY, open: true });
    };
    useEffect(() => {
        setIsClient(true);
    }, []);

    const onSelect = async (selectedKeys, info) => {
        if (info.node.type === "server"){
            const checkObject = state.contents.find(item => item.label === info.node.title) || false;
            if(checkObject){
                dispatch({type: "PANEL_ACTIVE", payload: checkObject.key});
            }else{
                let key = nanoid(4);
                dispatch({type: "CONTENTS", payload: [...state.contents, {label: info.node.title,
                        children: <Servers/>,
                        key: key}]})
                dispatch({type: "PANEL_ACTIVE", payload: key})
            }

        }
        else if(info.node.type === "database"){
            dispatch({type: "LOGIN_DB_STATE", payload: true})
            setLocalStorage("selectedDatabase",info.node.id )
        }else if(info.node.type === "tables"){
            const checkObject = state.contents.find(item => item.label === info.node.title) || false;
            if(checkObject){
                dispatch({type: "PANEL_ACTIVE", payload: checkObject.key});
            }else{
                let key = nanoid(4);
                dispatch({type: "CONTENTS", payload: [...state.contents, {label: info.node.title,
                        children: <Tables/>,
                        key: key}]})
                dispatch({type: "PANEL_ACTIVE", payload: key})
            }
        }else if(info.node.type === "users"){
            const checkObject = state.contents.find(item => item.label === info.node.title) || false;
            let key = ""
            if(checkObject){
                key = checkObject.key
            }else{
                dispatch({type: "CONTENTS", payload: [...state.contents, {label: info.node.title,
                        children: `Content Users`,
                        key: key}]})
            }
            dispatch({type: "PANEL_ACTIVE", payload: key})
        }

    };
    const loadData = async (node) => {

        switch (node.type) {
            case "server":{
                const token = await setToken({...node, id: node.username})
                if (token) {
                    const newServerData = state.servers.map(res => {
                        if(res.id === node.id){
                            res.token = token;
                        }
                        return res;
                    });
                    dispatch({type:"SERVER_DATA", payload: newServerData});
                    const childData = [["Databases", "fa-database"], ["Brokers", "fa-folder-tree"], ["Logs", "fa-files"]]

                    const subServer = childData.map(item => {
                        const id = nanoid(8)
                        return {
                            server_id: node.id,
                            parentId: node.id,
                            id: id,
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
                const serverData = state.servers.find(item => item.id === node.server_id)
                const start_info = await axios.post("/api/start-info", {...serverData}).then(res=>res.data);
                const activeList = start_info.activelist[0].active
                const dbList = start_info.dblist[0].dbs
                const deActiveList = dbList.filter(obj2 => !activeList.some(obj1 => obj1.dbname === obj2.dbname));
                deActiveList.forEach(item => item.status = "inactive");
                const newDatabases = [...activeList, ...deActiveList].map(item => {
                    const id = nanoid(8)
                    return {
                        server_id: node.server_id,
                        id: id,
                        parentId: node.id,
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
                    ["Serial", "fa-input-numeric"], ["Users", "fa-users"],
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
                            children: []

                        }
                    })
                    dispatch({type: "SUB_DATABASE", payload: [...state.sub_database, ...subDatabase]})
                    break;
            }
            case "tables":{
                const server = state.servers.find(item => item.id === node.server_id)
                const database = state.databases.find(item => item.id === node.parentId)
                let allClass = []

                const classes = await axios.post("/api/class-info",
                    {...server, dbname: database.title})
                    .then(res => res.data);
                const [tables, views] = getTableOrView(classes);
                const systemId = nanoid(8)
                allClass.push({
                    server_id: node.server_id,
                    parentId: node.key,
                    title: "System Tables",
                    key: `${node.key}-${systemId}`,
                    type: "system-table",
                    icon: <i className="fa-light fa-folder"/>,
                    sub: tables[0].map((item) => ({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: item.classname,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "table",
                            icon: <i className="fa-light fa-table"/>,
                            isLeaf: true,
                    })),
                })
                tables[1].forEach(res=>{
                        allClass.push({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: res.classname,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "table",
                            icon: <i className="fa-light fa-table"/>
                        })
                })


                dispatch({type: "TABLES", payload: [...state.tables, ...allClass]})

                break;
            }
            case "views":{
                const server = state.servers.find(item => item.id === node.server_id)
                const database = state.databases.find(item => item.id === node.parentId)
                let allView = []

                const classes = await axios.post("/api/class-info",
                    {...server, dbname: database.title})
                    .then(res => res.data);
                const [tables, views] = getTableOrView(classes);
                const viewId = nanoid(8)
                allView.push({
                    server_id: node.server_id,
                    parentId: node.key,
                    title: "System Views",
                    key: `${node.key}-${viewId}`,
                    type: "system-view",
                    icon: <i className="fa-light fa-folder"/>,
                    sub: views[0].map((item) => ({
                        server_id: node.server_id,
                        parentId: `${node.key}-${viewId}`,
                        id: nanoid(8),
                        title: item.classname,
                        key: `${node.key}-${viewId}-${nanoid(8)}`,
                        type: "system-view",
                        icon: <i className="fa-light fa-eye"/>
                    })),
                })
                views[1].forEach(res=>{
                        allView.push({
                            server_id: node.server_id,
                            database_id: node.parentId,
                            parentId: node.key,
                            title: res.classname,
                            key: `${node.key}-${nanoid(8)}`,
                            type: "view",
                            icon: <i className="fa-light fa-eye"/>
                        })
                })
                dispatch({type: "VIEWS", payload: [...state.views, ...allView]})
                break
            }
            case "serial":{
                break
            }
            case "users":{
                const server = state.servers.find(item => item.id === node.server_id)
                const database = state.databases.find(item => item.id === node.parentId)
                const userInfo = await axios.post("/api/general", {task: "userinfo", dbname: database.title, ...server}).then(res => res.data)
                const newUser = userInfo.user.map(res=>{
                    return {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: res["@name"],
                        key: `${node.key}-${nanoid(8)}`,
                        type: "user",
                        icon: <i className="fa-light fa-user"/>,
                    }
                })
                dispatch({type: "USERS", payload: [...state.users, ...newUser]})
                break
            }
            case "triggers":{
                const server = state.servers.find(item => item.id === node.server_id)
                const database = state.databases.find(item => item.id === node.parentId)
                const triggerInfo = await axios.post("/api/general",
                    {task: "gettriggerinfo", dbname: database.title, ...server}).
                then(res => res.data)
                const newTrigger = triggerInfo.triggerlist[0].triggerinfo.map(res=>{
                    return {
                        server_id: node.server_id,
                        parentId: node.key,
                        title: res["name"],
                        key: `${node.key}-${nanoid(8)}`,
                        type: "trigger",
                        icon: <i className="fa-light fa-gear-code"></i>,
                        ...res
                    }
                })
                dispatch({type: "TRIGGERS", payload: [...state.triggers, ...newTrigger]})
                break
            }
            case "table":{

                const server = state.servers.find(item => item.id === node.server_id)
                const database = state.databases.find(item => item.id === node.database_id)
                const columns = await axios.post("/api/general",
                    {task: "class", dbname: database.title, classname: node.title, ...server})
                    .then(res => res.data)
                const {attribute, constraint} = columns.classinfo[0]
                let columnIndex = []
                columnIndex.push({
                    parentId: node.key,
                    title: "Columns",
                    key: nanoid(8),
                    icon: <i className="fa-light fa-folder"/>,
                    sub: attribute.map(res=>({
                        server_id: node.server_id,
                        database_id: node.database_id,
                        parentId: node.key,
                        key: `${node.key}-${nanoid(8)}`,
                        title: res["name"],
                        type: "column",
                        icon: <i className="fa-light fa-columns-3"></i>
                    }))
                })

                columnIndex.push({
                    parentId: node.key,
                    title: "Indexes",
                    key: nanoid(8),
                    icon: <i className="fa-light fa-folder"/>,
                    sub: constraint?.map(res=>({
                        server_id: node.server_id,
                        database_id: node.database_id,
                        parentId: node.key,
                        key: `${node.key}-${nanoid(8)}`,
                        title: res["name"],
                        type: "index",
                        icon: <i className="fa-light fa-columns-3"></i>
                    }))
                })
                console.log(columnIndex)
                dispatch({type: "COLUMNS", payload: [...state.columns, ...columnIndex]})
                break
            }


        }
    }


    const getTableOrView = (classes) => {

        const {systemclass, userclass} = classes;
        let systemTables = []
        let userTables = []
        let systemViews = []
        let userViews = []
        if (isNotEmpty(systemclass)) {
            systemclass[0].class.forEach(item => {
                item.type = "system";
                if (item.virtual === "view") {
                    systemViews.push(item)
                } else {
                    systemTables.push(item)
                }
            })
        }

        if (isNotEmpty(userclass)) {

            userclass[0].class.forEach(item => {
                item.type = "user";
                if (item.virtual === "view") {
                    userViews.push(item)
                } else {
                    userTables.push(item)
                }
            })
        }

        return [[systemTables, userTables], [systemViews, userViews]];

    }


    if (!isClient) return null;
    return (
            <div>
                <TableMenu {...menTable}/>
                <Tree
                    onRightClick={handleContextMenu}
                    showLine
                    showIcon
                    loadData={loadData}
                    onSelect={onSelect}
                    treeData={buildTree(state.servers, state.sub_server,
                        state.databases, state.sub_database, state.tables,
                        state.views, state.users, state.triggers, state.columns)}
                />
            </div>



    );
};
export default App;