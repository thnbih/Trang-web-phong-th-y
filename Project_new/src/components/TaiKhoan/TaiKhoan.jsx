import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../Login/cookie";
import { Analytics } from '@vercel/analytics/react';
import { getUser } from "../auth/auth";

function TaiKhoan() {
  const origin = window.location.origin;
  const user = getUser(origin);

  return (
    <>
      {user ? (<Navigate to="/profilepage" />) : (<Navigate to="/login" />)}
      <Analytics />
    </>
  );
}

export default TaiKhoan;