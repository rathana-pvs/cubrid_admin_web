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
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'PID',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'PORT',
        key: 'tags',
        dataIndex: 'tags'
    },
    {
        title: 'AS',
        key: 'tags',
        dataIndex: 'tags'
    },
    {
        title: 'JQ',
        key: 'tags',
        dataIndex: 'tags'
    },
    {
        title: 'REQ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'TPS',
        key: 'tags',
        dataIndex: 'tags'
    },
    {
        title: 'QPS',
        key: 'tags',
        dataIndex: 'tags'
    },
    {
        title: 'LONG-T',
        key: 'tags',
        dataIndex: 'tags'
    },
    {
        title: 'LONG-Q',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'EER-Q',
        key: 'tags',
        dataIndex: 'tags'
    }
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const Brokers = () => <Table pagination={false} columns={columns} dataSource={data} />;
export default Brokers;