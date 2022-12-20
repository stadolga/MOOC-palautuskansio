import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const LoginForm = ({username,password,setUsername,setPassword, handleLogin}) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
}

const BlogForm = ({addBlog,newTitle,newAuthor,newUrl,handleAuthorChange,handleTitleChange,handleUrlChange}) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        type="text"
        name='title'
        value={newTitle} //this needs to change too, more forms etc
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={newAuthor}
        name="author"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={newUrl}
        name="Username"
        onChange={handleUrlChange}
      />
    </div>
    <button type="submit">create</button>
  </form>  
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      console.log('logged in')
      const user = JSON.parse(loggedUserJSON)
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl
    }

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
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      })
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
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
          <BlogForm addBlog = {addBlog} newTitle = {newTitle} newAuthor = {newAuthor} newUrl = {newUrl} handleAuthorChange = {handleAuthorChange}
            handleTitleChange = {handleTitleChange} handleUrlChange = {handleUrlChange} />
 
          <ul>
            {blogs.map(blog => 
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </ul>
        </div>
      }

    </div>
  )
}

export default App