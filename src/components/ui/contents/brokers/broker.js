import React, {useEffect, useState} from 'react';
import {Divider, Space, Table, Tag} from 'antd';
import axios from "axios";
import {useAppContext} from "@/context/AppContext";
import {nanoid} from "nanoid";
import styles from '@/components/ui/contents/Contents.module.css'
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
    const {state, dispatch} = useAppContext();
    const [info, setInfo] = useState([]);
    const [brokerStatus, setBrokerStatus] = useState([]);
    const [statusLoading, setStatusLoading] = useState(true);

    const getBrokerInfo = async () => {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(res => res.server_id === content.server_id)
        const brokerStatus = await axios.post("/api/general",
            {...server, task: "getbrokerstatus", bname: content.data.name}).then(res => res.data);
        const newBrokerStatus = brokerStatus.asinfo.map(res=>{
            return {...res, key: nanoid(8)}
        })
        setStatusLoading(false);
        setInfo([{...content.data, key: nanoid(8)}])
        setBrokerStatus(newBrokerStatus)

    }

    useEffect(()=>{
        getBrokerInfo()
    },[])

    return (
        <div>
            <Table bordered pagination={false} columns={columns} dataSource={info} />
            <Divider />
            <Table loading={statusLoading} bordered pagination={false} columns={columnsStatus} dataSource={brokerStatus} />
            <div className={styles.jobque__title}>Job Que</div>
            <Table bordered pagination={false} columns={columnsJobQue} dataSource={[]} />
        </div>

    )
}