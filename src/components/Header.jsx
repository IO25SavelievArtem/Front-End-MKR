import React from 'react';
import "../styles/header.css"
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout, fetchMe } from '../redux/slices/auth';
import { RiLogoutCircleRLine, RiAddCircleLine, RiUserLine, RiEarthLine } from 'react-icons/ri'; 

const Header = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    navigate('/login');
  };

  React.useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setIsLoggedIn(true);
      dispatch(fetchMe({ token }));
    }
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Логотип */}
        <Link to="/" className="logo">
          <RiEarthLine size={24} />
          <span className="logo-text">KPItter X</span>
        </Link>

        {/* Меню */}
        <div className="menu">
          {isLoggedIn ? (
            <>
              <Link to="/create-post" className="menu-button">
                <RiAddCircleLine size={20} className="icon" /> Створити пост
              </Link>
              <Link to={`/profile/${userData?.username}`} className="menu-button">
                <RiUserLine size={20} className="icon" /> {userData?.username}
              </Link>
              <button onClick={handleLogout} className="menu-button logout">
                <RiLogoutCircleRLine size={20} className="icon" /> Вийти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="menu-button">
                <RiUserLine size={20} className="icon" /> Увійти
              </Link>
              <Link to="/register" className="menu-button">
                <RiAddCircleLine size={20} className="icon" /> Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;