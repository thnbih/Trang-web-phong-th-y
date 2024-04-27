import React from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { BoiBai52La, BoiBaiTarot, BoiNgaySinh, Livestream, Account, Dashboard } from "./components/pages";
import './App.css';

function App() {
  return (
  <>
  <div className="App">
    <Navbar/>
    <Routes>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/BoiBai52La" element={<BoiBai52La/>}/>
      <Route path="/BoiBaiTarot" element={<BoiBaiTarot/>}/>
      <Route path="/BoiNgaySinh" element={<BoiNgaySinh/>}/>
      <Route path="/Livestream" element={<Livestream/>}/>
      <Route path="/Account" element={<Account/>}/>
    </Routes>
    
  </div>
    {/* <div><Footer/></div> */}
  </>
);
}

export default App;