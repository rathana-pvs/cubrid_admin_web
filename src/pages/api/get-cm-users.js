import axiosInstance from "@/lib/agent";
import {isNotEmpty} from "@/utils/utils";



export default async function handler(req, res) {

    try {
        const { method } = req;

        if (method === "POST"){
            const { host, port, token} = req.body;
            const response = await axiosInstance.post(`https://${host}:${port}/cm_api`, {
                task: "getdbmtuserinfo",
                token
            }).then(res=>res.data)
            if(response.status === "success"){
                if(isNotEmpty(response.userlist)){
                    res.status(200).json({result: response.userlist[0].user, status:true})
                }

            }else{
                res.status(200).json({...response, status:false})
            }

        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ status: false, note: error.message });
    }
}
