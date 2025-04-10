import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Status',
        dataIndex: 'status',
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
        dataIndex: 'long_t',
    },
    {
        title: 'LONG-Q',
        dataIndex: 'long_q',
        key: 'long_q',
    },
    {
        title: 'EER-Q',
        key: 'err_q',
        dataIndex: 'err_q'
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
const Brokers = () => <Table pagination={false} columns={columns} dataSource={data} />;
export default Brokers;