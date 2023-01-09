import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import {initializeBlogs} from './reducers/blogReducer'
import {setUser} from './reducers/loginReducer'
import "./index.css";


const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login.user)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs.length])


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

  return (
    <div>
      <h1>blogs</h1>
      <Notification />

      {user === '' ? (
        <LoginForm/>
      ) : (
        <div>
          {user.name} logged in
          <button onClick={handleLogOut} type="submit">
            logout
          </button>
          <Togglable buttonLabel="create a new blog">
            <BlogForm />
          </Togglable>
          <ul>
            {blogs.map((blog) =>(
              <Blog
                key={blog.id}
                blog={blog}
                currentUserUsername={user.username}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
