import React, { useState } from 'react';
import axios from 'axios';
import styles from './BoiNgaySinh.module.css';
import { Analytics } from '@vercel/analytics/react';
import { getAccessToken, getUser } from '../auth/auth';


function BoiNgaySinh() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [monthMeaning, setMonthMeaning] = useState('');
  const [yearMeaning, setYearMeaning] = useState('');
  const [soChuDao, setSoChuDao] = useState('');
  const [overallMessage, setOverallMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const origin = window.location.origin;
      const accessToken = getAccessToken(origin);
      const userString = getUser(origin);
      const user = JSON.parse(userString);
      const userId = user._id;
      if (!accessToken) {
        console.error('Access token not found');
        return;
      }
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const requestBody = {
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        userId: userId,
      };
  
      const response = await axios.post('http://localhost:5000/api/boi-ngay-sinh', requestBody, { headers });
      const { zodiacSign, monthMeaning, yearMeaning, soChuDao, summarizedMeaning } = response.data;
  
      if (summarizedMeaning) {
        setZodiacSign(zodiacSign);
        setMonthMeaning(monthMeaning);
        setYearMeaning(yearMeaning);
        setSoChuDao(soChuDao);
        setOverallMessage(summarizedMeaning);
        setShowResult(true);
      } else {
        setZodiacSign(zodiacSign);
        setMonthMeaning(monthMeaning);
        setYearMeaning(yearMeaning);
        setSoChuDao(soChuDao);
  
        // Send the meanings to the http-server to get the overall message
        const dateOfBirthMeanings = [
          { Mean: zodiacSign },
          { Mean: monthMeaning },
          { Mean: yearMeaning },
          { Mean: soChuDao },
        ];
  
        const summarizeResponse = await axios.post('http://localhost:5000/api/get-overall-message', dateOfBirthMeanings);
        const { summarizedMeaning } = summarizeResponse.data;
        setOverallMessage(summarizedMeaning);
        setShowResult(true);
  
        // Save the API response
        const result = {
          zodiacSign,
          monthMeaning,
          yearMeaning,
          soChuDao,
          summarizedMeaning,
        };
        saveApiResponse('boi-ngay-sinh', result);
      }
    } catch (error) {
      console.error('Error fetching birth date meanings:', error);
    }
  };
  
  const saveApiResponse = async (type, result) => {
    try {
      const origin = window.location.origin;
      const accessToken = getAccessToken(origin);
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const userString = getUser(origin);
      const user = JSON.parse(userString);
      const userId = user._id;
      const requestBody = {
        userId: userId,
        type,
        result,
      };
  
      await axios.post('http://localhost:5000/api/save-response', requestBody, { headers });
    } catch (error) {
      console.error('Error saving API response:', error);
    }
  };
  
  const handleDayChange = (e) => {
    setDay(e.target.value);
  };
  
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className={styles['BoiNgaySinh']}>
      <form className={styles['Body']} onSubmit={handleSubmit}>
        <div className={styles['Input-area']}>
          <ul>
            <li>
              <div className={styles['input-container']}>
                <div className={styles['input-text']}>
                  <p>Ngày</p>
                </div>
                <div className={styles['input-area']}>
                  <select
                    className={styles['select']}
                    name="day"
                    size={1}
                    value={day}
                    onChange={handleDayChange}
                  >
                    <option value="">Select Day</option>
                    {Array.from({ length: 31 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
            <li>
              <div className={styles['input-container']}>
                <div className={styles['input-text']}>
                  <p>Tháng</p>
                </div>
                <div className={styles['input-area']}>
                  <select
                    className={styles['select']}
                    name="month"
                    size={1}
                    value={month}
                    onChange={handleMonthChange}
                  >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
            <li>
              <div className={styles['input-container']}>
                <div className={styles['input-text']}>
                  <p>Năm</p>
                </div>
                <div className={styles['input-area']}>
                  <select
                    className={styles['select']}
                    name="year"
                    size={1}
                    value={year}
                    onChange={handleYearChange}
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 80 }, (_, index) => (
                      <option key={index + 1950} value={index + 1950}>
                        {index + 1950}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles['Button-area']}>
          <button type="submit">Xem ngay</button>
        </div>
      </form>
      {showResult && (
        <div className={styles['summarizedMeaning']}>
          <h2>Kết quả:</h2>
          <p>Cung hoàng đạo: {zodiacSign}</p>
          <p>Ý nghĩa tháng sinh: {monthMeaning}</p>
          <p>Ý nghĩa năm sinh: {yearMeaning}</p>
          <p>Số chủ đạo: {soChuDao}</p>
          <p>Tổng quan: {overallMessage}</p>
        </div>
      )}
      <Analytics />
    </div>
  );
}

export default BoiNgaySinh;