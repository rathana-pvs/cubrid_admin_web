import axiosInstance from "@/lib/agent";

export default async function handler(req, res) {

    try {
        const { method } = req;

        if (method === "POST"){
            const { host, port, database, token, table} = req.body;

            const response = await axiosInstance.post(`https://${host}:${port}/cm_api`, {
                dbname: database,
                classname: table,
                task:"class",
                token
            })
            const result = response.data.classinfo[0];
            res.status(200).json({ success: true, result: result});
        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
