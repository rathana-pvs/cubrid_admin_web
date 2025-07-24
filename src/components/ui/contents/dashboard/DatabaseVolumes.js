import React, {useEffect} from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
    {
        title: 'Database',
        dataIndex: 'database',
        key: 'database',
    },
    {
        title: 'Data U/T/F',
        dataIndex: 'data',
        key: 'data',
    },
    {
        title: 'Index U/T/F',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Temp U/T/F',
        key: 'temp',
        dataIndex: 'temp',
    },
    {
        title: 'Generic U/T/F',
        key: 'generic',
        dataIndex: 'generic',
    },
    {
        title: 'Active log',
        key: 'active',
        dataIndex: 'active'
    },
    {
        title: 'Archive Log',
        key: 'archive',
        dataIndex: 'archive',
    }
];
const data = [
];

export default function (){

    useEffect(()=>{

    },[])


    return <Table pagination={false} columns={columns} dataSource={data} />
}
