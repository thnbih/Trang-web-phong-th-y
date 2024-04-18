import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DashBoard from './components/DashBoard'
import BoiBaiTarot from './components/BoiBaiTarot/BoiBaiTarot'
import BoiBai52La from './components/BoiBai52La'
import './App.css'
function App() {
  return (
    <>
      <header><Header/></header>

      <div><DashBoard/></div>

      <div><BoiBaiTarot/></div>
      <div><BoiBai52La/></div>
      <div>
        <Footer/>
      </div>
      
    </>
  )
}

export default App