import axiosInstance from "@/lib/agent";
import {isNotEmpty} from "@/utils/utils";



export default async function handler(req, res) {

    try {
        const { method } = req;

        if (method === "POST"){
            const { host, port, token } = req.body;
            console.log(`https://${host}:${port}/cm_api`);
            const response = await axiosInstance.post(`https://${host}:${port}/cm_api`, {
                token,
                task:"getbrokersinfo"
            }).then(res => res.data);
            if(response.status === "success"){

                res.status(200).json({brokerstatus: response.brokerstatus, status: true, result: response.brokersinfo[0].broker});
            }
            res.status(200).json({status: false, note: response.note});

        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ success: false, note: error.message });
    }
}
