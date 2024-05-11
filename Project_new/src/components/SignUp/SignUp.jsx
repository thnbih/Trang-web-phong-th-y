import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { getCookie } from './cookie';
import Details_SignUp from './detail-sigup';

const SignUp = () => {
  const token = getCookie("token");

  return (
    <>
      {token ? (
        <Navigate to="/profilepage" />
      ) : (
        <Details_SignUp />
      )}
      <Analytics />
    </>
  )
}

export default SignUp;