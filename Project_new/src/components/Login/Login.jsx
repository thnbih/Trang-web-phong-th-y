import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie } from './cookie';
import Detail_Login  from './detail-login';
import { getUser } from '../auth/auth';

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