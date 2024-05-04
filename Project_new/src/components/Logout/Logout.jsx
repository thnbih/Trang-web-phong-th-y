import { useEffect } from "react";
import { deleteAllCookies } from "../Login/cookie";
import { useNavigate } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';


function Logout() {
  const navigate = useNavigate();
  deleteAllCookies();
  useEffect(() => {
    navigate("/login");
  }, []);

  return <>
    <Analytics />
  </>;
}

export default Logout;