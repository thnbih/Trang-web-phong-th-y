import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../Login/cookie";

function TaiKhoan() {
  const token = getCookie("token");

  return (
    <>
      {token ? (<Navigate to="/profilepage" />) : (<Navigate to="/login" />)}
    </>
  )
}

export default TaiKhoan;