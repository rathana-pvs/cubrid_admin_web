import axiosInstance from "@/lib/agent";



export default async function handler(req, res) {

    try {
        const { method } = req;

        if (method === "POST"){
            const { host, port, token, ...data} = req.body;
            const response = await axiosInstance.post(`https://${host}:${port}/cm_api`, {
                ...data,
                task: "backupdb",
                token
            }).then(res=>res.data)
            if(response.status === "success"){
                res.status(200).json({...response, status:true})
            }else{
                res.status(200).json({...response, status:false})
            }

        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}
