import React, {useEffect, useState} from 'react';
import { Space, Table, Tag } from 'antd';
import {useSelector} from "react-redux";
import {getDatabases, getVersion} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
const columns = [
    {
        title: 'Database',
        dataIndex: 'database',
        key: 'database',
    },
    {
        title: 'Auto Startup',
        dataIndex: 'auto',
        key: 'auto',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    }
];
const data = [
    {
        key: '1',
        database: 'demodb',
        data: '-',
        index: '-',
        temp: '-',
        generic: '-',
        active: '100MB',
        archive: '100MB',
    },
    {
        key: '1',
        database: 'testdb',
        data: '-',
        index: '-',
        temp: '-',
        generic: '-',
        active: '512MB',
        archive: '512MB',
    },
];

export default function (){
    const {brokers, servers} = useSelector(state=>state);
    const {selectedObject} = useSelector(state=>state.general);
    const [server, setServer] = useState({});
    const [version, setVersion] = useState({});
    useEffect(() => {
        if (selectedObject.serverId) {
            const server = servers.find(res => res.serverId === selectedObject.serverId)
            setServer(server)
            getVersion({...getAPIParam(server)}).then(res=>{
                setVersion(res.result)
            })



        }
    },[selectedObject])


    return <div>
        <b>Host:</b> {server.host} : {server.port}<br/>
        <b>Cubrid Version:</b> {version.CUBRIDVER}<br/>
        <b>Broker Version:</b> {version.CMS_VER}<br/>
    </div>
}
