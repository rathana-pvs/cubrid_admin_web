import axiosInstance from "@/lib/agent";

export default async function(req, res) {
    const { host, port, token } = req.body;
    console.log(req.body);
    await axiosInstance.post(`https://${host}:${port}/cm_api`, {
        token,
        task:"startinfo",
        clientver: "11.3"
    })
        .then(response => {
            const data = response.data;
            if(data.status === "failure"){
                if(data.note === "Request is rejected due to invalid token. Please reconnect."){
                    res.status(401).json({error:"token invalid"});
                }
                res.status(400).json({error:"bad request"});
            }
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

