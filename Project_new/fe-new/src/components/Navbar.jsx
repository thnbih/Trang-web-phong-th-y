import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export const Navbar = () => {
    return <nav>
        <Link to="/">An Nhiên</Link>
    <ul>
      <li><Link to="/BoiBai52La">Bói bài 52 Lá</Link></li>
      <li><Link to="/BoiBaiTarot">Bói bài Tarot</Link></li>
      <li><Link to="/BoiNgaySinh">Bói Ngày sinh</Link></li>
      <li><Link to="/Livestream">Livestream</Link></li>
      <li><Link to="/Account">Tài khoản</Link></li>
    </ul>
  </nav>
}