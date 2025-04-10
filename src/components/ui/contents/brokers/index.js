import React, {useEffect, useState} from 'react';
import {Divider, Space, Table, Tag} from 'antd';
import axios from "axios";
import {useAppContext} from "@/context/AppContext";
import {nanoid} from "nanoid";
import styles from '@/components/ui/contents/Contents.module.css'
const columns = [
    {
        title: 'NAME',
        dataIndex: 'name',
        key: nanoid(4)
    },
    {
        title: 'STATUS',
        dataIndex: 'state',
        key: nanoid(4)
    },
    {
        title: 'PID',
        dataIndex: 'pid',
        key: nanoid(4)
    },
    {
        title: 'PORT',
        dataIndex: 'port',
        key: nanoid(4),
    },
    {
        title: 'AS',
        dataIndex: 'as',
        key: nanoid(4),
    },
    {
        title: 'JQ',
        dataIndex: 'jq',
        key: nanoid(4),
    },
    {
        title: 'REQ',
        key: nanoid(4),
        dataIndex: 'req',
    },
    {
        title: 'TPS',
        key: nanoid(4),
        dataIndex: 'long_tran'
    },
    {
        title: 'QPS',
        key: nanoid(4),
        dataIndex: 'long_query'
    }
];

export default function (props){
    const {state, dispatch} = useAppContext();
    const [info, setInfo] = useState([]);

    const getBrokerInfo = async () => {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(item => item.server_id === content.server_id)
        const result = await axios.post("/api/general",
            {task: "getbrokersinfo", ...server}).then(res => res.data);
        const data = result.brokersinfo[0].broker

        setInfo(data.map(item => ({...item, key: nanoid(8)})))
    }

    useEffect(()=>{
        getBrokerInfo()
    },[])

    return (
        <div>
            <Table bordered pagination={false} columns={columns} dataSource={info} />
        </div>

    )
}