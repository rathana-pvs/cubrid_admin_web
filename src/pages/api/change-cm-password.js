import axiosInstance from "@/lib/agent";
import {generateToken, verifyToken} from "@/utils/remember-me";

export default async function handler(req, res) {

    try {
        const { method } = req;

        if (method === "POST"){

            let { host, port, id, token, ...data } = req.body;
            let password = verifyToken(data.hashPassword);
            if(password ===  data.oldPassword){
                const response = await axiosInstance.post(`https://${host}:${port}/cm_api`, {
                    id, newpassword: data.newPassword,
                    task:"setdbmtpasswd",
                    targetid: data.targetid,
                    token
                }).then(res=>res.data)
                if(response.status === "success"){
                    res.status(200).json({...response, newPassword: generateToken(data.newPassword), status: true});
                }else{
                    res.status(200).json({...response, status: false});
                }
            }else{
                res.status(200).json({status: false, note: "Incorrect password"});
            }




        }else{
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(200).json({ success: false, note: error.toString() });
    }
}
