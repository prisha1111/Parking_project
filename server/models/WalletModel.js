let balance = 0;

const getBalance = () => balance;

const deposit = (amount) => {
    balance += amount;
    return balance;
};

module.exports = {
    getBalance,
    deposit,
};