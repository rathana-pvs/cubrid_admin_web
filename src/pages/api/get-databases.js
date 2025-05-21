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
                task:"startinfo",
                clientver: "11.3"
            }).then(res => res.data);
            let databases = []
            if(response.status === "success"){
                if(isNotEmpty(response.activelist)){
                    for(let db of response.activelist[0].active){
                        databases.push({...db, status: "active"});
                    }
                }
                if(isNotEmpty(response.dblist)){
                    for (let db of response.dblist[0].dbs){
                        if (!databases.some(obj => obj.dbname === db.dbname)) {
                            databases.push({...db, status: "inactive"});
                        }

                    }
                }
                res.status(200).json({status: true, result: databases});
            }
            res.status(200).json({status: false, note: response.note});

        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}
