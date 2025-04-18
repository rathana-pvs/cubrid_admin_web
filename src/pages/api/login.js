import axiosInstance from "@/lib/agent";

export default async function(req, res) {
    const { host, port, login } = req.body;
    await axiosInstance.post(`https://${host}:${port}/cm_api`, {
        ...login,
        task:"login",
        clientver: "11.3"
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

