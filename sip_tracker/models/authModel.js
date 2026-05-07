const db = require('../utility/dbManager');

const {
    signJWT
} = require('../utility/authManager');



const invalid_tokens = [];



const loginInvestor = async (
    email,
    password
) => {

    const sql = `
        SELECT *
        FROM investors
        WHERE email = ?
        AND password = ?
    `;

    const [rows] = await db.execute(
        sql,
        [email, password]
    );

    if (rows.length === 0) {

        throw new Error(
            'Invalid email or password'
        );
    }

    const investor = rows[0];



    const token = signJWT({

        investor_id: investor.investor_id,

        email: investor.email

    });



    return {

        investor_id: investor.investor_id,

        first_name: investor.first_name,

        last_name: investor.last_name,

        email: investor.email,

        phone_number: investor.phone_number,

        pan_number: investor.pan_number,

        token
    };
};



const logoutInvestor = async (
    email,
    token
) => {

    if (!invalid_tokens.includes(token)) {

        invalid_tokens.push(token);
    }

    return {

        message: 'Logout successful',

        email
    };
};



module.exports = {

    loginInvestor,

    logoutInvestor,

    invalid_tokens
};