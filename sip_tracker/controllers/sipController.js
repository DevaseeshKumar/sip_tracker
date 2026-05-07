const {
    insertSIP,
    fetchSIP,
    processSIPTransaction,
    fetchTransactions
} = require('../models/sipModel');

const createSIP = async (req, res) => {

    try {

        const result = await insertSIP(req.body);

        res.status(201).json(result);

        console.log('SIP created successfully');
        console.log(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
        console.error('Error creating SIP:', error);
    }
};

const getSIP = async (req, res) => {

    try {

        const sip = await fetchSIP(req.params.sipId);

        res.json(sip);

        console.log('SIP fetched successfully');
        console.log(sip);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
        console.error('Error fetching SIP:', error);
    }
};

const processSIP = async (req, res) => {

    try {

        const result = await processSIPTransaction(req.params.sipId);

        res.json(result);

        console.log('SIP processed successfully');
        console.log(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
        console.error('Error processing SIP:', error);
    }
};

const getTransactions = async (req, res) => {

    try {

        const transactions = await fetchTransactions(req.params.sipId);

        res.json(transactions);

        console.log('Transactions fetched successfully');
        console.log(transactions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

        console.error('Error fetching transactions:', error);
    }
};

module.exports = {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
};