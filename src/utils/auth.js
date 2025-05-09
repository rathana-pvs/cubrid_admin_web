import {getLocalStorage, setLocalStorage} from "@/utils/storage";
import axios from "axios";


export const setToken = async ({uuid, host, port, id, password}) => {

    const response = await axios.post("/api/login", {host, port, id, password}).then(res => res.data);
    if(response.token){
        setLocalStorage(uuid, response.token);
    }
    return response

}