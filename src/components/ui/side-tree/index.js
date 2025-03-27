"use client";
import React, {useEffect, useState} from 'react';
import {Tree} from 'antd';
import axios from "axios";
import {setToken} from "@/utils/auth";
import {useAppContext} from "@/context/AppContext";
import {generalAPI, generateIdObject, getServerData, getSharedData, isNotEmpty} from "@/utils/utils";
import TableMenu from "@/components/ui/menu/TableMenu/ServerMenu";
import {nanoid} from "nanoid";
import {setLocalStorage} from "@/utils/storage";
import Servers from "@/components/ui/contents/Servers";
import Tables from "@/components/ui/contents/tables";
import {info} from "sass";


const tempTree = []
const App = () => {
    const {state, dispatch} = useAppContext();
    const [menTable, setMenuTable] = useState({ x: 0, y: 0, open:false });
    const [treeData, setTreeData] = useState([]);
    const [treeItems, setTreeItems] = useState([]);
    const [expandKey, setExpandKey] = useState('0-0');
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
        }else if(info.node.type === "classes"){
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
            if(checkObject){
                dispatch({type: "PANEL_ACTIVE", payload: checkObject.key});
            }else{
                let key = nanoid(4);
                dispatch({type: "CONTENTS", payload: [...state.contents, {label: info.node.title,
                        children: `Content Users`,
                        key: key}]})
                dispatch({type: "PANEL_ACTIVE", payload: key})
            }
        }

    };

    const handleContextMenu = ({event}) => {
        setMenuTable({ x: event.clientX, y: event.clientY, open: true });
    };

    const loadData = async (node) => {

        switch (node.type) {
            case "server": {
                const token = await setToken({uuid: node.uuid, ...node.data})
                if (token) {
                    const childData = [["Databases", "fa-database"], ["Brokers", "fa-folder-tree"], ["Logs", "fa-files"]]
                    const newChildren = childData.map((item, id) => ({
                        token,
                        id: node.title,
                        type: item[0].toLowerCase(),
                        title: item[0],
                        key: `${node.key}-${id}`,
                        icon: <i className={`fa-light ${item[1]}`}/>,
                        children: [],
                        server: node.title
                    }))
                    setTreeData((prevTreeData) => updateTreeData(prevTreeData, node.key, newChildren));
                }
                break
            }

            case "databases": {
                const sharedData = getSharedData(node.id);
                const serverData = getServerData(sharedData);
                const {token, key} = node
                const start_info = await axios.post("/api/start-info", serverData).then(res=>res.data);
                const activeList = start_info.activelist[0].active
                const dbList = start_info.dblist[0].dbs


                const deActiveList = dbList.filter(obj2 => !activeList.some(obj1 => obj1.dbname === obj2.dbname));
                deActiveList.forEach(item => item.status = "inactive");

                const {ids, obj} = generateIdObject([...activeList, ...deActiveList], {server_id: sharedData.uuid})

                const updatedServer = state.servers.map(res=>{
                    if(res.name === node.id ){
                        res["databases"] = ids
                    }
                    return res
                })
                dispatch({type: "SERVER_DATA", payload: updatedServer})
                dispatch({type: "DATABASE_DATA", payload: obj})

                const newChildren = [...activeList, ...deActiveList].map((item, index) => {
                    return {
                        id: node.id,
                        title: item.dbname,
                        key: `${key}-${index}`,
                        type: "database",
                        icon: <i className={`fa-light fa-database ${item.status === "inactive"?"warning": "success"}`}/>,
                        children: [
                            {   id: node.id,
                                title: "Tables",
                                key: `${key}-${index}-0`,
                                database: item.dbname,
                                database_id: ids[index],
                                type: "classes",
                                virtual: false,
                                icon: <i className="fa-light fa-table-tree"/>,
                                server: node.server

                            },
                            {
                                id: node.id,
                                title: "Views",
                                key: `${key}-${index}-1`,
                                database: item.dbname,
                                database_id: ids[index],
                                type: "classes",
                                virtual: true,
                                icon: <i className="fa-light fa-eye"></i>,
                                server: node.server

                            },
                            {   id: node.id,
                                title: "Serial",
                                key: `${key}-${index}-2`,
                                database: item.dbname,
                                database_id: ids[index],
                                type: "tables",
                                icon: <i className="fa-light fa-input-numeric"></i>,
                                server: node.server

                            },
                            {   id: node.id,
                                title: "Users",
                                key: `${key}-${index}-3`,
                                database: item.dbname,
                                database_id: ids[index],
                                type: "users",
                                icon: <i className="fa-light fa-users"></i>,
                                server: node.server

                            },
                            {
                                id: node.id,
                                title: "Trigger",
                                key: `${key}-${index}-4`,
                                database: item.dbname,
                                database_id: ids[index],
                                type: "trigger",
                                icon: <i className="fa-light fa-gears"></i>,
                                server: node.server

                            },
                            {
                                id: node.id,
                                title: "Synonyms",
                                key: `${key}-${index}-5`,
                                database: item.dbname,
                                database_id: ids[index],
                                type: "tables",
                                icon: <i className="fa-light fa-table-list"></i>,
                                server: node.server

                            },

                        ]

                    }
                });
                setTreeData((prevTreeData) => updateTreeData(prevTreeData, key, [...newChildren]));
                break;
            }
            case "classes": {
                let tableObject = []
                let viewsObject = []

                if(!state.databases[node.database_id].tables){
                    const data = await getTableOrView(node);

                    const tables = generateIdObject(data[0], {database_id: node.database_id})
                    const views = generateIdObject(data[1], {database_id: node.database_id})
                    tableObject = tables.obj
                    viewsObject = views.obj
                    dispatch({type: "DATABASE_DATA", payload: {...state.databases, tables: tables.ids, views:views.ids}})
                    dispatch({type: "TABLE_DATA", payload: tables.obj})
                    dispatch({type: "VIEW_DATA", payload: views.obj})
                }else{
                    tableObject = state.databases[node.database_id].tables.map(ids=>{
                        return state.tables[ids]
                    });
                    viewsObject = state.databases[node.database_id].views.map(ids=>{
                        return state.views[ids]
                    });
                }


                if(!node.virtual) {
                    updateTable("table", tableObject, node)
                }else {
                    updateView("view", viewsObject, node)

                }
                break;
            }

            case "users": {
                const  userInfo = await generalAPI(node, {task: "userinfo", dbname: node.database})
                const {ids, obj} = generateIdObject(userInfo.user, {database_id: node.database_id})
                dispatch({type: "DATABASE_DATA", payload: {...state.databases, users: ids}})
                dispatch({type: "USER_DATA", payload: obj})
                const newChildren = []
                Object.entries(obj).forEach(([key, value], index) => {
                    newChildren.push({
                        title: value["@name"],
                        key: `${node.key}-${index}`,
                        type: "user",
                        id:key,
                        icon: <i className="fa-light fa-user"/>,
                        server: node.server
                    })
                })
                setTreeData((prevTreeData) => updateTreeData(prevTreeData, node.key, newChildren));
            }
            break;
            case "trigger": {
                const triggerInfo = await generalAPI(node, {task: "gettriggerinfo", dbname: node.database})
                if(isNotEmpty(triggerInfo.triggerlist)){
                    const {ids, obj} = generateIdObject(triggerInfo.triggerlist[0].triggerinfo, {database_id: node.database_id})
                    dispatch({type: "DATABASE_DATA", payload: {...state.databases, triggers: ids}})
                    dispatch({type: "TRIGGER_DATA", payload: obj})
                    const newChildren = []
                    Object.entries(obj).forEach(([key, value], index) => {
                        newChildren.push({
                            title: value["name"],
                            key: `${node.key}-${index}`,
                            type: "trigger",
                            id: key,
                            icon: <i className="fa-light fa-gear-code"></i>,
                            server: node.server
                        })
                    })
                    setTreeData((prevTreeData) => updateTreeData(prevTreeData, node.key, newChildren));

                }
                break;
            }
            case "columns": {

                const table = state.tables[node.id]
                let attr = {}
                let index = {}
                if(!isNotEmpty(table.columns)) {
                    const columns = await generalAPI(node, {
                        task: "class",
                        dbname: node.database,
                        classname: table["classname"]
                    })
                    const {attribute, constraint} = columns.classinfo[0]
                    attr = generateIdObject(attribute, {table_id: node.id})
                    index = generateIdObject(constraint, {table_id: node.id})
                    table["columns"] = attr.ids
                    table["constraint"] = index.ids
                    dispatch({type: "TABLE_DATA", payload: table})
                    dispatch({type: "COLUMN_DATA", payload: attr.obj})
                    dispatch({type: "CONSTRAINT_DATA", payload: index.obj})
                }else {
                    attr.obj = table.columns.map(ids => {
                        return state.columns[ids]
                    });
                    index.obj = table.constraint.map(ids => {
                        return state.constraint[ids]
                    });
                }
                console.log(index)
                if(!node.constraint){
                    updateColumn(attr.obj, node)
                }else{
                    updateConstraint(index.obj, node)
                }


            }
        }
    }

    const updateTreeData = (list, key, children) =>
        list.map((node) => {
            if (node.key === key) {
                return { ...node, children }; // Return new object with updated children
            }
            if (node.children) {
                return { ...node, children: updateTreeData(node.children, key, children) };
            }
            return node;
        });

    useEffect(()=>{

        if(treeData.length === 0){
            const treeResult = state.server.map((item,index) => {
                return {
                    title: item.name,
                    data: {host: item.host, port: item.port, login: {id: item.id, password: item.password}},
                    key: `${index}`,
                    type: 'server',
                    uuid: item.uuid,
                    icon: <i className="fa-light fa-server success"/>,
                    children: []
                }
            })
            setTreeData([...treeResult]);
        }
    },[state.server]);


    const updateColumn = (data, node)=>{
        const newChildren = []
        Object.entries(data).forEach(([key, value], index) => {
            newChildren.push({
                title: value["name"],
                key: `${node.key}-${index}`,
                type: "column",
                id: key,
                icon: <i className="fa-light fa-columns-3"></i>,
                server: node.server
            })
        })
        setTreeData((prevTreeData) => updateTreeData(prevTreeData, node.key, newChildren));
    }

    const updateConstraint = (data, node)=>{
        const newChildren = []
        Object.entries(data).forEach(([key, value], index) => {
            console.log(value)
            newChildren.push({
                title: value["name"],
                key: `${node.key}-${index}`,
                type: "index",
                id: key,
                icon: <i className="fa-light fa-key"></i>,
                server: node.server
            })
        })
        setTreeData((prevTreeData) => updateTreeData(prevTreeData, node.key, newChildren));
    }
    const updateTable =(type, data, node)=>{
        const newChildren = []
        newChildren.push({
            title: "System Tables",
            key: `${node.key}-0`,
            type: "system-table",
            icon: <i className="fa-light fa-folder"/>,
            children: [],
        })
        Object.entries(data).forEach(([key, value], index) => {
            const item = {
                id: key,
                title: value.classname,
                key: `${node.key}-${index+1}`,
                type: "table",
                icon: <i className="fa-light fa-table"/>,
                children: [
                    {
                        id: key,
                        title: "Columns",
                        key: `${node.key}-${index+1}-0`,
                        type: "columns",
                        constraint: false,
                        database: node.database,
                        icon: <i className="fa-light fa-folder"/>,
                        server: node.server,
                        children: [

                        ]
                    },
                    {
                        id: key,
                        title: "Indexes",
                        key: `${node.key}-${index+1}-1`,
                        type: "columns",
                        constraint:true,
                        database: node.database,
                        icon: <i className="fa-light fa-folder"/>,
                        server: node.server,
                        children: [

                        ]
                    }
                ]
            }
            if(value.type === "user"){
                newChildren.push(item)
            }else {
                item[key] = `${node.key}-0-${index}`
                newChildren[0].children.push(item)
            }

        });
        setTreeData((prevTreeData) => updateTreeData(prevTreeData, node.key, newChildren));

    }

    const updateView =(type, data, node)=>{
        const newChildren = []
        newChildren.push({
            title: "System Views",
            key: `${node.key}-0`,
            type: "system-view",
            icon: <i className="fa-light fa-folder"/>,
            children: [],
        })

        Object.entries(data).forEach(([key, value], index) => {
            const item = {
                id: key,
                title: value.classname,
                key: `${node.key}-${index+1}`,
                type: "view",
                icon: <i className="fa-light fa-eye"/>,
            }
            if(value.type === "user"){
                newChildren.push(item)
            }else {
                item[key] = `${node.key}-0-${index}`
                newChildren[0].children.push(item)
            }

        });
        // console.log(newChildren);
        setTreeData((prevTreeData) => updateTreeData(prevTreeData, node.key, newChildren));
    }

    const getTableOrView = async (node) => {
        const sharedData = getSharedData(node.id);
        const serverData = getServerData(sharedData);
        const classes = await axios.post("/api/class-info", {
            ...serverData,
            dbname: node.database
        }).then(res => res.data);
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

        return [[...systemTables, ...userTables], [...systemViews, ...userViews]];

    }


    useEffect(()=>{

        const newDatabase = []
        for(const [key, item] of state.databases){


            newDatabase.push( {
                title: item.dbname,
                key: item.key,
                type: "database",
                icon: <i className={`fa-light fa-database ${item.status === "inactive"?"warning": "success"}`}/>,
                children: [
                    {
                        ref: item.ref,
                        title: "Tables",
                        key: `${item.key}-0`,
                        database_id: key,
                        type: "classes",
                        virtual: false,
                        icon: <i className="fa-light fa-table-tree"/>,

                    },
                    {
                        title: "Views",
                        key: `${item.key}-1`,
                        database: item.dbname,
                        database_id: key,
                        type: "classes",
                        virtual: true,
                        icon: <i className="fa-light fa-eye"></i>,

                    },
                    {
                        title: "Serial",
                        key: `${item.key}-2`,
                        database: item.dbname,
                        database_id: key,
                        type: "tables",
                        icon: <i className="fa-light fa-input-numeric"></i>,

                    },
                    {
                        title: "Users",
                        key: `${item.key}-3`,
                        database: item.dbname,
                        database_id: key,
                        type: "users",
                        icon: <i className="fa-light fa-users"></i>,

                    },
                    {
                        title: "Trigger",
                        key: `${item.key}-4`,
                        database: item.dbname,
                        database_id: key,
                        type: "trigger",
                        icon: <i className="fa-light fa-gears"></i>,

                    },
                    {
                        title: "Synonyms",
                        key: `${item.key}-5`,
                        database: item.dbname,
                        database_id: key,
                        type: "tables",
                        icon: <i className="fa-light fa-table-list"></i>,

                    },

                ]

            })
        }



    },[state.servers, state.databases])



    return (
            <div style={{paddingRight:0}} >
                <TableMenu {...menTable}/>
                <Tree
                    onRightClick={handleContextMenu}
                    showLine
                    showIcon
                    expandKey={expandKey}
                    key={expandKey}
                    loadData={loadData}
                    onSelect={onSelect}
                    treeData={treeData}
                />
            </div>

    );
};
export default App;