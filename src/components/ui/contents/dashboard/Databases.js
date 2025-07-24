import React, {useEffect, useState} from 'react';
import {Checkbox, Space, Table, Tag} from 'antd';
import {useSelector} from "react-redux";
import {getDatabases} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import {nanoid} from "nanoid";
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
        render: (_, record) => (
            <Checkbox
            />
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    }
];


export default function (){
    const {brokers, servers} = useSelector(state=>state);
    const {selectedObject} = useSelector(state=>state.general);
    const [data, setData] = useState([]);


    useEffect(() => {
        if (selectedObject.serverId) {
            const server = servers.find(res => res.serverId === selectedObject.serverId)
            getDatabases({...getAPIParam(server)}).then(response=>{
                setData(response.result.map(res=>{
                    return {
                        key: nanoid(4),
                        database: res.dbname,
                        auto: false,
                        status: res.status === "active" ? "running" : "stopped",
                    }
                }))
            })


        }
    },[selectedObject])


    return <Table pagination={false} columns={columns} dataSource={data} />
}
