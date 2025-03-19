import axiosInstance from "@/lib/agent";

export default async function(req, res) {
    const { host, port, ...data } = req.body;
    console.log(data)
    await axiosInstance.post(`https://${host}:${port}/cm_api`, {
        ...data,
        task:"dbmtuserlogin"
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

