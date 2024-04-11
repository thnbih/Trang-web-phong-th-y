import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DashBoard from './components/DashBoard'
import BoiBaiTarot from './components/BoiBaiTarot/BoiBaiTarot'
import './App.css'
function App() {
  return (
    <>
      <header><Header/></header>

      <div><BoiBaiTarot/></div>
      <div>
        <Footer/>
      </div>
      
    </>
  )
}

export default App
