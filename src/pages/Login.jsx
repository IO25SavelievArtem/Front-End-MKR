import React, { useState, useEffect } from 'react';
import "../styles/login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../redux/slices/auth';

const Login = () => {
  const [username, setUsername] = useState('user_1');
  const [password, setPassword] = useState('12345678');
  const { loginStatus, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin({ username, password }));
  };

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      navigate('/');
    }
  }, [loginStatus, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Вхід</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Ім'я користувача
            </label>
            <input
              type="text"
              className="form-input"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Увійти
          </button>
        </form>
        <div className="register-link">
          <Link to="/register">Ще не маєте аккаунту? Зареєструватися</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;