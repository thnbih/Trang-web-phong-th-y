import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navigate, useNavigate } from "react-router-dom";
import Detail_Login  from './detail-login';
import { getUser } from '../auth/auth';

const Login = () => {
  const origin = window.location.origin;
  const user = getUser(origin);

  return (
    <>
      {user ? (
        <Navigate to="/profilepage" />
      ) : (
        <Detail_Login />
      )}
      <Analytics />
    </>
  );
};

export default Login;