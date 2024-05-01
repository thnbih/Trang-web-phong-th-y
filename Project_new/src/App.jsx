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
<<<<<<< HEAD
import Call from './components/Call';
=======
import TaiKhoan from './components/TaiKhoan/TaiKhoan';
import ProfilePage from './components/ProfilePage';
import Logout from './components/Logout';
>>>>>>> 7bbfb33cc5871e4bfbe9ec62163e6e1cd7c7a3e9

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
          <Route path="/boi-bai-tarot" element={<BoiBaiTarot />} />
          <Route path="/boi-ngay-sinh" element={<BoiNgaySinh />} />
<<<<<<< HEAD
          <Route path="/livestream" element={<Call />} />
          <Route path="/tai-khoan" element={<SignUp />} />
=======
          <Route path="/livestream" element={<DashBoard />} />
>>>>>>> 7bbfb33cc5871e4bfbe9ec62163e6e1cd7c7a3e9
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tai-khoan" element={<TaiKhoan />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;