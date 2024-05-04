import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import {  Navigate } from "react-router-dom";
import { getCookie } from "../Login/cookie";
import InfoUser from "./infouser";

function ProfilePage() {
  const token = getCookie("token");

  return (
    <>
      {token ? (
        <InfoUser />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
export default ProfilePage;