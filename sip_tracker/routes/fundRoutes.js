const express = require('express');

const router = express.Router();

const {

    createAMC,
    getAMCs,

    createFund,
    getFunds,

    updateNAV

} = require('../controllers/fundController');



router.post('/amc', createAMC);

router.get('/amc', getAMCs);



router.post('/', createFund);

router.get('/', getFunds);

router.put('/:fundId/nav', updateNAV);



module.exports = router;