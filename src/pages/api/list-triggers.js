import axiosInstance from "@/lib/agent";



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
            console.log(response.data)
            if(response.data.triggerlist){
                result = response.data.triggerlist[0].triggerinfo;
            }

            res.status(201).json({ success: true, result: result});
        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(200).json({ success: false, note: error.message });
    }
}
