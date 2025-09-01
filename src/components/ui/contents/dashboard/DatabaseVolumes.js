import React, {useEffect, useState} from 'react';
import { Space, Table, Tag } from 'antd';
import {getDatabases, getDBSpace} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import {useSelector} from "react-redux";
const columns = [
    {
        title: 'Database',
        dataIndex: 'database',
        key: 'database',
    },
    {
        title: 'Temp U/T/F',
        dataIndex: 'temporary',
        key: 'temporary',
    },
    {
        title: 'Permanent U/T/F',
        dataIndex: 'permanent',
        key: 'permanent',
    },
    {
        title: 'Active log',
        key: 'activeLog',
        dataIndex: 'activeLog'
    },
    {
        title: 'Archive Log',
        key: 'archiveLog',
        dataIndex: 'archiveLog',
    }
];


const getSizeFormat = (size)=>{
    if(size >= 1024 ** 3){
        return `${(size/1024**3).toFixed(0)}GB`
    }else if(size>=1024**2){
        return `${(size/1024**2).toFixed(0)}MB`;
    }else if(size>=1024){
        return `${(size/1024**2).toFixed(0)}KB`;
    }else{
        return `${size}B`;
    }
}


export default function (){
    const {servers} = useSelector(state=>state);
    const {selectedObject} = useSelector(state=>state.general);
    const [dataSource, setDataSource] = useState([]);

    const getVolumeColumn = (dbSpace, type)=>{
        let totalPage = 0
        let freePage = 0
        let pageSize = parseInt(dbSpace.pagesize);
        for(const space of dbSpace.spaceinfo){
            if(space.type === type){
                totalPage = totalPage + parseInt(space.totalpage)
                freePage = freePage + parseInt(space.freepage)
            }
        }
        if(totalPage > 0){
            return `${getSizeFormat((totalPage - freePage) * pageSize)} / ${getSizeFormat(totalPage*pageSize)}
             / ${(freePage*100/totalPage).toFixed(0)}%`
        }
        return "-"
    }

    const getLogColumn = (dbSpace, type)=>{
        let totalPage = 0
        let pageSize = parseInt(dbSpace.pagesize);
        for(const space of dbSpace.spaceinfo){
            if(space.type === type){
                totalPage = totalPage + parseInt(space.totalpage)
            }
        }
        if(totalPage > 0){
            return getSizeFormat(totalPage * pageSize)
        }
        return "-"
    }


    const getSpaceInfo = async (server) => {
        const resDB = await getDatabases(getAPIParam(server));
        let permanent = "-"
        let temporary = "-"
        let activeLog = "-"
        let archiveLog = "-"
        let tempData = []
        if(resDB.status){
            for(const database of resDB.result){
                if(database.status === "active"){
                    const resSpaceInfo = await getDBSpace({...getAPIParam(server), database: database.dbname})
                    if(resSpaceInfo.status){

                        for(const spaceInfo of resSpaceInfo.result.spaceinfo){
                            if(spaceInfo.type === "PERMANENT"){
                                permanent = getVolumeColumn(resSpaceInfo.result, spaceInfo.type)
                            }else if(spaceInfo.type === "TEMPORARY"){
                                temporary = getVolumeColumn(resSpaceInfo.result, spaceInfo.type)
                            }else if(spaceInfo.type === "Active_log"){
                                activeLog = getLogColumn(resSpaceInfo.result, spaceInfo.type)
                            }else if(spaceInfo.type === "Archive_log"){
                                archiveLog = getLogColumn(resSpaceInfo.result, spaceInfo.type)
                            }
                        }
                    }
                    tempData.push({
                        database: database.dbname,
                        permanent,
                        temporary,
                        activeLog,
                        archiveLog
                    })
                }

            }
        }
        setDataSource(tempData)



    }

    useEffect(()=>{
        if(selectedObject.serverId){
            const server = servers.find(res => res.serverId === selectedObject.serverId)
            getSpaceInfo(server)
        }

    },[selectedObject])


    return <Table pagination={false} columns={columns} dataSource={dataSource} />
}
