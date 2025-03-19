import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time'
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
        key: 'cpu',
        dataIndex: 'cpu'
    },
    {
        title: 'QPS',
        key: 'qps',
        dataIndex: 'qps'
    },
    {
        title: 'TPS',
        key: 'tps',
        dataIndex: 'tps'
    }
];
const data = [
    {
        key: '1',
        time: 'Now',
        memory: '0GB / 0GB',
        disk: '192GB',
        cpu: '0%',
        tps: '0',
        qps: '0',
    }
];
const SystemStatus = () => <Table pagination={false} columns={columns} dataSource={data} />;
export default SystemStatus;