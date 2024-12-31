import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h5 className="footer-title">KPItter X</h5>
          <p>Найкращий мікроблог для навчання.</p>
        </div>
        <div className="footer-links">
          <h6>Корисні посилання</h6>
          <ul>
            <li>
              <Link to="/" className="footer-link">
                Про нас
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-link">
                Контакти
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-link">
                Допомога
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <small>&copy; {new Date().getFullYear()} KPItter X. Всі права захищено.</small>
      </div>
    </footer>
  );
};

export default Footer;