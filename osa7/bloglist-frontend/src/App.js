/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';

import blogService from './services/blogService';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserTable from './components/UserInfo';
import User from './components/User';
import BlogSingleView from './components/BlogSingleView';
import NavBar from './components/NavBar';
import Head from './components/Head';
import BlogView from './components/BlogView';

import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';

import './index.css';

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [blogs.length]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [blogs.length]);
  const userList = useSelector((state) => state.users);

  useEffect(() => {
    // Checking if user is already logged in
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const matchUser = useMatch('/users/:id');
  const findUser = matchUser
    ? userList.find((usr) => usr.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch('/blogs/:id');
  const findBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  return (
    <div className="container">
      <Head />
      <Notification />

      {user === '' ? (
        <div className="login"><LoginForm /></div>
      ) : (
        <div>
          <NavBar user={user}/><br/>
          <div className="main">
            <Routes>
              <Route path="/" element={<div className="blogs"><BlogView blogs={blogs} /></div>} />
              <Route path="/users/:id" element={<User user={findUser} />} />
              <Route path="/blogs/:id" element={<BlogSingleView blog={findBlog} currentUserUsername={user.username} />} />
              <Route path="/users" element={<UserTable users={userList} />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
