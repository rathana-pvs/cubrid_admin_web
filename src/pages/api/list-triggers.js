import {createConnection, query} from "@/lib/odbc-cubrid";
import axiosInstance from "@/lib/agent";
import {isNotEmpty} from "@/utils/utils";


export default async function handler(req, res) {

    try {
        const { method } = req;

        if (method === "POST"){
            const { host, port, database, token} = req.body;

            const response = await axiosInstance.post(`https://${host}:${port}/cm_api`, {
                dbname: database,
                task:"gettriggerinfo",
                token
            })
            let result = []
            if(isNotEmpty(response.data.triggerlist)){
                result = response.data.triggerlist[0].triggerinfo;
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
