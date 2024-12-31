import React, { useState } from 'react';
import "../styles/createpost.css"
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../redux/slices/auth';
import Header from '../components/Header';
import { RiSendPlaneFill } from 'react-icons/ri';
import Footer from '../components/Footer';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = Cookies.get('auth_token');

  React.useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.length > 140) {
      setError('Пост має бути не більше 140 символів.');
      return;
    }

    try {
      await axios.post(
        `/users/${userData?.username}/posts`,
        { content },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      navigate(`/profile/${userData?.username}`);
    } catch (err) {
      setError('Помилка при створенні посту.');
    }
  };

  return (
    <>
      <Header />
      <div className="create-post-container">
        <h2 className="create-post-title">Створити пост</h2>
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Текст посту
            </label>
            <textarea
              id="content"
              className={`form-input ${content.length > 140 ? 'error' : ''}`}
              rows="6"
              maxLength="140"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError('');
              }}
              placeholder="Поділіться своїми думками..."
            />
            <div className="form-helper">
              <small className={`character-count ${content.length > 140 ? 'error-text' : ''}`}>
                {140 - content.length} символів залишилось
              </small>
              {error && <small className="error-text">{error}</small>}
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={content.length === 0 || content.length > 140}
          >
            <RiSendPlaneFill size={18} className="icon" />
            Опублікувати
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
