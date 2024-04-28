import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DashBoard from './components/DashBoard';
import BoiBaiTarot from './components/BoiBaiTarot/BoiBaiTarot';
import BoiBai52La from './components/BoiBai52La';
import BoiNgaySinh from './components/BoiNgaySinh';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/boi-bai-52-la" element={<BoiBai52La />} />
          <Route path="/boi-bai-tay" element={<BoiBaiTarot />} />
          <Route path="/boi-ngay-sinh" element={<BoiNgaySinh />} />
          <Route path="/livestream" element={<DashBoard />} />
          <Route path="/tai-khoan" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
