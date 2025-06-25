import { Table } from 'antd';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {viewLog} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import {setLoading} from "@/state/dialogSlice";




export default function (){
    const {contents, activePanel} = useSelector(state => state.general);
    const dispatch = useDispatch()
    const {servers} = useSelector(state => state);
    const [message, setMessage] = useState([]);
    const loadLogs = async () => {
        const content = contents.find(res => res.key === activePanel)
        const server = servers.find(res => res.serverId === content.serverId)
        dispatch(setLoading(true))
        const response = await viewLog({...getAPIParam(server), path: content.path})
        dispatch(setLoading(false))
        if(response.status){
            setMessage(response.result?.map((item, index) => ({no: index + 1, message: item})))
        }
    }
    useEffect(() => {
        loadLogs()
    }, []);

    return <Table dataSource={message} columns={columns} pagination={false} />;
}


