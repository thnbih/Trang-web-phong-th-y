import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../Login/cookie";
import { Analytics } from '@vercel/analytics/react';


function TaiKhoan() {
  const token = getCookie("token");

  return (
    <>
      {token ? (<Navigate to="/profilepage" />) : (<Navigate to="/login" />)}
      <Analytics />
    </>
  )
}

export default TaiKhoan;