import React from 'react';
import "../styles/protectedroute.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaSadTear } from "react-icons/fa";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = Cookies.get('auth_token');

  if (!token) {
    return (
      <div className="protected-route-container">
        <div className="protected-route-content">
          <FaSadTear size={120} className="icon" />
          <h1 className="title">403 - Щось пішло не так!</h1>
          <p className="description">Ви не маєте доступу до цієї сторінки.</p>
          <p className="login-link">
            Будь ласка,{' '}
            <span onClick={() => navigate('/login')} className="navigate-link">
              увійдіть
            </span>
            , щоб продовжити.
          </p>
        </div>
      </div>
    );
  }
  return element;
};

export default ProtectedRoute;