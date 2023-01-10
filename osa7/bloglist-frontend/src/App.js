import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { ListGroup,  Navbar, Nav, NavbarToggle, NavbarCollapse, NavLink} from "react-bootstrap"

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

  const padding = {
    paddingRight: 5
  }

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

    const NavBar = ({ user, handleLogOut }) => {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {user ? <em>{user.name} logged in</em> : <Link to="/login">login</Link>}
              </Navbar.Text>
              {user && (
                <Nav.Link href="#" as="span" onClick={handleLogOut}>
                  logout
                </Nav.Link>
              )}
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    

  const BlogView = () => {
    return (
      <div >
        <div>
        <h1>Blogs</h1>
        </div>
        <div>
          <Togglable>
            <BlogForm />
          </Togglable>
          <br />
          <ListGroup className="blogsScrollable">
            {blogs.map((blog) => (
              <ListGroup.Item action as={Link} to={`/blogs/${blog.id}`}>
                <Blog
                  key={blog.id}
                  blog={blog}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }

  const Head = () => (
    <Helmet>
      <style>{'body { background-color: lightcyan; }'}</style>
      <title>My Page</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    </Helmet>
  )
  
  return (
    <div className="container">
      <Head/>
      <Notification />
  
      {user === '' ? (
        <div className="login"><LoginForm/></div>
      ) : (
        <div >
          <NavBar user={user} handleLogOut = {handleLogOut}/><br/>
          <div className="main">
            <Routes>
              <Route path="/" element={<div className ="blogs"><BlogView /></div>} />
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
