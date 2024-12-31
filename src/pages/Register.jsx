import React, { useState, useEffect } from 'react';
import "../styles/register.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../redux/slices/auth';

const Register = () => {
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('12345678');
  const [fullName, setFullName] = useState('Full User Name');
  const { registerStatus, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRegister({ username, password, fullName }));
  };

  useEffect(() => {
    if (registerStatus === 'succeeded') {
      navigate('/login');
    }
  }, [registerStatus, navigate]);

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Реєстрація</h2>
        {error && <div className="register-error">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Повне ім'я</label>
            <input
              type="text"
              className="form-input"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Ім'я користувача</label>
            <input
              type="text"
              className="form-input"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              className="form-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">Зареєструватися</button>
        </form>
        <div className="register-footer">
          <Link to="/login">Вже маєте аккаунт? Увійти</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;