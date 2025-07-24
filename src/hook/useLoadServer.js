import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {getBrokers} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import React, {useEffect} from "react";
import {setToken} from "@/utils/auth";
import {setBrokers, setServers, setSubServers} from "@/state/navigatorSlice";


export default function (node){
    const {servers} = useSelector(state => state.navigator)
    const dispatch = useDispatch();
    const server = servers.find(item => item.serverId === node.serverId)




    useEffect(async () => {
        console.log(node)
        const result = await setToken({...server})
        if(result.token) {
            const newServers = servers.map(server => {
                if (server.serverId === node.serverId) {
                    return {...server, token: result.token};
                }
                return server;
            })
            dispatch(setServers(newServers));


            const childData = [["Databases", "fa-database"], ["Brokers", "fa-folder-tree"], ["Logs", "fa-files"]]
            const newSubServer = childData.map(item => {
                const id = nanoid(8)
                return {
                    serverId: node.serverId,
                    parentId: node.key,
                    type: item[0].toLowerCase(),
                    title: item[0],
                    key: id,
                    icon: <i className={`fa-light ${item[1]}`}/>,
                    children: [],
                    isLeaf: false,
                }
            })
            const response = await getBrokers({...getAPIParam(server)})
            if (response.status) {
                const newBrokers = response.result.map(item => {
                    return {
                        serverId: node.serverId,
                        parentId: newSubServer[1].key,
                        title: `${item.name} (${item.port})`,
                        key: nanoid(8),
                        status: item.state,
                        name: item.name,
                        type: "broker",
                        icon: <i className={`fa-light fa-folder-gear ${item.state === "OFF" ? "warning" : "success"}`}></i>,
                        data: item
                    }
                })
                newSubServer[1].status = response.brokerstatus
                if (response.brokerstatus === "OFF") {
                    newSubServer[1].icon = <i className={`fa-light fa-folder-tree warning`}/>
                }
                dispatch(setBrokers(newBrokers));
        }
            dispatch(setSubServers(newSubServer));

        }
    }, [node]);


}