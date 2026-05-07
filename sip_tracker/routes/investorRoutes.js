const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const {

    invalid_tokens

} = require('../models/authModel');

const {

    createInvestor,
    getInvestor,
    getHoldings,
    getNetworth

} = require('../controllers/investorController');



const verifyUser = (
    req,
    res,
    next
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



        if (
            invalid_tokens.includes(token)
        ) {

            return res.status(401).json({
                message:
                'Token expired. Please login again'
            });
        }



        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );



        if (
            decoded.investor_id !==
            req.params.investorId
        ) {

            return res.status(403).json({
                message: 'Access denied'
            });
        }



        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};



router.post(
    '/',
    createInvestor
);



router.get(
    '/:investorId',
    verifyUser,
    getInvestor
);



router.get(
    '/:investorId/holdings',
    verifyUser,
    getHoldings
);



router.get(
    '/:investorId/networth',
    verifyUser,
    getNetworth
);



module.exports = router;