const jwt = require('jsonwebtoken');

const {

    loginInvestor,
    logoutInvestor,
    invalid_tokens

} = require('../models/authModel');



const login = async (
    req,
    res
) => {

    try {

        const result =
            await loginInvestor(
                req.body.email,
                req.body.password
            );

        res.json(result);

    } catch (error) {

        res.status(401).json({
            message: error.message
        });
    }
};



const logout = async (
    req,
    res
) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                message: 'Token missing'
            });
        }

        const token =
            authHeader.split(' ')[1];

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        const result =
            await logoutInvestor(
                decoded.email,
                token
            );

        res.json(result);

    } catch (error) {

        res.status(401).json({
            message: 'Logout failed'
        });
    }
};



module.exports = {

    login,
    logout
};