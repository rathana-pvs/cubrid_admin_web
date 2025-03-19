import {getLocalStorage, setLocalStorage} from "@/utils/storage";
import axios from "axios";


export const setToken = async ({uuid, host, port, login}) => {
    // const value = getLocalStorage(uuid);
    //
    // if (value) {
    //     return value;
    // }
    const response = await axios.post("/api/login", {host, port, login}).then(res => res.data);
    if(response.token){
        setLocalStorage(uuid, response.token);
        return response.token;
    }
    return null

}