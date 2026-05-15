const {
    insertInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetworth,
    getAllInvestors
} = require('../models/investorModel');

const createInvestor = async (req, res) => {

    try {

        const result = await insertInvestor(req.body);

        res.status(201).json(result);

        console.log('Investor created successfully');
        console.log(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
        console.error('Error creating investor:', error);
    }
};

const getInvestor = async (req, res) => {

    try {

        const investor = await fetchInvestor(req.params.investorId);

        res.json(investor);

        console.log('Investor fetched successfully');
        console.log(investor);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

        console.error('Error fetching investor:', error);
    }
};

const getHoldings = async (req, res) => {

    try {

        const holdings = await fetchHoldings(req.params.investorId);

        res.json(holdings);

        console.log('Holdings fetched successfully');
        console.log(holdings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
        console.error('Error fetching holdings:', error);
    }
};

const getNetworth = async (req, res) => {

    try {

        const networth = await fetchNetworth(req.params.investorId);

        res.json(networth);

        console.log('Networth fetched successfully');
        console.log(networth);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
        console.error('Error fetching networth:', error);
    }
};

const allInvestors = async (req, res) => {

    try {
        const investors = await getAllInvestors();
        res.json(investors);
        console.log('All investors fetched successfully');
        console.log(investors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
        console.error('Error fetching all investors:', error);
    }
};

module.exports = {
    createInvestor,
    getInvestor,
    getHoldings,
    getNetworth,
    allInvestors
};