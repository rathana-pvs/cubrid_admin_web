import {createConnection, query} from "@/lib/odbc-cubrid";
import axiosInstance from "@/lib/agent";
import {isNotEmpty} from "@/utils/utils";


export default async function handler(req, res) {

    try {
        const { method } = req;

        if (method === "POST"){
            const { host, port, database, token, virtual} = req.body;

            const response = await axiosInstance.post(`https://${host}:${port}/cm_api`, {
                dbname: database,
                task:"classinfo",
                token,
                dbstatus:"on"
            })
            const {systemclass, userclass} = response.data;
            let result = {system_class: [], user_class: []}
            console.log(response)
            if(isNotEmpty(systemclass)){
                result.system_class = systemclass[0].class.filter(res=>res.virtual === virtual);
            }
            if(isNotEmpty(userclass)){
                result.user_class = userclass[0].class.filter(res=>res.virtual === virtual);
            }
            res.status(201).json({ success: true, result: result});
        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
