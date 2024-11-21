const walletModel = require('../models/WalletModel');

const getBalance = (req, res) => {
    const balance = walletModel.getBalance();
    res.json({ balance });
};

const deposit = (req, res) => {
    const { amount } = req.body;
    if (!amount || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid amount' });
    }
    const newBalance = walletModel.deposit(amount);
    res.json({ balance: newBalance });
};

module.exports = {
    getBalance,
    deposit,
};