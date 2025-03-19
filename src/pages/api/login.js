const axios = require('axios');
const https = require('https');



export const getLogin = ({server, login})=>{


    return axios.post('https://localhost:8011/cm_api', {
        task: "login",
        id: "admin",
        password: "root",
        clientver: "11.3"
    }, )
        .then(response => {

            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

