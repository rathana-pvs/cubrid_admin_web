import React, {useEffect, useState} from 'react';
import { Space, Table, Tag } from 'antd';
import {useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {getBrokerStatus} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Status',
        dataIndex: 'state',
        key: 'status',
    },
    {
        title: 'PID',
        dataIndex: 'pid',
        key: 'pid',
    },
    {
        title: 'PORT',
        key: 'port',
        dataIndex: 'port'
    },
    {
        title: 'AS',
        key: 'as',
        dataIndex: 'as'
    },
    {
        title: 'JQ',
        key: 'jq',
        dataIndex: 'jq'
    },
    {
        title: 'REQ',
        dataIndex: 'req',
        key: 'req',
    },
    {
        title: 'TPS',
        key: 'tps',
        dataIndex: 'tps'
    },
    {
        title: 'QPS',
        key: 'qps',
        dataIndex: 'qps'
    },
    {
        title: 'LONG-T',
        key: 'long_t',
        dataIndex: 'long_tran_time',
    },
    {
        title: 'LONG-Q',
        dataIndex: 'long_query_time',
        key: 'long_q',
    },
    {
        title: 'EER-Q',
        key: 'err_q',
        dataIndex: 'error_query'
    }
];
const data = [
    {
        key: '1',
        name: 'query_editor',
        status: 'ON',
        pid: '2831',
        port: '33000',
        as: '5',
        qj:'0',
        req: '419',
        qps: '193',
        tps: '97',
        long_t: '0/60000',
        long_q: '0/60000',
        err_q: '0'

    }
];

export default function () {
    const {brokers, servers} = useSelector(state=>state);
    const {selectedObject} = useSelector(state=>state.general);
    const [brokerData, setBrokerData] = useState();
    useEffect(async () => {
        if (brokers.length) {
            const server = servers.find(res => res.serverId === selectedObject.serverId)
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
           setBrokerData(data)


        }
    },[brokers])


    return <Table pagination={false} columns={columns} dataSource={brokerData} />;
}

