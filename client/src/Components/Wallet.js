

import React, { useEffect, useState } from 'react';
import "../Styles/Wallet.css";

const Wallet = () => {
    const [balance, setBalance] = useState(0);

    const fetchBalance = async () => {
        const response = await fetch('http://localhost:5000/api/wallet/balance');
        const data = await response.json();
        setBalance(data.balance);
    };

    const deposit = async (amount) => {
        const response = await fetch('http://localhost:5000/api/wallet/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });
        const data = await response.json();
        setBalance(data.balance);
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div>
            <div>
                <h1>wallet</h1>
            </div>
            <div>
                <h3>Total Balance: {balance}</h3>
            </div>
            <div>
                <div>
                    <button onClick={() => deposit(300)}>300</button>
                    <button onClick={() => deposit(500)}>500</button>
                    <button onClick={() => deposit(1000)}>1000</button>
                    {/* <button>Deposit</button> */}
                </div>
            </div>
        </div>
    );
};

export default Wallet;