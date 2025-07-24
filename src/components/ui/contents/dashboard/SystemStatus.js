import React, {useEffect} from 'react';
import { Space, Table, Tag } from 'antd';
import {useSelector} from "react-redux";
import {getDatabases} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
const columns = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Memory',
        dataIndex: 'memory',
        key: 'memory',
    },
    {
        title: 'Disk',
        dataIndex: 'disk',
        key: 'disk',
    },
    {
        title: 'CPU',
        dataIndex: 'cpu',
        key: 'cpu',
    },
    {
        title: 'TPS',
        dataIndex: 'tps',
        key: 'tps',
    },
    {
        title: 'QPS',
        dataIndex: 'qps',
        key: 'qps',
    }
];
const data = [
];

export default function (){
    const {brokers, servers} = useSelector(state=>state);
    const {selectedObject} = useSelector(state=>state.general);
    useEffect(async () => {
        if (selectedObject.serverId) {
            const server = servers.find(res => res.serverId === selectedObject.serverId)
            const response = await getDatabases({...getAPIParam(server)})

        }
    },[selectedObject])


    return <Table pagination={false} columns={columns} dataSource={data} />
}
