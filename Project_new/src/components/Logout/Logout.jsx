import { useEffect } from "react";
import { deleteAllCookies } from "../Login/cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  deleteAllCookies();
  useEffect(() => {
    navigate("/login");
  }, []);

  return <></>;
}

export default Logout;