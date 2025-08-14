import {getDatabases} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import {nanoid} from "nanoid";
import {setDatabase} from "@/state/databaseSlice";


export const refreshDatabases = async (dispatch, oldState, server, node) => {

    const response =  await getDatabases(getAPIParam(server));
    const newDatabases = response.result.map(item => {
        const id = nanoid(8)
        return {
            serverId: node.serverId,
            parentId: node.key,
            title: item.dbname,
            key: id,
            type: "database",
            isLogin: false,
            status: item.status,
            icon: <i className={`fa-light fa-database ${item.status === "inactive" ? "warning" : "success"}`}/>,
            ...item
        }
    })
    const newState = oldState.filter(res=>res.serverId !== node.serverId);
    dispatch(setDatabase([...newState, ...newDatabases]));


}