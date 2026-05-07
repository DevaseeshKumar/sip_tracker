const express = require('express');
const router = express.Router();

const {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
} = require('../controllers/sipController');

const {
    verifyUser
} = require('../controllers/authController');

router.post('/',  createSIP);

router.get('/:sipId',  getSIP);

router.post('/:sipId/process',  processSIP);

router.get('/:sipId/transactions',  getTransactions);

module.exports = router;