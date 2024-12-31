import React from 'react';
import "../styles/profile.css"
import axios from '../axios';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { RiUserFollowLine, RiMessage2Line, RiGroupLine, RiFileTextLine, RiErrorWarningLine } from 'react-icons/ri';

function Profile() {
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const { username } = useParams();

  React.useEffect(() => {
    const getUserInfo = async (username) => {
      try {
        const { data } = await axios.get(`/users/${username}`);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo(username);

    const getUserPosts = async (username, page = 1) => {
      const token = Cookies.get('auth_token');
      try {
        const { data } = await axios.get(`/users/${username}/posts`, {
          params: { page },
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserPosts(username);
  }, [username]);

  return (
    <>
      <Header />
      <div className="profile-container">
        {user ? (
          <div className="profile-content">
            {/* Левая секция профиля */}
            <aside className="profile-sidebar">
              <div className="profile-avatar-section">
                <img
                  src={user.avatar || `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`}
                  alt="Аватар пользователя"
                  className="profile-avatar"
                />
                {user.full_name && <h5 className="profile-name">{user.full_name}</h5>}
                <p className="profile-username">@{user.username}</p>
              </div>
              <div className="profile-stats">
                <p>
                  <RiGroupLine className="icon" /> Підписники: <strong>0</strong>
                </p>
                <p>
                  <RiUserFollowLine className="icon" /> Підписки: <strong>0</strong>
                </p>
                <p>
                  <RiFileTextLine className="icon" /> Пости: <strong>{user.posts}</strong>
                </p>
              </div>
              <div className="profile-actions">
                <button className="button button-primary">
                  <RiUserFollowLine /> Підписатися
                </button>
                <button className="button button-secondary">
                  <RiMessage2Line /> Написати
                </button>
              </div>
            </aside>

            {/* Правая секция постов */}
            <main className="profile-posts">
              <h4>Пости</h4>
              {posts.length > 0 ? (
                <div className="posts-grid">
                  {posts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="no-posts">Немає доступних постів.</p>
              )}
            </main>
          </div>
        ) : (
          <div className="not-found">
            <RiErrorWarningLine className="not-found-icon" />
            <h4>{`Користувача з ім'ям @${username} не знайдено.`}</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;