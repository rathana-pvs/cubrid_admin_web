import React, {useEffect, useState} from 'react';
import {Divider, Space, Table, Tag} from 'antd';
import axios from "axios";
import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import {getBrokerStatus} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
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
    const {brokers, servers} = useSelector(state=>state);
    const {selectedObject} = useSelector(state=>state.general);
    const [info, setInfo] = useState([]);

    const getBrokerInfo = async () => {

        const server = servers.find(item => item.serverId === selectedObject.serverId)
        const data = []
        for (let object of brokers) {
            const {result} = await getBrokerStatus({...getAPIParam(server), bname: object.name})
            data.push({
                key: nanoid(4),
                ...object.data,
                qps: result[0].as_num_query,
                tps: result[0].as_num_tran
            })
        }

        setInfo(data)
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