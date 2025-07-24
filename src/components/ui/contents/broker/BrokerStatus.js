import React, {useEffect, useState} from 'react';
import {Divider, Space, Table, Tag} from 'antd';
import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import {getBrokerStatus} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
const columns = [
    {
        title: 'PID',
        dataIndex: 'pid',
        key: '1'
    },
    {
        title: 'PORT',
        dataIndex: 'port',
        key: '2',
    },
    {
        title: 'JOB QUE',
        dataIndex: 'jq',
        key: '3',
    },
    {
        title: 'AUTO ADD APPLY SERVER',
        key: '5',
        dataIndex: 'auto',
        ellipsis: true,
    },
    {
        title: 'SQL LOG MODE',
        key: '5',
        dataIndex: 'sqll'
    },
    {
        title: 'SESSION TIMEOUT',
        key: '6',
        dataIndex: 'ses'
    },
    {
        title: 'KEEP CONNECTION',
        dataIndex: 'keep_conn',
        key: '7',
        ellipsis: true,
    },
    {
        title: 'ACCESS MODE',
        key: '8',
        dataIndex: 'access_mode',
    }
];


const columnsStatus = [
    {
        title: 'ID',
        dataIndex: 'as_id',
        key: '1'
    },
    {
        title: 'PID',
        dataIndex: 'as_pid',
        key: '2',
    },
    {
        title: 'QPS',
        dataIndex: 'as_num_query',
        key: '3',
    },
    {
        title: 'LQS',
        dataIndex: 'as_long_query',
        key: '4'
    },
    {
        title: 'PSIZE',
        dataIndex: 'as_psize',
        key: '5',
    },
    {
        title: 'STATUS',
        dataIndex: 'as_status',
        key: '6',
    },
    {
        title: 'DB',
        dataIndex: 'as_dbname',
        key: '8',
    },
]


const columnsJobQue = [
    {
        title: 'ID',
        dataIndex: 'as_id',
        key: '1'
    },
    {
        title: 'PRIORITY',
        dataIndex: 'as_priority',
        key: '2',
    },
    {
        title: 'ADDRESS',
        dataIndex: 'as_address',
        key: '3',
    },
    {
        title: 'TIME',
        dataIndex: 'as_time',
        key: '4'
    },
    {
        title: 'REQ',
        dataIndex: 'as_req',
        key: '5',
    }
]

export default function (props){
    const {brokers, servers} = useSelector(state=>state);
    const {selectedObject} = useSelector(state=>state.general);
    const [info, setInfo] = useState([]);
    const [brokerStatus, setBrokerStatus] = useState([]);
    const [statusLoading, setStatusLoading] = useState(true);

    const getBrokerInfo = async () => {
        const server = servers.find(res => res.serverId === selectedObject.serverId)
        const {result} = await getBrokerStatus({...getAPIParam(server), bname: selectedObject.name})
        const newBrokerStatus = result.map(res=>{
            return {...res, key: nanoid(8)}
        })
        setStatusLoading(false);
        setInfo([{...selectedObject.data, key: nanoid(8)}])
        setBrokerStatus(newBrokerStatus)

    }

    useEffect(()=>{
        getBrokerInfo()
    },[])
    console.log(info)
    return (
        <div>
            <Table bordered pagination={false} columns={columns} dataSource={info} />
            <Divider />
            <Table loading={statusLoading} bordered pagination={false} columns={columnsStatus} dataSource={brokerStatus} />
            <div>Job Que</div>
            <Table bordered pagination={false} columns={columnsJobQue} dataSource={[]} />
        </div>

    )
}