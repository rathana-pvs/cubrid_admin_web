import { Table } from 'antd';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccessLog, viewLog} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import {setLoading} from "@/state/dialogSlice";

const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        width: 60,
    },
    {
        title: 'User',
        dataIndex: '@user',
        key: 'user',
    },
    {
        title: "Task Name",
        dataIndex: 'taskname',
        key: 'taskname',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    }
];


export default function (){
    const {contents, activePanel} = useSelector(state => state.general);
    const dispatch = useDispatch()
    const {servers} = useSelector(state => state);
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadLogs = async () => {
        setLoading(true)
        const content = contents.find(res => res.key === activePanel)
        const server = servers.find(res => res.serverId === content.serverId)
        const response = await getAccessLog({...getAPIParam(server), path: content.path})
        setLoading(false)
        if(response.status){
            setMessage(response.result?.access_log
                .map((item, index) => ({no: index + 1, ...item})))
        }
    }
    useEffect(() => {
        loadLogs()
    }, []);

    return <Table dataSource={message} loading={loading} columns={columns} pagination={{ defaultPageSize: 30 }} />;
}


