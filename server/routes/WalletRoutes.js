const express = require('express');
const router = express.Router();
const walletController = require('../controllers/WalletController');

router.get('/balance', walletController.getBalance);
router.post('/deposit', walletController.deposit);

module.exports = router;