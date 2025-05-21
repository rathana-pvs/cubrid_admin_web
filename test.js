const axios = require('axios');
const https = require('https');
const fs = require('fs');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

const data = {
    task: "login",
    id: "admin",
    password: "password",
    clientver: "8.4"
};

axios.post('https://localhost:8001/cm_api', data, {
    headers: {
        'Content-Type': 'application/json'
    },
    httpsAgent: httpsAgent
})
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        const errorMessage = `[${new Date().toISOString()}] Error: ${error.message}\nStack: ${error.stack}\n\n`;

        console.log(errorMessage);
    });
