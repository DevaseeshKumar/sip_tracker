const { Client } = require('pg');

require('dotenv').config();

const client = new Client({

    host: process.env.host,

    port: process.env.port,

    user: process.env.user,

    password: process.env.password,

    database: process.env.database,

    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
.then(() => {

    console.log(
        'Database connected successfully'
    );

})
.catch((error) => {

    console.error(
        'Database connection failed:',
        error.message
    );
    
    console.error('Full error:', error);
});



module.exports = client;