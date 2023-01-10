import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogService";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import UserTable from "./components/UserInfo";
import User from "./components/User";
import BlogSingleView from "./components/BlogSingleView"

import {initializeBlogs} from './reducers/blogReducer'
import {setUser} from './reducers/loginReducer'
import { initializeUsers } from "./reducers/userReducer";


import {
  Routes, Route, useMatch, Link
} from "react-router-dom"

import "./index.css";


const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs.length])  

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  const userList = useSelector(state => state.users)

  useEffect(() => {
    //Checking if user is already logged in
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    window.location.reload();
  };

  const matchUser = useMatch('/users/:id')
  const findUser = matchUser
    ? userList.find(usr => usr.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const findBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const BlogView = () => {
    return (
      <div>
        <h1>Blogs</h1>
        <div>
          <Togglable buttonLabel="create a new blog">
            <BlogForm />
          </Togglable>
          <ul>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* <h1>blog app</h1> */}
      <Notification />
  
      {user === '' ? (
        <LoginForm/>
      ) : (
        <div>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user.name} logged in
          <button onClick={handleLogOut} type="submit">
            logout
          </button>
      </div>
          <div>
            <Routes>
              <Route path="/" element={<BlogView />} />
              <Route path ="/users/:id" element={<User user={findUser}/>}/>
              <Route path = "/blogs/:id" element={<BlogSingleView blog={findBlog} currentUserUsername={user.username}/>}/>
              <Route path = "/users" element= {<UserTable users={userList} />}/>
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
