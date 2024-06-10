import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WalletContextProvider from './Context/WalletContextProvider'
import BalanceDisplay from './Components/BalanceDisplay'
import SendSolForm from './Components/SendSolForm'
import AppBar from './Components/AppBar'

function App() {
  
  return (
    <>
      <WalletContextProvider>
        <AppBar />
        <div>
          <BalanceDisplay />
          <SendSolForm />
        </div>
      </WalletContextProvider >
    </>
  )
}

export default App
