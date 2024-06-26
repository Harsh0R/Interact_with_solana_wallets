import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react'
import * as web3 from '@solana/web3.js'

const SendSolForm = () => {

  const [txSig, setTxSig] = useState('');
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
  }

  const sendSol = (event) => {
    event.preventDefault()
    console.log("Pub key ==? ", publicKey);
    if (!connection || !publicKey) { return }
    const transaction = new web3.Transaction()
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value)

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: web3.LAMPORTS_PER_SOL * event.target.amount.value
    })

    transaction.add(sendSolInstruction)
    sendTransaction(transaction, connection).then(sig => {
      setTxSig(sig)
    })
  }

  return (
    <div>
      {
        publicKey ?
          <form onSubmit={sendSol}>
            <label htmlFor="amount">Amount (in SOL) to send:</label>
            <input id="amount" type="text" placeholder="e.g. 0.1" required />
            <br />
            <label htmlFor="recipient">Send SOL to:</label>
            <input id="recipient" type="text" placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
            <button type="submit">Send</button>
          </form> :
          <span>Connect Your Wallet</span>
      }
      {
        txSig ?
          <div>
            <p>View your transaction on </p>
            <a href={link()}>Solana Explorer</a>
          </div> :
          null
      }
    </div>
  )
}

export default SendSolForm