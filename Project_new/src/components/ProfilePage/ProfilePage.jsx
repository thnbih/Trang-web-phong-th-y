import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import {  Navigate } from "react-router-dom";
import { getCookie } from "../Login/cookie";
import InfoUser from "./infouser";
import { Analytics } from '@vercel/analytics/react';


function ProfilePage() {
  const token = getCookie("token");

  return (
    <>
      {token ? (
        <InfoUser />
      ) : (
        <Navigate to="/login" />
      )}
      <Analytics />
    </>
  );
}
export default ProfilePage;