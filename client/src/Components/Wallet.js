import React, {useState} from 'react'
import "../Styles/Wallet.css"

const Wallet = () => {
    const [balance,setBalance]= useState(0);
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
            <button onClick={()=>setBalance(balance+300)}>300</button>
            <button onClick={()=>setBalance(balance+500)}>500</button>
            <button onClick={()=>setBalance(balance+1000)}>1000</button>
            {/* <button>Deposit</button> */}
        </div>
    </div>
    </div>

  )
}

export default Wallet
