import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        console.log(initialBlogs)
        setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
      })
  }, [blogs.length])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user.username, '!!!!!!')
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('error: wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    console.log(blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setErrorMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const removeBlog = (blog) => {
    const id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      blogService.deleteBlog(id)
      const remainingBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(remainingBlogs)
    }
  }


  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} />

      {user === null

        ?<LoginForm username = {username} password = {password }setUsername = {setUsername }setPassword = {setPassword} handleLogin = {handleLogin} />

        :<div>
          {user.name} logged in
          <button onClick = {handleLogOut} type = "submit">logout</button>
          <Togglable buttonLabel='create a new blog'>
            <BlogForm createBlog = {addBlog} />
          </Togglable>

          <ul>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                removeBlog={removeBlog}
                currentUserUsername={user.username}
              />
            )}
          </ul>
        </div>
      }

    </div>
  )
}

export default App