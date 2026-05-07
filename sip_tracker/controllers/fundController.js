const {

    insertAMC,
    fetchAMCs,

    insertFund,
    fetchFunds,

    updateFundNAV

} = require('../models/fundModel');



const createAMC = async (req, res) => {

    try {

        const result =
            await insertAMC(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



const getAMCs = async (req, res) => {

    try {

        const amcs =
            await fetchAMCs();

        res.json(amcs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



const createFund = async (req, res) => {

    try {

        const result =
            await insertFund(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



const getFunds = async (req, res) => {

    try {

        const funds =
            await fetchFunds();

        res.json(funds);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



const updateNAV = async (req, res) => {

    try {

        const result =
            await updateFundNAV(
                req.params.fundId,
                req.body.current_nav
            );

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {

    createAMC,
    getAMCs,

    createFund,
    getFunds,

    updateNAV
};