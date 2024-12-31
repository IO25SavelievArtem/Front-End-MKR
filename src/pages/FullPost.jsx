import React, { useState, useEffect } from 'react';
import "../styles/fullpost.css"
import axios from '../axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import { FaRegComment, FaRegThumbsUp } from 'react-icons/fa';

function FullPost() {
  const { username, post_id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = Cookies.get('auth_token');
        const { data } = await axios.get(`/users/${username}/posts/${post_id}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setPost(data);
      } catch (error) {
        console.error(error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [username, post_id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComment('');
    setShowCommentInput(false);
  };

  const toggleLike = async () => {
    setIsLiking(true);
    const token = Cookies.get('auth_token');
    const url = `/users/${username}/posts/${post_id}/like`;

    try {
      if (post.is_liked) {
        await axios.delete(url, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setPost((prev) => ({ ...prev, is_liked: false, likes: prev.likes - 1 }));
      } else {
        await axios.put(
          url,
          {},
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          },
        );
        setPost((prev) => ({ ...prev, is_liked: true, likes: prev.likes + 1 }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return <div className="loading">Завантаження...</div>;
  }

  if (!post) {
    return <div className="error-message">Пост не знайдений.</div>;
  }

  return (
    <>
      <Header />
      <div className="full-post-container">
        <h1 className="post-title">Пост від автора</h1>
        <div className="post-card">
          <div className="post-header">
            <h5>{post.author.full_name}</h5>
            <h6>@{post.author.username} • {new Date(post.created_at).toLocaleString('uk-UA')}</h6>
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-footer">
            <span>Лайків: {post.likes}</span>
            <div className="actions">
              <button
                className={`like-button ${post.is_liked ? 'liked' : ''}`}
                onClick={toggleLike}
                disabled={isLiking}
              >
                <FaRegThumbsUp />
              </button>
              <button
                className="comment-button"
                onClick={() => setShowCommentInput(!showCommentInput)}
              >
                <FaRegComment />
              </button>
            </div>
          </div>
        </div>
        {showCommentInput && (
          <div className="comment-form">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="comment-input"
                rows="3"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Напишіть коментар..."
              />
              <button type="submit" className="submit-comment">Відправити</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default FullPost;