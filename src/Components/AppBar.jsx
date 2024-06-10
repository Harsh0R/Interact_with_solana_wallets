import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const AppBar = () => {
  return (
    <div>
      <span>Wallet-Adapter Example</span>
      <WalletMultiButton />
    </div>
  )
}

export default AppBar