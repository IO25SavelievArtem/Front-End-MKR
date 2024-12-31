import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import '../styles/announcement.css';

function Announcement() {
  return (
    <div className="announcement-card">
      <h1 className="announcement-title">
        <FaRegBell className="icon" /> Оголошення <FaRegBell className="icon" />
      </h1>
      <div className="announcement-footer">
        <h5>
          Скоро починається сесія, лабораторні та практичні роботи повинні бути здані!
        </h5>
      </div>
    </div>
  );
}

export default Announcement;