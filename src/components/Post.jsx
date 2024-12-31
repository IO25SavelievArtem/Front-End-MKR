import React, { useState } from 'react';
import "../styles/post.css"
import { Link } from 'react-router-dom';
import axios from '../axios';
import Cookies from 'js-cookie';

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [isLiking, setIsLiking] = useState(false);
  const [views, setViews] = useState(post.views);

  const handleLikeToggle = async () => {
    setIsLiking(true);
    const token = Cookies.get('auth_token');
    const url = `/users/${post.author.username}/posts/${post.id}/like`;

    try {
      if (isLiked) {
        // Удаление лайка
        await axios.delete(url, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setLikes((prev) => prev - 1);
        setIsLiked(false);
      } else {
        // Добавление лайка
        await axios.put(
          url,
          {},
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Ошибка при смене состояния лайка:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="post-card">
      <Link to={`/post/${post.author.username}/${post.id}`} className="post-link">
        <div className="post-header">
          <h5 className="post-author">{post.author.full_name}</h5>
          <h6 className="post-meta">
            @{post.author.username} • {new Date(post.created_at).toLocaleString('uk-UA')}
          </h6>
        </div>
        <p className="post-content">{post.content}</p>
      </Link>
      <div className="post-footer">
        <span className="post-views">👁 {views} просмотров</span>
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
          disabled={isLiking}
        >
          {isLiked ? '♥' : '♡'}: {likes}
        </button>
      </div>
    </div>
  );
}

export default Post;