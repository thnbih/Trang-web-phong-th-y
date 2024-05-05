import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import {  Navigate } from "react-router-dom";
import { getCookie } from './cookie';
import Detail_Login  from './detail-login';


const Login = () => {
  const token = getCookie("token");

  return (
    <>
      {token ? (
        <Navigate to="/profilepage" />
      ) : (
        <Detail_Login />
      )}
      <Analytics />
    </>
  );
};



export default Login;