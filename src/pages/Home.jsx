import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Announcement from '../components/Announcement';
import PopularPosts from '../components/PopularPosts';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <div className="home-image">
          <img src="/images/home_image.png" alt="home" className="home-image-img" />
        </div>
        <div className="welcome-text">
          <h2 className="welcome-title">Вітаємо на сайті!</h2>
          <p className="welcome-subtitle">Спілкуйтесь та познавайте нове!</p>
        </div>
        <Announcement />
        <PopularPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Home;